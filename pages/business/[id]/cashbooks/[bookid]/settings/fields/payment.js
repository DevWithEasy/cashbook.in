import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { IoArrowBackOutline } from 'react-icons/io5';
import { MdAdd, MdLabel, MdOutlineContentCopy } from 'react-icons/md';
import { BookSettingLayout, Category_Add, Category_Delete, Category_Update, UserLayout } from '../../../../../../../components/Index';
import { CiMenuKebab } from 'react-icons/ci';
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
} from '@chakra-ui/react'

const Payment = () => {
    const router = useRouter()
    const { pathname } = router
    const path = pathname.split('/')[(pathname.split('/').length - 2)]
    const [isNoti, setNoti] = useState(true)
    const [addView, setAddView] = useState(false)
    const [updateView, setUpdateView] = useState(false)
    const [deleteView, setDeleteView] = useState(false)

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
                        <span>Payment</span>
                    </div>
                    <div
                        className='flex items-center space-x-5'
                    >
                        <IoArrowBackOutline size={20} />
                        <span>Payment</span>
                    </div>
                    <div
                        className="p-4 flex justify-between items-center space-x-10 border rounded"
                    >
                        <div>
                            <p className="">
                                Show Payment Field
                            </p>
                            <p className="text-sm text-gray-400">
                                {!isNoti ?
                                    'Payment Modes are enabled for this book. You can customise payment modes for this book below'
                                    :
                                    'Payment Modes are turned off for this book. Turn on payment modes to start using payment modes in this book'
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
                        className={`space-y-5 ${!isNoti && 'pointer-events-none grayscale'}`}
                    >
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
                                onClick={() => setAddView(!addView)}
                                className='w-full px-8 py-2 flex items-center space-x-2 text-[#4863D4] border hover:border-[#4863D4] focus:ring-2 rounded'
                            >
                                <MdOutlineContentCopy size={20} />
                                <span>Import From Others Book</span>
                            </button>
                        </div>
                        <div
                            className='space-y-3 pb-10'
                        >
                            <p className='text-base font-medium text-gray-500'>Payment Modes from this book (2)</p>
                            <div
                                className=''
                            >
                                <div
                                    className='pl-4 py-2 flex justify-between items-center border rounded'
                                >
                                    <span>Cash</span>
                                    <Menu>
                                        <MenuButton>
                                            <button className='px-4'><CiMenuKebab /></button>
                                        </MenuButton>
                                        <MenuList>
                                            <button
                                            className='w-full p-2 text-left hover:bg-slate-100'
                                            >
                                                Rename
                                            </button>
                                            <button
                                            className='w-full p-2 text-left hover:bg-slate-100'
                                            >
                                                Delete
                                            </button>
                                        </MenuList>
                                    </Menu>

                                </div>
                            </div>
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
            </BookSettingLayout>
        </UserLayout>
    );
};

export default Payment;