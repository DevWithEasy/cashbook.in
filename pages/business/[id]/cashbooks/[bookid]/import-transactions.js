import React, { useState } from 'react';
import { Transections_Header, UserLayout } from '../../../../../components/Index';
import { useDispatch, useSelector } from 'react-redux'
import Permission from '../../../../../utils/Permission';
import Head from 'next/head'
import Link from 'next/link'
import { IoMdArrowRoundBack } from 'react-icons/io';
import { parse } from 'papaparse';
import { RiFileExcel2Line } from "react-icons/ri";
import { HiOutlineDownload } from "react-icons/hi";

const ImportTransections = () => {
    const { entries, currentBook, currentBusiness } = useSelector(state => state.book)
    const { user } = useSelector(state => state.auth)
    const permission = new Permission(user, currentBook, currentBusiness)
    const [csvData, setCsvData] = useState(null);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const csv = e.target.result;
                parse(csv, {
                    complete: (result) => {
                        setCsvData(result.data.slice(0, result.data.length - 1));
                    },
                    header: true,
                });
            };
            reader.readAsText(file);
        }
    };

    console.log(csvData)
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
                        href={`/business/${currentBusiness._id}/cashbooks/`}
                        className='flex items-center space-x-2'
                    >
                        <IoMdArrowRoundBack
                            size={22}
                            className='mt-1 cursor-pointer'
                        />
                        <p
                            className='text-xl'
                        >
                            Import Entries
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
                        className='px-6 py-4 w-8/12 flex items-center justify-between bg-[#F5F5F5] rounded-md'
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
                        <a
                            href='/data/sample_import_csv.csv'
                            className='w-52 flex items-center space-x-2 text-[#4863D4] text-sm'
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
                                        <td>1</td>
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
                                        csvData.map((entry,i)=>
                                        <tr
                                            key={i}
                                            className='border-b border-r'
                                        >
                                            <td className='bg-gray-200'>{i+2}</td>
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
                            className='flex justify-end items-center'
                        >
                            <button
                                className='px-4 py-2 bg-[#4863D4] text-white rounded-md'
                            >
                                Next
                            </button>
                        </div>
                    </div>
                    }
                </div>
            </div>
        </UserLayout>

    );
};

export default ImportTransections;