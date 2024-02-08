import {
    Menu,
    MenuButton,
    MenuList
} from '@chakra-ui/react';
import Image from "next/image";
import Link from 'next/link';
import React from 'react';
import { FaCloudDownloadAlt } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { IoHelpBuoyOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import logo from '../public/cashbook.svg';
import user_img from '../public/image/profile.png';
import { logout } from '../store/slice/authSlice';
import { useRouter } from 'next/router';

const Header = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.user)
    const handleLogout = () => {
        dispatch(logout())
        router.push('/')
    }
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
                        className='flex items-center space-x-2 focus:ring-2'
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
                        className='-mt-2 p-2 flex items-center space-x-4 hover:bg-slate-200'

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

                    </Link>
                    <div
                        className="py-2 border-y"
                    >
                        <Link href=''
                            className="px-4 py-2 flex items-center space-x-2 hover:bg-slate-200"
                        >
                            <IoHelpBuoyOutline />
                            <span>Help & Support</span>
                        </Link>
                    </div>
                    <div
                        className="py-2 border-b"
                    >
                        <p className="px-4 text-sm text-gray-400">Settings</p>
                        <button
                            onClick={handleLogout}
                            className="w-full px-4 py-2 flex items-center space-x-2 hover:bg-slate-200"
                        >
                            <IoIosLogOut />
                            <span>Logout</span>
                        </button>
                    </div>
                    <div
                        className="py-2"
                    >
                        <p className="px-4 text-sm text-gray-400">Mobile App</p>
                        <Link href=''
                            className="px-4 py-2 flex items-center space-x-2 hover:bg-slate-200"
                        >
                            <FaCloudDownloadAlt />
                            <span>Download App</span>
                        </Link>
                    </div>
                    <p
                        className="px-4 pb-1 -mb-1 text-xs"
                    >
                        © CashBook • Version 2.12.0
                    </p>
                </MenuList>
            </Menu>
        </div>
    );
};

export default Header;