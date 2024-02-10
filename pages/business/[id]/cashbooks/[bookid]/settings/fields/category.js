import React, { useState } from 'react';
import UserLayout from '../../../../../../../components/UserLayout';
import BookSettingLayout from '../../../../../../../components/BookSettingLayout';
import { useRouter } from 'next/router';
import Link from 'next/link'
import { IoArrowBackOutline } from 'react-icons/io5';
import { MdLabel } from 'react-icons/md';

const Category = () => {
    const router = useRouter()
    const { pathname } = router
    const path = pathname.split('/')[(pathname.split('/').length - 2)]
    const [isNoti, setNoti] = useState(true)

    return (
        <UserLayout>
            <BookSettingLayout {...{ path }}>
                <div
                    className='w-8/12 space-y-5'
                >
                    <div
                        className='flex items-center space-x-1 text-sm text-gray-500'
                    >
                        <span>Entry Field</span>
                        <span>|</span>
                        <span>Category</span>
                    </div>
                    <div
                        className='flex items-center space-x-5'
                    >
                        <IoArrowBackOutline size={20} />
                        <span>Category</span>
                    </div>
                    <div
                        className="p-4 flex justify-between items-center space-x-10 border rounded"
                    >
                        <div>
                            <p className="">
                                Show Category Field
                            </p>
                            <p className="text-sm text-gray-400">
                                {!isNoti ?
                                    'Categories are turned off for this book. Turn on categories to start using categories in this book'
                                    :
                                    'Categories are enabled for this book. You can customise categories for this book below'
                                }
                            </p>
                        </div>
                        <div
                            onClick={() => setNoti(!isNoti)}
                            className="h-6 flex bg-gray-100 text-xs cursor-pointer"
                        >
                            <div
                                className={`px-2 h-6 flex justify-center items-center ${!isNoti && 'bg-red-500 text-white'}`}
                            >
                                <span>
                                    OFF
                                </span>
                            </div>
                            <div
                                className={`px-2 h-6 flex justify-center items-center ${isNoti && 'bg-green-500 text-white'}`}
                            >
                                <span>
                                    ON
                                </span>
                            </div>
                        </div>
                    </div>
                    <div
                            className='p-10'
                        >
                            <div
                                className='flex flex-col justify-center items-center space-y-5'
                            >
                                <MdLabel
                                size={60}
                                className='p-4 bg-[#ebeefb] text-[#4863D4] rounded-full'
                                />
                                <div
                                    className='w-full text-center'
                                >
                                    <p className='text-xl font-semibold'>No Categories Found</p>
                                    <p className='text-gray-500 text-sm Add new or import from other books'>
                                    Add new or import from other books
                                    </p>
                                </div>
                                <div
                                    className='py-10'
                                >
                                    
                                </div>
                            </div>
                        </div>
                </div>
            </BookSettingLayout>
        </UserLayout>
    );
};

export default Category;