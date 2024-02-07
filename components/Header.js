import Head from "next/head";
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
import user_img from '../public/image/profile.png'
import { useDispatch, useSelector } from "react-redux";
import Link from 'next/link'

const Header = () => {
    const user = useSelector(state => state.auth.user)
    return (
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
                    href={`/profile`}

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
    );
};

export default Header;