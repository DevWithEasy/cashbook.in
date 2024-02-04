import React, { useState } from 'react';
import UserLayout from '../../../components/UserLayout';
import { HiUsers } from "react-icons/hi";
import { CiSearch } from "react-icons/ci";
import { TiArrowSortedDown } from "react-icons/ti";
import { MdOutlineTurnRight, MdRadioButtonUnchecked } from "react-icons/md";
import { MdOutlineRadioButtonChecked } from "react-icons/md";
import { GoPlus } from "react-icons/go";
import { IoLogoWhatsapp } from "react-icons/io";
import Link from 'next/link'
import { MdOutlineEdit, MdOutlineContentCopy } from "react-icons/md";
import { ImUsers } from "react-icons/im";
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
} from '@chakra-ui/react'
import AddBook from '../../../components/book/AddBook';
import { MdBook } from "react-icons/md";
import UpdateBook from '../../../components/book/UpdateBook';
import DuplicateBook from '../../../components/book/DuplicateBook';
import MoveBook from '../../../components/book/MoveBook';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux'

const Cashbooks = () => {
    const user = useSelector(state => state.auth.user)
    const router = useRouter()
    const [sortBy, setSortBy] = useState({
        title: 'Last Update',
        sort: 'last_update'
    })
    const [view, setView] = useState(false)
    const [updateView, setUpdateView] = useState(false)
    const [duplicateView, setDuplicateView] = useState(false)
    const [moveView, setMoveView] = useState(false)
    const [id, setId] = useState(null)
    const [menu, setMenu] = useState(false)

    const sorts = [
        {
            title: 'Last Update',
            sort: 'last_update'
        },
        {
            title: 'Name (A to Z)',
            sort: 'name'
        },
        {
            title: 'Net Balance (High to Low)',
            sort: 'hightolow'
        },
        {
            title: 'Net Balance (Low to High)',
            sort: 'lowtohigh'
        },
        {
            title: 'Last Created',
            sort: 'lat_create'
        },
    ]
    return (
        <UserLayout>
            <div>
                <div
                    className='h-[70px] px-6 border-b flex justify-between items-center'
                >
                    <p
                        className='text-2xl'
                    >
                        Loan
                    </p>
                    <button
                        className='px-6 py-2 flex items-center space-x-2 text-[#4863D4] border rounded hover:border-[#4863D4]'
                    >
                        <HiUsers size={20} />
                        <span>Business Team</span>
                    </button>
                </div>
                <div>
                    <div
                        className='p-6'
                    >
                        <div
                            className='flex justify-between space-x-5'
                        >
                            <div
                                className='w-9/12 space-y-5'
                            >
                                <div
                                    className='flex items-center space-x-5'
                                >
                                    <div
                                        className='relative w-7/12'
                                    >
                                        <input
                                            placeholder='Search by book name...'
                                            className='w-full px-4 py-2 border focus:outline-[#4863D4] rounded'
                                        />
                                        <CiSearch
                                            size={30}
                                            className='absolute right-2 top-1 p-1 cursor-pointer'
                                        />
                                    </div>
                                    <Menu
                                        className='w-6/12'
                                    >
                                        <MenuButton
                                            className='border rounded'
                                        >
                                            <button
                                                className='w-full p-[10px] flex justify-between items-center text-sm'
                                            >
                                                <span>Sort by : {sortBy?.title}</span>
                                                <TiArrowSortedDown />
                                            </button>
                                        </MenuButton>
                                        <MenuList>
                                            {
                                                sorts.map((sort, i) =>
                                                    <MenuItem
                                                        key={i}
                                                        onClick={() => setSortBy(sort)}
                                                        className='space-x-2'
                                                    >
                                                        {sort.sort === sortBy.sort ?
                                                            <MdOutlineRadioButtonChecked className='text-[#4863D4]' />
                                                            :
                                                            <MdRadioButtonUnchecked />
                                                        }
                                                        <span>
                                                            {sort.title}
                                                        </span>
                                                    </MenuItem>
                                                )
                                            }
                                            <div></div>
                                        </MenuList>
                                    </Menu>
                                </div>
                                <div>
                                    <div
                                        onMouseOver={() => setMenu(true)}
                                        onMouseOut={() => setMenu(false)}
                                        className='relative p-4 flex justify-between items-center space-x-5 border-b hover:bg-gray-100 hover:border-none cursor-pointer'
                                    >
                                        <div
                                            onClick={() => router.push(`/business/businessid/cashbooks/bookid/transactions`)}
                                            className='w-1/2 flex items-center space-x-3'
                                        >
                                            <div>
                                                <MdBook
                                                    size={35}
                                                    className='p-1 bg-[#EBEEFD] text-[#4863D4] rounded-full'
                                                />
                                            </div>
                                            <div
                                                className='w-full'
                                            >
                                                <p>Habib Sir</p>
                                                <p
                                                    className='text-xs text-gray-500'
                                                >
                                                    Update 20 days ago
                                                </p>
                                            </div>
                                        </div>
                                        {!menu ?
                                            <p className='w-1/2 text-right text-[#21B15E]'>10000</p>
                                            :
                                            <div
                                                onMouseOver={() => setMenu(true)}
                                                onMouseOut={() => setMenu(false)}
                                                className='absolute right-0 w-1/2 p-4 flex justify-end items-center space-x-4 '
                                            >
                                                <p className='text-[#21B15E]'>10000</p>
                                                <button
                                                    className='relative group'
                                                >
                                                    <MdOutlineEdit
                                                        onClick={() => {
                                                            setUpdateView(!updateView)
                                                            setId(0)
                                                        }}
                                                        size={22}
                                                        className='text-[#4863D4] cursor-pointer'
                                                    />
                                                    <span
                                                        className='absolute hidden group-hover:block w-28 px-4 py-1 pb-2 -translate-x-1/2 translate-y-3 bg-black text-xs text-white rounded'
                                                    >
                                                        Rename Book
                                                    </span>
                                                </button>
                                                <button
                                                    className='relative group'
                                                >
                                                <MdOutlineContentCopy
                                                    onClick={() => {
                                                        setDuplicateView(!duplicateView)
                                                        setId(0)
                                                    }}
                                                    size={22}
                                                    className='text-[#4863D4] cursor-pointer'
                                                />
                                                    <span
                                                        className='absolute hidden group-hover:block w-28 px-4 py-1 pb-2 -translate-x-1/2 translate-y-3 bg-black text-xs text-white rounded'
                                                    >
                                                        Move Book
                                                    </span>
                                                </button>
                                                <button
                                                    className='relative group'
                                                >
                                                <ImUsers
                                                    size={22}
                                                    onClick={() => router.push(`/business/businessid/cashbooks/bookid/settings/members`)}
                                                    className='text-[#4863D4] cursor-pointer'
                                                />
                                                    <span
                                                        className='absolute hidden group-hover:block w-28 px-4 py-1 pb-2 -translate-x-1/2 translate-y-3 bg-black text-xs text-white rounded'
                                                    >
                                                        Add member
                                                    </span>
                                                </button>
                                                <button
                                                    className='relative group'
                                                >
                                                <MdOutlineTurnRight
                                                    onClick={() => {
                                                        setMoveView(!moveView)
                                                        setId(0)
                                                    }} size={22}
                                                    className='text-red-500 cursor-pointer'
                                                />
                                                    <span
                                                        className='absolute hidden group-hover:block w-28 px-4 py-1 pb-2 -translate-x-1/2 translate-y-3 bg-black text-xs text-white rounded'
                                                    >
                                                        Move Book
                                                    </span>
                                                </button>

                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div
                                className='w-3/12 px-4 space-y-5'
                            >
                                <div
                                    className='flex justify-end'
                                >
                                    <button
                                        onClick={() => setView(!view)}
                                        className='w-full py-2 flex justify-center items-center space-x-2 bg-[#4863D4] text-white  rounded'
                                    >
                                        <GoPlus />
                                        <span>Add New Book</span>
                                    </button>
                                </div>
                                <div
                                    className='p-3 space-y-1 border rounded-lg'
                                >
                                    <IoLogoWhatsapp
                                        size={50}
                                        className='p-3 bg-[#DFF4ED] text-[#31BF2F] rounded-full'
                                    />
                                    <p>Need help in business setup?</p>
                                    <p className='pb-2 text-sm text-gray-500'>Our support team will help you</p>
                                    <Link href=''>
                                        <a className='text-blue-500'>Contact us</a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {view &&
                    <AddBook {...{ view, setView }} />
                }
                {updateView &&
                    <UpdateBook {...{
                        id,
                        view: updateView,
                        setView: setUpdateView
                    }} />
                }
                {duplicateView &&
                    <DuplicateBook {...{
                        view: duplicateView,
                        setView: setDuplicateView
                    }} />
                }
                {moveView &&
                    <MoveBook {...{
                        view: moveView,
                        setView: setMoveView
                    }} />
                }
            </div>
        </UserLayout>
    );
};

export default Cashbooks;