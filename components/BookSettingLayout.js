import React, { useState } from 'react';
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdOutlineEdit, MdOutlineContentCopy, MdDeleteOutline } from "react-icons/md";
import { Book_Update, Book_Duplicate, Book_Delete } from '../components/Index'
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux'
import { MdOutlineMenu } from "react-icons/md"
import Link from 'next/link'
import Permission from '../utils/Permission'

const BookSettingLayout = ({ path, children }) => {
    const { currentBusiness, currentBook } = useSelector(state => state.book)
    const { user } = useSelector(state => state.auth)
    const permission = new Permission(user, currentBook, currentBusiness)
    const router = useRouter()
    const [updateView, setUpdateView] = useState(false)
    const [duplicateView, setDuplicateView] = useState(false)
    const [deleteView, setDeleteView] = useState(false)
    const [menu, setMenu] = useState(false)
    const sidebars = [
        {
            title: 'Members',
            desc: 'Add, remove or change role',
            path: 'members',
        },
        {
            title: 'Entry Field',
            desc: 'Contact, Category & Payment mode',
            path: 'fields',
        }
    ]
    return (
        <div
            className='h-[calc(100vh-48px)]'
        >
            <div
                className='h-[60px] md:h-[70px] px-4 md:px-6 border-b flex items-center'
            >
                <div
                    className='w-1/2 flex items-center space-x-3'
                >
                    <MdOutlineMenu
                        size={30}
                        onClick={() => setMenu(!menu)}
                        className='mr-1 cursor-pointer md:hidden'
                    />
                    <Link
                        href={`/business/${currentBusiness._id}/cashbooks/${currentBook?._id}/transactions`}
                        className='flex items-center space-x-1'
                    >
                        <IoMdArrowRoundBack
                            size={25}
                            className='mt-1 cursor-pointer'
                        />

                        <p
                            className='text-xl md:text-2xl'
                        >
                            Settings <span className='hidden md:inline-block text-sm'>({currentBook?.name})</span>
                        </p>
                    </Link>
                </div>
                <div
                    className='w-1/2 flex justify-end'
                >
                    {permission.bookUpdate() &&
                        <>
                            <button
                                onClick={() => setUpdateView(!updateView)}
                                className='px-4 py-2 flex items-center space-x-2 text-[#4863D4]'
                            >
                                <MdOutlineEdit size={20} />
                                <span
                                    className='hidden md:inline-block'
                                >
                                    Rename</span>
                            </button>
                            <button
                                onClick={() => setDuplicateView(!duplicateView)}
                                className='px-4 py-2 flex items-center space-x-2 text-[#4863D4]'
                            >
                                <MdOutlineContentCopy size={20} />
                                <span
                                    className='hidden md:inline-block'
                                >
                                    Duplicate</span>
                            </button>
                        </>
                    }

                    {permission.businessDelete() &&
                        <button
                            onClick={() => setDeleteView(!deleteView)}
                            className='px-4 py-2 flex items-center space-x-2 text-red-500'
                        >
                            <MdDeleteOutline size={20} />
                            <span
                                className='hidden md:inline-block'
                            >
                                Delete</span>
                        </button>
                    }

                </div>
            </div>
            <div
                className='h-[calc(100vh-118px)] flex justify-between'
            >
                <div
                    className={`${menu ? 'h-screen bg-white fixed shadow-xl' : 'hidden md:block md:w-3/12 border-r'}`}
                >
                    {
                        sidebars.map((topic, i) =>
                            <div
                                key={i}
                                onClick={() => router.push(`/business/${currentBusiness._id}/cashbooks/${currentBook._id}/settings/${topic.path}`)}
                                className='md:py-3 p-3 md:pr-3 border-b'
                            >
                                <div
                                    className={`p-3 space-y-1 rounded cursor-pointer ${topic.path == path ? 'bg-[#EBEEFB]' : 'hover:bg-gray-100'}`}
                                >
                                    <p>{topic.title}</p>
                                    <p
                                        className='text-sm text-gray-500'
                                    >
                                        {topic.desc}
                                    </p>
                                </div>
                            </div>
                        )
                    }
                </div>
                <div
                    className='w-full md:w-9/12 px-4 md:px-6 py-4 overflow-y-auto'
                >
                    {children}
                </div>

                {updateView &&
                    <Book_Update {...{
                        id: currentBook?._id,
                        view: updateView,
                        setView: setUpdateView,
                        isCurrent: true
                    }} />
                }

                {duplicateView &&
                    <Book_Duplicate {...{
                        view: duplicateView,
                        setView: setDuplicateView
                    }} />
                }


                {deleteView &&
                    <Book_Delete {...{
                        view: deleteView,
                        setView: setDeleteView
                    }} />
                }
            </div>
        </div>
    );
};

export default BookSettingLayout;