import React from 'react';
import UserLayout from '../../../../../../components/UserLayout';
import BookSettingLayout from '../../../../../../components/BookSettingLayout';
import { useRouter } from 'next/router';

const fields = () => {
    const router = useRouter()
    return (
        <UserLayout>
            <BookSettingLayout>
                <div className="w-8/12 space-y-5">
                    <p className='text-sm text-gray-500'>Entry Field</p>
                    <div
                        className='space-y-5'
                    >
                    <div
                        onClick={()=>router.push(`/business/businessid/cashbooks/bookid/settings/fields/contact`)}
                        className='p-6 flex justify-between items-center border rounded cursor-pointer'
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
                    onClick={()=>router.push(`/business/businessid/cashbooks/bookid/settings/fields/category`)}
                        className='p-6 flex justify-between items-center border rounded cursor-pointer'
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
                    onClick={()=>router.push(`/business/businessid/cashbooks/bookid/settings/fields/payment`)}
                        className='p-6 flex justify-between items-center border rounded cursor-pointer'
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