import React, { useState } from 'react';
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdOutlineEdit, MdOutlineContentCopy, MdDeleteOutline } from "react-icons/md";
import { Book_Update, Book_Duplicate, Book_Delete } from '../components/Index'
import { useRouter } from 'next/router';

const BookSettingLayout = ({ path, children }) => {
    const router = useRouter()
    const [updateView, setUpdateView] = useState(false)
    const [duplicateView, setDuplicateView] = useState(false)
    const [deleteView, setDeleteView] = useState(false)
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
            className=''
        >
            <div
                className='h-[70px] px-6 border-b flex items-center'
            >
                <div
                    className='w-1/2 flex items-center space-x-3'
                >
                    <IoMdArrowRoundBack
                        onClick={() => router.push(`/business/businessid/cashbooks/`)}
                        size={25}
                        className='mt-1 cursor-pointer'
                    />
                    <p
                        className='text-2xl'
                    >
                        Settings <span className='text-sm'>(Name)</span>
                    </p>
                </div>
                <div
                    className='w-1/2 flex justify-end'
                >
                    <button
                        onClick={() => setUpdateView(!updateView)}
                        className='px-4 py-2 flex items-center space-x-2 text-[#4863D4]'
                    >
                        <MdOutlineEdit size={20} />
                        <span>Rename</span>
                    </button>
                    <button
                        onClick={() => setDuplicateView(!duplicateView)}
                        className='px-4 py-2 flex items-center space-x-2 text-[#4863D4]'
                    >
                        <MdOutlineContentCopy size={20} />
                        <span>Duplicate</span>
                    </button>
                    <button
                        onClick={() => setDeleteView(!deleteView)}
                        className='px-4 py-2 flex items-center space-x-2 text-red-500'
                    >
                        <MdDeleteOutline size={20} />
                        <span>Delete</span>
                    </button>
                </div>
            </div>
            <div
                className='h-[calc(100vh-118px)] flex justify-between'
            >
                <div
                    className='w-3/12 pl-4 border-r'
                >
                    {
                        sidebars.map((topic, i) =>
                            <div
                                key={i}
                                onClick={() => router.push(`/business/businessid/cashbooks/bookid/settings/${topic.path}`)}
                                className='py-3 pr-3 border-b'
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
                    className='w-9/12 px-6 py-4'
                >
                    {children}
                </div>

                {updateView &&
                    <Book_Update {...{
                        view: updateView,
                        setView: setUpdateView
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