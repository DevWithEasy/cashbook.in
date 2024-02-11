import React, { useState } from 'react';
import { IoPersonAddSharp } from 'react-icons/io5';
import { IoIosArrowForward } from 'react-icons/io';
import Image from 'next/image'
import user_image from '../../../../../../public/image/profile.png'
import { useSelector } from "react-redux";
import { useRouter } from 'next/router';
import {BookSettingLayout,UserLayout, Book_AddMember } from '../../../../../../components/Index';
import Head from 'next/head'

const members = () => {
    const user = useSelector(state => state.auth.user)
    const {currentBook} = useSelector(state => state.book)
    const router = useRouter()
    const {pathname} = router
    const path = pathname.split('/').pop()
    const [view,setView] = useState(false)

    return (
        <UserLayout>
            <BookSettingLayout {...{path}}>
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
                        onClick={()=>setView(!view)}
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
                    </div>
                    {view &&
                        <Book_AddMember {...{
                            view,setView
                        }}/>
                    }
                </div>
            </BookSettingLayout>
        </UserLayout>
    );
};

export default members;