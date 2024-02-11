import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { IoArrowBackOutline } from 'react-icons/io5';
import { MdLabel, MdOutlineContentCopy } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { BookSettingLayout, Category_Add, Category_Delete, Category_Import, Category_Update, UserLayout } from '../../../../../../../components/Index';

const Category = () => {
    const { currentBook, currentBusiness } = useSelector(state => state.book)
    const router = useRouter()
    const { pathname } = router
    const path = pathname.split('/')[(pathname.split('/').length - 2)]
    const [isNoti, setNoti] = useState(true)
    const [addView, setAddView] = useState(false)
    const [updateView, setUpdateView] = useState(false)
    const [deleteView, setDeleteView] = useState(false)
    const [importView, setImportView] = useState(false)

    return (
        <UserLayout>
            <BookSettingLayout {...{ path }}>
                <Head>
                    <title>Category Field - {currentBook?.name} - CashBook</title>
                </Head>
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
                        className={`w-8/12 mx-auto pt-5 flex flex-col justify-center items-center space-y-5 ${!isNoti && 'pointer-events-none grayscale'}`}
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
                            className='w-full pt-5 pb-10 space-y-3'
                        >
                            <button
                                onClick={() => setAddView(!addView)}
                                className='w-full px-8 py-2 flex justify-center items-center space-x-2 bg-[#4863D4] text-white focus:ring-2 rounded'
                            >
                                <AiOutlinePlus />
                                <span>Add New category</span>
                            </button>
                            <button
                                onClick={() => setImportView(!importView)}
                                className='w-full px-8 py-2 flex justify-center items-center space-x-2 border hover:border-[#4863D4] text-[#4863D4] focus:ring-2 rounded'
                            >
                                <MdOutlineContentCopy />
                                <span>Import From Other Books</span>
                            </button>
                        </div>
                    </div>
                </div>
                {addView &&
                    <Category_Add {...{
                        view: addView,
                        setView: setAddView
                    }} />
                }
                {updateView &&
                    <Category_Update {...{
                        view: updateView,
                        setView: setUpdateView
                    }} />
                }
                {deleteView &&
                    <Category_Delete {...{
                        view: deleteView,
                        setView: setDeleteView
                    }} />
                }
                {importView &&
                    <Category_Import {...{
                        view: importView,
                        setView: setImportView
                    }} />
                }
            </BookSettingLayout>
        </UserLayout>
    );
};

export default Category;