import { motion } from 'framer-motion';
import moment from 'moment';
import React, { useRef, useState } from 'react';
import { CiSettings } from "react-icons/ci";
import { useSelector } from 'react-redux';
import Entry from '../../utils/Entry';
import { useDownloadExcel } from 'react-export-table-to-excel';
import { useReactToPrint } from 'react-to-print';
import { MdFileDownload } from "react-icons/md";
import { Transection_Export_Balance, Transection_Export_PDFHeader, Transection_Export_Setting, Transection_Export_Tbody, Transection_Export_TbodyExcel, Transection_Export_Thead } from './transection_export_helper/Transection_Export_Index';
import { IoArrowBack } from "react-icons/io5";

const Transection_Export = ({ exportType, view, setView }) => {
    const { entries, currentBook } = useSelector(state => state.book)
    const EntryManager = new Entry(entries)
    const lastEntry = EntryManager.generatedEntry()[0]
    const [setting, setSetting] = useState(false)
    const [fields, setFields] = useState([
        'remark',
        'category',
        'payment',
        'contact',
        'members',
        'cashin',
        'cashout',
        'balance'
    ])
    const printRef = useRef()
    const excelRef = useRef()

    const handlePrint = useReactToPrint({
        content: () => printRef.current,
        documentTitle: `${currentBook?.name} ${moment().format('DD MMM YYYY')}@Cashbook`
    })

    const { onDownload } = useDownloadExcel({
        currentTableRef: excelRef.current,
        filename: `${currentBook?.name} ${moment().format('DD MMM YYYY')}@Cashbook`,
        sheet: currentBook?.name
    })

    return (
        <>
            <div
                className='fixed -top-2 md:-top-5 left-0 h-screen w-full flex justify-end bg-slate-900/50 z-50'
            >
                <motion.div
                    initial={{
                        x: 500,
                    }}
                    animate={{
                        x: 0
                    }}
                    transition={{
                        duration: 0.3
                    }}
                    className='h-screen w-full md:w-10/12 flex flex-col justify-between bg-white shadow-md'
                >
                    <div
                        className='h-16 px-6 flex justify-between items-center border-b'
                    >
                        <h2 className='text-xl'>Export Transactions</h2>
                        <button
                            onClick={() => setView(!view)}
                            className='px-4 py-1 border rounded-md'
                        >
                            X
                        </button>
                    </div>
                    <div
                        style={{ height: 'calc(100vh - 144px)' }}
                        className='px-6 py-4 space-y-5 overflow-y-auto'
                    >
                        <div
                            className='flex justify-between items-center'
                        >
                            {!setting ?
                                <p
                                    className='text-2xl'
                                >
                                    Preview
                                </p>
                                :
                                <button
                                    onClick={() => setSetting(false)}
                                    className='flex items-center space-x-3 text-2xl'
                                >
                                    <IoArrowBack size={25} />
                                    <span>PDF Settings</span>
                                </button>
                            }
                            {(exportType === 'pdf' && !setting) &&
                                <button
                                    onClick={() => setSetting(!setting)}
                                    className='px-6 py-2 flex items-center space-x-2 border hover:border-[#4863D4] text-[#4863D4] rounded-md'
                                >
                                    <CiSettings size={20} />
                                    <span>
                                        PDF Settings
                                    </span>
                                </button>
                            }

                        </div>
                        {setting ?
                            <Transection_Export_Setting {...{ fields, setFields }} />
                            :
                            <div
                                className={`${exportType === 'pdf' ? 'p-5' : ''}`}
                            >
                                <div
                                    ref={printRef}
                                    className={`${exportType === 'pdf' && 'border'} rounded-md print:m-2 print:border-none`}
                                >
                                    {/* header */}
                                    {exportType === 'pdf' &&
                                        <Transection_Export_PDFHeader />
                                    }
                                    {/* transections */}
                                    <div
                                        className='px-6 py-4 space-y-5 print:p-4'
                                    >
                                        {/* balance */}
                                        {exportType === 'pdf' &&
                                            <Transection_Export_Balance {...{
                                                EntryManager, currentBook
                                            }} />
                                        }

                                        <div
                                            className='space-y-3 pb-10'
                                        >
                                            {exportType === 'pdf' &&
                                                <p>Total No. of entries: {entries?.length}</p>
                                            }
                                            <div
                                                className='w-full overflow-x-auto'
                                            >
                                                <table
                                                    ref={excelRef}
                                                    className='w-full print:text-sm'
                                                >
                                                    <Transection_Export_Thead {...{ fields }} />
                                                    {exportType === 'pdf' ?
                                                        <Transection_Export_Tbody {...{
                                                            lastEntry,
                                                            EntryManager,
                                                            entries: EntryManager.generatedEntry(),
                                                            fields
                                                        }} />
                                                        :
                                                        <Transection_Export_TbodyExcel {...{
                                                            lastEntry,
                                                            EntryManager,
                                                            entries: EntryManager.generatedEntry()
                                                        }} />
                                                    }
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }

                    </div>
                    <div
                        className='h-20 px-6 flex justify-end items-center border-t'
                    >
                        {
                            exportType === 'pdf' ?
                                <>
                                    {!setting &&
                                        <button
                                            onClick={handlePrint}
                                            className='px-6 py-3 flex items-center space-x-2 bg-[#4863D4] text-white rounded-md'
                                        >
                                            <MdFileDownload />
                                            <span>Download PDF</span>
                                        </button>
                                    }
                                </>
                                :
                                <button
                                    onClick={onDownload}
                                    className='px-6 py-3 flex items-center space-x-2 bg-[#4863D4] text-white rounded-md'
                                >
                                    <MdFileDownload />
                                    <span>Download Excel</span>
                                </button>
                        }
                    </div>
                </motion.div>
            </div>
        </>
    );
};

export default Transection_Export;