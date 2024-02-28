import React, { useState } from 'react';
import { IoPersonAddSharp } from 'react-icons/io5';
import { IoIosArrowForward } from 'react-icons/io';
import Image from 'next/image'
import user_image from '../../../../../../public/image/profile.png'
import { useSelector } from "react-redux";
import { useRouter } from 'next/router';
import { BookSettingLayout, UserLayout, Book_AddMember, Book_MemberRoleChange } from '../../../../../../components/Index';
import Head from 'next/head'
import {
    Menu,
    MenuButton,
    MenuList
} from '@chakra-ui/react';
import { CiMenuKebab } from 'react-icons/ci';

const members = () => {
    const user = useSelector(state => state.auth.user)
    const { currentBook } = useSelector(state => state.book)
    const router = useRouter()
    const { pathname } = router
    const path = pathname.split('/').pop()
    const [view, setView] = useState(false)
    const [updateView, setUpdateView] = useState(false)
    const [deleteView, setDeleteView] = useState(false)
    const [member, setMember] = useState()

    console.log(member)
    return (
        <UserLayout>
            <BookSettingLayout {...{ path }}>
                <Head>
                    <title>Members - {currentBook?.name} - CashBook</title>
                </Head>
                <div className="w-8/12">
                    <div className="p-4 flex justify-between items-center border rounded">
                        <div className="w-7/12">
                            <p className="text-lg">Business Team</p>
                            <p className="text-sm text-gray-500">
                                Add your business partners or staffs to this business and manage
                                cashflow together
                            </p>
                        </div>
                        <button
                            onClick={() => setView(!view)}
                            className="px-4 py-2 flex items-center space-x-2 bg-[#4863D4] text-white rounded active:ring-2">
                            <IoPersonAddSharp />
                            <span>Add team member</span>
                        </button>
                    </div>
                    <div className="py-5 flex justify-between items-center">
                        <p className="font-semibold">Total Members (1)</p>
                        <button className="flex items-center space-x-2 text-[#4863D4]">
                            <span>View roles & permissions</span>
                            <IoIosArrowForward />
                        </button>
                    </div>
                    <div
                        className='space-y-5'
                    >
                        <p className='text-gray-500'>Members in this book</p>
                        <div
                            className='flex items-center justify-between space-x-3'
                        >
                            <Image
                                alt=''
                                src={user?.image?.url ? user?.image?.url : user_image.src}
                                width={60}
                                height={60}
                                className='rounded-full'
                            />
                            <div
                                className='w-full flex items-center justify-between'
                            >
                                <div>
                                    <p>{user?.name}</p>
                                    <p className='text-sm text-gray-500'>{user?.number}</p>
                                    <p className='text-sm text-gray-500'>{user?.email}</p>
                                </div>
                                <span
                                    className='px-4 py-1 bg-green-100 text-green-500 text-xs rounded'
                                >
                                    Owner
                                </span>
                            </div>
                        </div>
                        {currentBook?.members?.length > 0 &&
                            <div>
                                {currentBook.members.map(member =>
                                    <div
                                        className='flex items-center justify-between space-x-3'
                                    >
                                        <Image
                                            alt=''
                                            src={member?.user?.image?.url ? member?.user?.image?.url : user_image.src}
                                            width={60}
                                            height={60}
                                            className='rounded-full'
                                        />
                                        <div
                                            className='w-full flex items-center justify-between'
                                        >
                                            <div>
                                                <p>{member?.user?.name}</p>
                                                <p className='text-sm text-gray-500'>{member?.user?.number}</p>
                                                <p className='text-sm text-gray-500'>{member?.user?.email}</p>
                                            </div>
                                            <div
                                                className='flex justify-end '
                                            >
                                                <span
                                                    className={`px-4 py-1 text-xs rounded ${member?.role === 'Data Operator' ? 'bg-gray-100' : member?.role === 'Viewer' ? 'border' : 'bg-[#EBEEFD] text-[#4863D4]'}`}
                                                >
                                                    {member?.role}
                                                </span>
                                                <Menu>
                                                    <MenuButton>
                                                        <div className='pl-4'><CiMenuKebab /></div>
                                                    </MenuButton>
                                                    <MenuList>
                                                        <button
                                                            onClick={() => {
                                                                setUpdateView(!updateView)
                                                                setMember(member)
                                                            }}
                                                            className='w-full p-2 text-left hover:bg-slate-100'
                                                        >
                                                            Rename
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                setDeleteView(!deleteView)
                                                                setMember(member)
                                                            }}
                                                            className='w-full p-2 text-left hover:bg-slate-100'
                                                        >
                                                            Delete
                                                        </button>
                                                    </MenuList>
                                                </Menu>
                                            </div>
                                        </div>
                                    </div>
                                )

                                }
                            </div>
                        }
                    </div>
                    {view &&
                        <Book_AddMember {...{
                            view, setView
                        }} />
                    }
                    {updateView &&
                        <Book_MemberRoleChange {...{
                            member,
                            view: updateView,
                            setView: setUpdateView
                        }} />
                    }
                </div>
            </BookSettingLayout>
        </UserLayout>
    );
};

export default members;