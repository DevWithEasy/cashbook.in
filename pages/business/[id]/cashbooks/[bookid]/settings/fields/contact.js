import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { BiCloudUpload } from 'react-icons/bi';
import { ImUsers } from 'react-icons/im';
import { IoArrowBackOutline } from 'react-icons/io5';
import { MdAdd, MdOutlineContentCopy } from 'react-icons/md';
import { BookSettingLayout, Category_Add, Category_Delete, Category_Update, UserLayout } from '../../../../../../../components/Index';

const Contact = () => {
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
                        <span>Contact</span>
                    </div>
                    <div
                        className='flex items-center space-x-5'
                    >
                        <IoArrowBackOutline size={20} />
                        <span>Contact</span>
                    </div>
                    <div
                        className="p-4 flex justify-between items-center space-x-10 border rounded"
                    >
                        <div>
                            <p className="">
                                Show Contact Field
                            </p>
                            <p className="text-sm text-gray-400">
                                {!isNoti ?
                                    'Contacts are enabled for this book. You can customise contacts for this book below'
                                    :
                                    'Contacts are turned off for this book. Turn on contacts to start using contacts in this book'
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
                        className={`space-y-3 ${!isNoti && 'pointer-events-none'}`}
                    >
                        <p className='text-base font-medium text-gray-500'>Add New Contact</p>
                        <div className='grid grid-cols-3 gap-x-5'>
                            <div
                                className='p-4 flex flex-col justify-center items-center space-y-3 text-[#127F41] border rounded cursor-pointer'
                            >
                                <BiCloudUpload
                                    size={50}
                                    className='p-3 bg-[#E8F5EE] rounded-full'
                                />
                                <p className='text-sm font-semibold'>Import From CSV</p>
                            </div>
                            <div
                                className='p-4 flex flex-col justify-center items-center space-y-3 text-[#4863D4] border rounded cursor-pointer'
                            >
                                <MdOutlineContentCopy
                                    size={50}
                                    className='p-3 bg-[#ebeefb] rounded-full'
                                />
                                <p className='text-sm font-semibold'>Import From Book</p>
                            </div>
                            <div
                                className='p-4 flex flex-col justify-center items-center space-y-3 text-[#4863D4] border rounded cursor-pointer'
                            >
                                <MdAdd
                                    size={50}
                                    className='p-3 bg-[#ebeefb] rounded-full'
                                />
                                <p className='text-sm font-semibold'>Add Manually</p>
                            </div>
                        </div>
                    </div>
                    <div
                        className='space-y-3 pb-10'
                    >
                        <p className='text-base font-medium text-gray-500'>Contacts from this book (0)</p>
                        <div
                            className={`w-8/12 mx-auto pt-5 flex flex-col justify-center items-center space-y-5 ${!isNoti && 'pointer-events-none grayscale'}`}
                        >
                            <ImUsers
                                size={60}
                                className='p-4 bg-[#ebeefb] text-[#4863D4] rounded-full'
                            />
                            <div
                                className='w-full text-center'
                            >
                                <p className='font-semibold'>No Contacts Found</p>
                                <p className='text-gray-500 text-sm Add new or import from other books'>
                                    Import from CSV or other books or Add New Manually
                                </p>
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

export default Contact;