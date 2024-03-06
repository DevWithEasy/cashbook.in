import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { BiCloudUpload } from 'react-icons/bi';
import { ImUsers } from 'react-icons/im';
import { IoArrowBackOutline } from 'react-icons/io5';
import { MdAdd, MdOutlineContentCopy } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { BookSettingLayout, Contact_Add, Contact_Delete, Contact_Import, Contact_Update, UserLayout } from '../../../../../../../components/Index';
import { useEffect } from 'react';
import { getData } from '../../../../../../../libs/API_CCP_Crud';
import { useDispatch } from 'react-redux';
import { addCCPs } from '../../../../../../../store/slice/bookSlice';
import {
    Menu,
    MenuButton,
    MenuList
} from '@chakra-ui/react';
import { CiMenuKebab } from 'react-icons/ci';
import Permission from '../../../../../../../utils/Permission';
import Link from 'next/link'
import { TiInfo } from 'react-icons/ti';

const Contact = () => {
    const { currentBook, ccp, currentBusiness } = useSelector(state => state.book)
    const { user } = useSelector(state => state.auth)
    const permission = new Permission(user, currentBook, currentBusiness)
    const dispatch = useDispatch()
    const router = useRouter()
    const { pathname } = router
    const path = pathname.split('/')[(pathname.split('/').length - 2)]
    const [isNoti, setNoti] = useState(true)
    const [addView, setAddView] = useState(false)
    const [updateView, setUpdateView] = useState(false)
    const [deleteView, setDeleteView] = useState(false)
    const [importView, setImportView] = useState(false)
    const [id, setId] = useState()

    useEffect(() => {
        getData({
            url: `contact/${currentBook._id}`,
            dispatch,
            action: addCCPs
        })
    }, [])

    return (
        <UserLayout>
            <BookSettingLayout {...{ path }}>
                <Head>
                    <title>Contact Field - {currentBook?.name} - CashBook</title>
                </Head>
                <div
                    className='w-full md:w-8/12 space-y-5'
                >
                    {!permission.bookMemberAdd() &&
                        <div
                            className='p-3 flex items-center space-x-2 bg-[#F8EFE7] text-[#BD610D] border border-[#BD610D] rounded-md'
                        >
                            <TiInfo size={25} />
                            <span>You don't have permissions to update fields in this book.</span>
                        </div>
                    }
                    <div
                        className='flex items-center space-x-1 text-sm text-gray-500'
                    >
                        <span>Entry Field</span>
                        <span>|</span>
                        <span>Contact</span>
                    </div>
                    <Link
                        href={`/business/${currentBusiness?._id}/cashbooks/${currentBook?._id}/settings/fields`}
                        className='flex items-center space-x-5'
                    >
                        <IoArrowBackOutline size={20} />
                        <span>Contact</span>
                    </Link>
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
                            onClick={() => permission.bookMemberAdd() && setNoti(!isNoti)}
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
                    {permission.bookMemberAdd() &&
                        <div
                            className={`space-y-3 ${!isNoti && 'pointer-events-none'}`}
                        >
                            <p className='text-base font-medium text-gray-500'>Add New Contact</p>
                            <div className='grid grid-cols-3 gap-x-5'>
                                <div
                                    onClick={() => toast.error('Premium Feature')}
                                    className='p-4 flex flex-col justify-center items-center space-y-3 text-[#127F41] border rounded cursor-pointer'
                                >
                                    <BiCloudUpload
                                        size={50}
                                        className='p-3 bg-[#E8F5EE] rounded-full'
                                    />
                                    <p className='text-sm font-semibold'>Import From CSV</p>
                                </div>
                                <div
                                    onClick={() => setImportView(!importView)}
                                    className='p-4 flex flex-col justify-center items-center space-y-3 text-[#4863D4] border rounded cursor-pointer'
                                >
                                    <MdOutlineContentCopy
                                        size={50}
                                        className='p-3 bg-[#ebeefb] rounded-full'
                                    />
                                    <p className='text-sm font-semibold'>Import From Book</p>
                                </div>
                                <div
                                    onClick={() => setAddView(!addView)}
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
                    }

                    <div
                        className='space-y-3 pb-10'
                    >
                        <p className='text-base font-medium text-gray-500'>Contacts from this book ({ccp?.length})</p>

                        {ccp?.length > 0 ?
                            <div
                                className='space-y-2'
                            >
                                {
                                    ccp.map(contact =>
                                        <div
                                            className='pl-4 py-2 flex justify-between items-center border rounded'
                                        >
                                            <div
                                                className='flex space-x-3'
                                            >
                                                <div
                                                    className='h-10 w-10 flex justify-center items-center text-2xl bg-[#EEE8E5] text-[#5A1B02] font-bold rounded-full'
                                                >
                                                    <span>{contact?.name?.split('')[0]}</span>
                                                </div>
                                                <div>
                                                    <p className='text-sm font-semibold'>{contact?.name}</p>
                                                    <p className='text-sm text-gray-500'>{contact?.phone} - {contact?.type}</p>
                                                </div>
                                            </div>
                                            {permission.bookMemberAdd() &&
                                                <Menu>
                                                    <MenuButton>
                                                        <button className='px-4'><CiMenuKebab /></button>
                                                    </MenuButton>
                                                    <MenuList>
                                                        <button
                                                            onClick={() => {
                                                                setUpdateView(!updateView)
                                                                setId(contact?._id)
                                                            }}
                                                            className='w-full p-2 text-left hover:bg-slate-100'
                                                        >
                                                            Rename
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                setDeleteView(!deleteView)
                                                                setId(contact?._id)
                                                            }}
                                                            className='w-full p-2 text-left hover:bg-slate-100'
                                                        >
                                                            Delete
                                                        </button>
                                                    </MenuList>
                                                </Menu>
                                            }
                                        </div>
                                    )
                                }
                            </div>
                            :
                            <>
                                {permission.bookMemberAdd() &&
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
                                }
                            </>

                        }
                    </div>
                </div>
                {addView &&
                    <Contact_Add {...{
                        view: addView,
                        setView: setAddView
                    }} />
                }
                {updateView &&
                    <Contact_Update {...{
                        id,
                        view: updateView,
                        setView: setUpdateView
                    }} />
                }
                {deleteView &&
                    <Contact_Delete {...{
                        id,
                        view: deleteView,
                        setView: setDeleteView
                    }} />
                }
                {importView &&
                    <Contact_Import {...{
                        view: importView,
                        setView: setImportView
                    }} />
                }
            </BookSettingLayout>
        </UserLayout>
    );
};

export default Contact;