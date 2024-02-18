import { useRouter } from 'next/router';
import React from 'react';
import {useSelector} from 'react-redux'
import BusinessManager from '../utils/BusinessManager';

const BusinessLayout = ({path,children}) => {
    const { businesses, currentBusiness, books } = useSelector(state => state.book)
    const { user } = useSelector(state => state.auth)
    const router = useRouter()

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
            desc : `${role === 'Owner' || role === 'Partner' ?'Change owner or delete business' : 'Leave business'}`,
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
                    className='w-3/12 pl-4 border-r'
                >
                    {
                        sidebars.map((topic,i)=>
                        <div
                            key={i}
                            onClick={()=>router.push(`/business/${currentBusiness?._id}/business-settings/${topic.path}`)}
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
            </div>
        </div>
    );
};

export default BusinessLayout;