import { useRouter } from 'next/router';
import React, { useState } from 'react'
import {useSelector} from 'react-redux'
import BusinessManager from '../utils/BusinessManager'
import { MdOutlineMenu } from "react-icons/md"
import Link from 'next/link'

const BusinessLayout = ({path,children}) => {
    const { businesses, currentBusiness, books } = useSelector(state => state.book)
    const { user } = useSelector(state => state.auth)
    const router = useRouter()
    const [menu,setMenu] = useState(false)

    const businessManager = new BusinessManager(user,books, businesses, currentBusiness)
    const role = businessManager.getRole(currentBusiness)

    const sidebars = [
        {
            title : 'Business Team',
            desc : 'Add, remove or change role',
            path : 'team',
        },
        {
            title : 'Business Profile',
            desc : 'Edit business details',
            path : 'profile',
        },
        {
            title : 'Settings',
            desc : `${role === 'Owner' ?'Change owner or delete business' : 'Leave business'}`,
            path : 'settings',
        },
    ]
    return (
        <div
            className=''
        >
            <div
                className='h-[70px] px-6 border-b flex items-center'
            >
                <MdOutlineMenu
                    size={30}
                    onClick={()=>setMenu(!menu)}
                    className='mr-3 cursor-pointer md:hidden'
                />
                <p
                    className='text-2xl'
                >
                    Business Settings
                </p>
                <p className='mx-2'>({currentBusiness?.name})</p>
            </div>
            <div
                className='h-[calc(100vh-118px)] flex justify-between'
            >
                <div
                    className={`${menu ? 'h-screen bg-white fixed shadow-xl' : 'hidden md:block md:w-3/12 border-r'}`}
                >
                    {
                        sidebars.map((topic,i)=>
                        <Link
                            key={i}
                            href={`/business/${currentBusiness?._id}/business-settings/${topic.path}`}
                        >
                        <div
                            key={i}
                            className='md:py-3 p-3 md:pr-3 border-b'
                        >
                            <div
                                className={`w-full p-3 space-y-1 rounded cursor-pointer ${topic.path == path ? 'bg-[#EBEEFB]' : 'hover:bg-gray-100'}`}
                            >
                            <p>{topic.title}</p>
                            <p
                                className='text-sm text-gray-500'
                            >
                            {topic.desc}
                            </p>
                            </div>
                        </div>
                        </Link>
                        )
                    }
                </div>
                <div
                    className='w-full md:w-9/12 px-6 py-4 overflow-y-auto'
                > 
                    {children}
                </div>
            </div>
        </div>
    );
};

export default BusinessLayout;