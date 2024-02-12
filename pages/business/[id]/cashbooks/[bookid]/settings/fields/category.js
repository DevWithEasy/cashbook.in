import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState,useEffect } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { IoArrowBackOutline } from 'react-icons/io5';
import { MdLabel,MdAdd, MdOutlineContentCopy } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { BookSettingLayout, Category_Add, Category_Delete, Category_Import, Category_Update, UserLayout } from '../../../../../../../components/Index';
import { getData } from '../../../../../../../libs/API_CCP_Crud';
import { addCCPs } from '../../../../../../../store/slice/bookSlice';
import { CiMenuKebab } from 'react-icons/ci';
import {
    Menu,
    MenuButton,
    MenuList
} from '@chakra-ui/react';
const Category = () => {
    const { currentBook, ccp } = useSelector(state => state.book)
    const dispatch = useDispatch()
    const router = useRouter()
    const { pathname } = router
    const path = pathname.split('/')[(pathname.split('/').length - 2)]
    const [isNoti, setNoti] = useState(true)
    const [addView, setAddView] = useState(false)
    const [updateView, setUpdateView] = useState(false)
    const [deleteView, setDeleteView] = useState(false)
    const [importView, setImportView] = useState(false)
    const [id,setId] = useState()

    useEffect(() => {
        getData({
            url: `/api/category?id=${currentBook._id}`,
            dispatch,
            action: addCCPs
        })
    }, [])

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
                    {ccp?.length > 0 ?
                        <>
                            <div
                                className='w-full pt-5 space-y-3 font-semibold'
                            >
                                <button
                                    onClick={() => setAddView(!addView)}
                                    className='w-full px-8 py-2 flex items-center space-x-2 text-[#4863D4] border hover:border-[#4863D4] focus:ring-2 rounded'
                                >
                                    <MdAdd size={20} />
                                    <span>Add New Payment Mode</span>
                                </button>
                                <button
                                    onClick={() => setImportView(!importView)}
                                    className='w-full px-8 py-2 flex items-center space-x-2 text-[#4863D4] border hover:border-[#4863D4] focus:ring-2 rounded'
                                >
                                    <MdOutlineContentCopy size={20} />
                                    <span>Import From Others Book</span>
                                </button>
                            </div>
                            <p className='text-base font-medium text-gray-500'>Category from this book ({ccp?.length})</p>
                            <div
                                className='space-y-2'
                            >
                                {
                                    ccp.map(category=>
                                        <div
                                    className='pl-4 py-2 flex justify-between items-center border rounded'
                                >
                                    <span>{category?.name}</span>
                                    <Menu>
                                        <MenuButton>
                                            <div className='px-4'><CiMenuKebab /></div>
                                        </MenuButton>
                                        <MenuList>
                                            <button
                                                onClick={() => {
                                                    setUpdateView(!updateView)
                                                    setId(category?._id)
                                                }}
                                                className='w-full p-2 text-left hover:bg-slate-100'
                                            >
                                                Rename
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setDeleteView(!deleteView)
                                                    setId(category?._id)
                                                }}
                                                className='w-full p-2 text-left hover:bg-slate-100'
                                            >
                                                Delete
                                            </button>
                                        </MenuList>
                                    </Menu>

                                </div>    
                                    )
                                }
                            </div>
                        </>
                        :
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
                    }
                </div>
                {addView &&
                    <Category_Add {...{
                        view: addView,
                        setView: setAddView
                    }} />
                }
                {updateView &&
                    <Category_Update {...{
                        id,
                        view: updateView,
                        setView: setUpdateView
                    }} />
                }
                {deleteView &&
                    <Category_Delete {...{
                        id,
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