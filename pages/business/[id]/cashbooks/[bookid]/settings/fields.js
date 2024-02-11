import React from 'react';
import {BookSettingLayout,UserLayout} from '../../../../../../components/Index';
import { useRouter } from 'next/router';
import Head from 'next/head'
import {useSelector} from 'react-redux'

const fields = () => {
    const {currentBook,currentBusiness} = useSelector(state => state.book)
    const router = useRouter()
    const { pathname } = router
    const path = pathname.split('/').pop()
    return (
        <UserLayout>
            <BookSettingLayout {...{ path }}>
                <Head>
                    <title>Fields - {currentBook?.name} - CashBook</title>
                </Head>
                <div className="w-8/12 space-y-5">
                    <p className='text-sm text-gray-500'>Entry Field</p>
                    <div
                        className='space-y-5'
                    >
                        <div
                            onClick={() => router.push(`/business/${currentBusiness._id}/cashbooks/${currentBook._id}/settings/fields/contact`)}
                            className='p-6 flex justify-between items-center hover:bg-gray-50 border rounded cursor-pointer'
                        >
                            <div>
                                <p
                                    className=''
                                >
                                    Contact
                                </p>
                                <p
                                    className='text-sm text-gray-500'
                                >
                                    Rename, Delete, reorder, add new or hide
                                </p>
                            </div>
                            <span
                                className='px-4 py-1 bg-blue-100 text-blue-500 text-xs rounded'
                            >
                                ON
                            </span>
                        </div>
                        <div
                            onClick={() => router.push(`/business/${currentBusiness._id}/cashbooks/${currentBook._id}/settings/fields/category`)}
                            className='p-6 flex justify-between items-center hover:bg-gray-50 border rounded cursor-pointer'
                        >
                            <div>
                                <p
                                    className=''
                                >
                                    Category
                                </p>
                                <p
                                    className='text-sm text-gray-500'
                                >
                                    Rename, Delete, reorder, add new or hide
                                </p>
                            </div>
                            <span
                                className='px-4 py-1 bg-blue-100 text-blue-500 text-xs rounded'
                            >
                                ON
                            </span>
                        </div>
                        <div
                            onClick={() => router.push(`/business/${currentBusiness._id}/cashbooks/${currentBook._id}/settings/fields/payment`)}
                            className='p-6 flex justify-between items-center hover:bg-gray-50 border rounded cursor-pointer'
                        >
                            <div>
                                <p
                                    className=''
                                >
                                    Payment Mode
                                </p>
                                <p
                                    className='text-sm text-gray-500'
                                >
                                    Rename, Delete, reorder, add new or hide
                                </p>
                            </div>
                            <span
                                className='px-4 py-1 bg-blue-100 text-blue-500 text-xs rounded'
                            >
                                ON
                            </span>
                        </div>
                    </div>
                </div>
            </BookSettingLayout>
        </UserLayout>
    );
};

export default fields;