import React, { useState } from 'react';
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
} from '@chakra-ui/react'
import logo from '../public/cashbook.svg'
import Image from "next/image";
import { useSelector } from "react-redux";
import user_img from '../public/image/profile.png'
import Link from 'next/link'
import { GoPlus } from "react-icons/go";
import AddBusiness from './AddBusiness';



const UserLayout = ({ children }) => {
    const user = useSelector(state => state.auth.user)
    const [view,setView] = useState(false)
    return (
        <div
            className='h-screen overflow-hidden'
        >
            <div
                className='h-12 px-4 py-3 pr-8 flex justify-between items-center border-b shadow'
            >
                <Image
                    src={logo.src}
                    alt="logo"
                    className=""
                    height={25}
                    width={150}
                />
                <Menu>
                    <MenuButton
                        className='flex items-center'
                    >
                        <button
                            className='flex items-center space-x-2'
                        >
                            <Image
                                src={user?.image?.url || user_img.src}
                                alt="logo"
                                className=""
                                height={30}
                                width={30}
                            />
                            <span>{user?.name}</span>
                        </button>

                    </MenuButton>
                    <MenuList
                        className='overflow-hidden'
                    >
                        <Link
                            href={``}
                            
                        >
                            <a
                            className='-mt-2 p-2 flex items-center space-x-4 border-b hover:bg-slate-200'
                            >
                                <Image
                                src={user?.image?.url || user_img.src}
                                alt="logo"
                                className=""
                                height={40}
                                width={40}
                            />
                            <div>
                                <p
                                    className=''
                                >
                                    {user?.name}
                                </p>
                                <p
                                    className='text-sm text-gray-400'
                                >
                                    {user?.number}
                                </p>
                                <p
                                    className='text-blue-500 text-xs'
                                >
                                    Your Profile
                                </p>
                            </div>
                            </a>
                            
                        </Link>
                        <MenuItem>New Window</MenuItem>
                        <MenuDivider />
                        <MenuItem>Open...</MenuItem>
                        <MenuItem>Save File</MenuItem>
                    </MenuList>
                </Menu>
            </div>
            <div
                style={{height : 'calc(100vh - 48px)'}}
                className='flex justify-between'
            >
                <div
                    className='hidden md:block md:w-2/12 bg-[#2c324B] text-white overflow-y-auto'
                >
                    <div
                        className='h-[70px] p-4 bg-[#212121]'
                    >
                        <div
                            onClick={()=>setView(!view)}
                            className='p-1 flex space-x-3 items-center bg-[#2c324B] rounded-md cursor-pointer'
                        >
                            <GoPlus 
                                size={28}
                                className='p-0.5 text-3xl bg-[#4863D4] rounded-md'
                            />
                            <span>Add New Business</span>
                        </div>
                    </div>
                </div>
                <div
                    className='w-full md:w-10/12 overflow-y-auto'
                >
                    {children}
                </div>

                {view && <AddBusiness {...{
                    view,setView
                }}/>}

            </div>
        </div>
    );
};

export default UserLayout;