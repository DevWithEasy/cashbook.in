import moment from 'moment';
import Head from 'next/head';
import Link from 'next/link';
import { parse } from 'papaparse';
import React, { useState } from 'react';
import { HiOutlineDownload } from "react-icons/hi";
import { IoMdArrowRoundBack } from 'react-icons/io';
import { RiFileExcel2Line } from "react-icons/ri";
import { useSelector } from 'react-redux';
import { Entry_Import_Confirm, UserLayout } from '../../../../../components/Index';
import Permission from '../../../../../utils/Permission';

const ImportTransections = () => {
    const { currentBook, currentBusiness } = useSelector(state => state.book)
    const { user } = useSelector(state => state.auth)
    const permission = new Permission(user, currentBook, currentBusiness)
    const [csvData, setCsvData] = useState(null)
    const [entries, setEntries] = useState(null)
    const [view, setView] = useState(false)

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const csv = e.target.result;
                parse(csv, {
                    complete: (result) => {
                        const csvResult = result.data.slice(0, result.data.length - 1)
                        const data = []
                        const csvOrg = []
                        csvResult?.forEach(e => {
                            const g_date = e?.Date ? e?.Date : moment().format('DD MMM YYYY')
                            const g_time = e?.Time ? e?.Time : moment().format('h:mm A')
                            const dateTime = moment(`${g_date} ${g_time}`, 'DD MMM YYYY h:mm A')
                            const entry = {
                                createdAt: dateTime.utc().format(),
                                entryType: e?.Cash_In ? 'cash_in' : 'cash_out',
                                amount: e?.Cash_In ? e?.Cash_In : e?.Cash_Out,
                                category: e?.Category,
                                remark: e?.Remark,
                                payment: e?.Mode
                            }
                            csvOrg.push({
                                ...e
                                ,...entry,
                                Date : g_date,
                                Time : g_time
                            })
                            if (e?.Cash_In || e?.Cash_Out) {
                                return data.push(entry)
                            }
                        })
                        setCsvData(csvOrg)
                        setEntries(data)
                    },
                    header: true,
                });
            };
            reader.readAsText(file);
        }
    };
    console.log(entries)
    return (
        <UserLayout>
            <div>
                <Head>
                    <title>Import Entries{currentBook?.name}' - CashBook</title>
                </Head>

                <div
                    className='px-4 py-2 md:px-8 md:py-4 flex items-center border-b bg-white'
                >
                    <Link
                        href={`/business/${currentBusiness._id}/cashbooks/${currentBook?._id}/transactions`}
                        className='flex items-center space-x-2'
                    >
                        <IoMdArrowRoundBack
                            size={22}
                            className='mt-1 cursor-pointer'
                        />
                        <p
                            className='flex items-center space-x-2'
                        >
                            <span className='text-xl'>
                                Import Entries
                            </span>
                            <span className='text-sm'>
                                ({currentBook?.name})
                            </span>
                        </p>
                    </Link>
                </div>
                <div
                    className='p-4 space-y-7'
                >
                    <div
                        className='space-y-2'
                    >
                        <label className='block text-sm'>
                            Select a CSV file
                        </label>
                        <input
                            type="file"
                            accept=".csv"
                            onChange={handleFileUpload}
                            className='p-2 border rounded-md focus:border-none focus:ring-2 focus:ring-[#4863D4]'
                        />
                    </div>
                    <div
                        className='px-6 py-4 md:w-8/12 flex flex-col md:flex-row md:items-center justify-between space-y-5 md:space-y-0 bg-[#F5F5F5] rounded-md'
                    >
                        <div
                            className='flex items-center'
                        >
                            <div
                                className='w-12'
                            >
                                <RiFileExcel2Line
                                    size={40}
                                    className='text-[#189E60]'
                                />
                            </div>
                            <div
                                className='w-full space-y-1 pl-4'
                            >
                                <p className='font-semibold'>Download Sample File</p>
                                <p className='text-sm text-gray-700'>Your CSV file should have same columns as this sample file</p>
                            </div>
                        </div>

                        <a
                            href='/data/sample_import_csv.csv'
                            className='w-36 p-2 flex items-center space-x-2 text-[#4863D4] text-sm border border-[#4863D4] rounded-md'
                            download
                        >
                            <HiOutlineDownload size={20} />
                            <span>Download CSV</span>
                        </a>
                    </div>
                    {csvData?.length > 0 &&
                        <div
                            className='space-y-3'
                        >
                            <div>
                                <p
                                    className='text-2xl font-bold'
                                >
                                    Parsed Data
                                </p>
                                <p
                                    className='text-sm gray-500'
                                >
                                    Here is parsed data from your uploaded file. Please verify and click on “Next” to proceed
                                </p>
                            </div>
                            <div
                                className='w-full overflow-x-auto text-sm'
                            >
                                <table
                                    className='w-full'
                                >
                                    <thead
                                        className='bg-gray-200'
                                    >
                                        <tr>
                                            <td className='p-1'>1</td>
                                            <td>Date</td>
                                            <td>Time</td>
                                            <td>Remark</td>
                                            <td>Category</td>
                                            <td>Mode</td>
                                            <td>Cash In</td>
                                            <td>Cash Out</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            csvData.map((entry, i) =>
                                                <tr
                                                    key={i}
                                                    className={`border-b border-r ${(entry?.Cash_In || entry?.Cash_Out) ? '' : 'bg-red-100'}`}
                                                >
                                                    <td className='p-1 bg-gray-200'>{i + 2}</td>
                                                    <td>{entry?.Date}</td>
                                                    <td>{entry?.Time}</td>
                                                    <td>{entry?.Remark}</td>
                                                    <td>{entry?.Category}</td>
                                                    <td>{entry?.Mode}</td>
                                                    <td>{entry?.Cash_In}</td>
                                                    <td>{entry?.Cash_Out}</td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <div
                                className='flex justify-end items-center space-x-3'
                            >
                                <Link
                                    href={`/business/${currentBusiness._id}/cashbooks/${currentBook?._id}/transactions`}
                                    className='px-6 py-3 border text-[#4863D4] rounded-md'
                                >
                                    Cancel
                                </Link>
                                <button
                                    onClick={() => setView(!view)}
                                    className='px-6 py-3 bg-[#4863D4] text-white border border-[#4863D4] rounded-md'
                                >
                                    Next : Import will be all valid import
                                </button>
                            </div>
                        </div>
                    }
                </div>
                {view &&
                    <Entry_Import_Confirm {...{ entries, view, setView }} />
                }
            </div>
        </UserLayout>

    );
};

export default ImportTransections;