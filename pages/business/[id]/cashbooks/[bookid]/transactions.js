import React, { useState } from 'react';
import UserLayout from '../../../../../components/UserLayout';
import Balance from '../../../../../components/Balance';
import { AiOutlineCloudUpload, AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { IoMdArrowRoundBack } from 'react-icons/io';
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
} from '@chakra-ui/react'
import { IoSettingsOutline } from "react-icons/io5";
import { HiOutlineUsers } from "react-icons/hi2";
import { MdOutlineFileDownload, MdPictureAsPdf, MdOutlineGridOn, MdOutlineRadioButtonChecked, MdRadioButtonUnchecked, MdOutlineCheckBoxOutlineBlank, MdOutlineCheckBox } from "react-icons/md";
import { TiArrowSortedDown } from 'react-icons/ti';
import { CiSearch } from 'react-icons/ci';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Transactions = () => {
    const [check, setCheck] = useState(false)
    const [durationBy, setDurationBy] = useState({
        title: 'All Time',
        sort: 'all_time'
    })
    const [typeBy, setTypeBy] = useState({
        title: 'All',
        sort: 'all'
    })
    const durationsorts = [
        {
            title: 'All Time',
            sort: 'all_time'
        },
        {
            title: 'Today',
            sort: 'today'
        },
        {
            title: 'Yesterday',
            sort: 'hightolow'
        },
        {
            title: 'This Month',
            sort: 'this_month'
        },
        {
            title: 'Last Month',
            sort: 'last_month'
        },
        {
            title: 'Custom',
            sort: 'custom'
        }
    ]
    const typesorts = [
        {
            title: 'All',
            sort: 'all'
        },
        {
            title: 'Cash In',
            sort: 'cash_in'
        },
        {
            title: 'Cash Out',
            sort: 'cash_out'
        },
    ]

    const handleCheck = () => {
        setCheck(!check)
    }
    return (
        <UserLayout>
            <div
                className='px-8 space-y-5'
            >
                <div
                    className='py-4 flex items-center border-b'
                >
                    <div
                        className='w-1/2 flex items-center space-x-3'
                    >
                        <IoMdArrowRoundBack
                            onClick={() => router.push(`/business/businessid/cashbooks/`)}
                            size={22}
                            className='mt-1 cursor-pointer'
                        />
                        <p
                            className='text-xl'
                        >
                            Settings
                        </p>
                        <div
                            className='pl-5 flex items-center text-[#4863D4] space-x-5'
                        >
                            <button
                                className='relative group'
                            >
                                <IoSettingsOutline
                                    onClick={() => {
                                    }}
                                    size={22}
                                    className='text-[#4863D4] cursor-pointer'
                                />
                                <span
                                    className='absolute hidden group-hover:block w-28 px-4 py-1 pb-2 -translate-x-1/2 translate-y-3 bg-black text-xs text-white rounded'
                                >
                                    Book settings
                                </span>
                            </button>
                            <span className='text-gray-200'>|</span>
                            <button
                                className='relative group'
                            >
                                <HiOutlineUsers
                                    onClick={() => {
                                    }}
                                    size={22}
                                    className='text-[#4863D4] cursor-pointer'
                                />
                                <span
                                    className='absolute hidden group-hover:block w-28 px-4 py-1 pb-2 -translate-x-1/2 translate-y-3 bg-black text-xs text-white rounded'
                                >
                                    Add Member
                                </span>
                            </button>

                        </div>
                    </div>
                    <div
                        className='w-1/2 flex justify-end space-x-5'
                    >
                        <button
                            onClick={() => {
                            }}
                            className='px-6 py-2 flex items-center space-x-2 text-[#4863D4]'
                        >
                            <AiOutlineCloudUpload size={20} />
                            <span>Add Buk Entries</span>
                        </button>
                        <Menu>
                            <MenuButton

                            >
                                <button
                                    className='px-6 py-2 flex items-center space-x-2 text-[#4863D4] border active:ring-2 rounded'
                                >
                                    <MdOutlineFileDownload />
                                    <span>Reports</span>
                                </button>

                            </MenuButton>
                            <MenuList>
                                <MenuItem>
                                    <button
                                        className='p-2 flex space-x-2'
                                    >
                                        <MdPictureAsPdf size={25} />
                                        <span>PDF Report</span>
                                    </button>
                                </MenuItem>
                                <MenuItem>
                                    <button
                                        className='p-2 flex space-x-2'
                                    >
                                        <MdOutlineGridOn size={25} />
                                        <span>Excel Report</span>
                                    </button>
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    </div>
                </div>
                <div
                    className='py-2 space-x-5'
                >
                    <Menu>
                        <MenuButton
                            className='border rounded'
                        >
                            <button
                                className='w-full px-2 py-1 flex justify-between items-center space-x-2 text-sm'
                            >
                                <span>Duration : {durationBy?.title}</span>
                                <TiArrowSortedDown />
                            </button>
                        </MenuButton>
                        <MenuList>
                            {
                                durationsorts.map((sort, i) =>
                                    <MenuItem
                                        key={i}
                                        onClick={() => setDurationBy(sort)}
                                        className='space-x-2'
                                    >
                                        {sort.sort === durationBy.sort ?
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
                    <Menu>
                        <MenuButton
                            className='border rounded'
                        >
                            <button
                                className='w-full px-2 py-1 flex justify-between items-center space-x-2 text-sm'
                            >
                                <span>Types : {typeBy?.title}</span>
                                <TiArrowSortedDown />
                            </button>
                        </MenuButton>
                        <MenuList>
                            {
                                typesorts.map((sort, i) =>
                                    <MenuItem
                                        key={i}
                                        onClick={() => setTypeBy(sort)}
                                        className='space-x-2'
                                    >
                                        {sort.sort === typeBy.sort ?
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
                <div
                    className='flex justify-between items-center'
                >
                    <div
                        className='relative w-6/12'
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
                    <div
                        className='flex justify-end text-white space-x-5'
                    >
                        <button
                            className='px-8 py-2 flex items-center space-x-2 bg-[#01865F] active:ring-2 rounded'
                        >
                            <AiOutlinePlus />
                            <span>Cash In</span>
                        </button>
                        <button
                            className='px-8 py-2 flex items-center space-x-2 bg-[#C93B3B] active:ring-2 rounded'
                        >
                            <AiOutlinePlus />
                            <span>Cash Out</span>
                        </button>
                    </div>
                </div>
                <Balance {...{}} />
                <div
                    className='flex justify-between '
                >
                    <p
                        className='text-gray-500 text-sm'
                    >
                        Showing 1-2 of 2 Entries
                    </p>
                    <div
                        className='flex justify-end space-x-3'
                    >
                        <div
                            className='space-x-2'
                        >
                            <Menu>
                                <MenuButton
                                    className='border rounded'
                                >
                                    <button
                                        className='w-full px-2 py-1 flex justify-between items-center space-x-2 text-sm'
                                    >
                                        <span>Page 01</span>
                                        <TiArrowSortedDown />
                                    </button>
                                </MenuButton>
                                <MenuList>
                                    {
                                        durationsorts.map((sort, i) =>
                                            <MenuItem
                                                key={i}
                                                onClick={() => setDurationBy(sort)}
                                                className='space-x-2'
                                            >
                                                {sort.sort === durationBy.sort ?
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
                                    <div>

                                    </div>
                                </MenuList>
                            </Menu>
                            <span className='text-sm'>of 01</span>
                        </div>
                        <div
                            className='flex items-center space-x-2'
                        >
                            <IoIosArrowBack
                                size={25}
                                className='p-1 bg-gray-200 rounded'
                            />
                            <IoIosArrowForward
                                size={25}
                                className='p-1 bg-gray-200 rounded'
                            />
                        </div>
                    </div>
                </div>
                <div
                    className='w-full overflow-y-auto'
                >
                <table
                    className='w-full'
                >
                    <thead
                        className='text-sm'
                    >
                        <tr
                            className='bg-slate-100 border-b'
                        >
                            <td
                                className='p-4'
                            >

                                {check ?
                                    <MdOutlineCheckBox
                                        size={20}
                                        onClick={handleCheck}
                                    />
                                    :
                                    <MdOutlineCheckBoxOutlineBlank
                                        size={20}
                                        onClick={handleCheck}
                                    />
                                }
                            </td>
                            <td
                                className='px-4 py-2'
                            >
                                Date & Time</td>
                            <td
                                className='px-4 py-2'
                            >
                                Details</td>
                            <td
                                className='px-4 py-2'
                            >
                                Category</td>
                            <td
                                className='px-4 py-2'
                            >
                                Mode</td>
                            <td
                                className='px-4 py-2'
                            >
                                Bill</td>
                            <td
                                className='px-4 py-2'
                            >
                                Amount</td>
                            <td
                                className='px-4 py-2'
                            >
                                Balance</td>
                            <td
                                className='px-4 py-2'
                            >

                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            className='hover:bg-[#EBEEFD]'
                        >
                            <td
                                className='px-4 py-2'
                            >

                                {check ?
                                    <MdOutlineCheckBox
                                        size={20}
                                        onClick={handleCheck}
                                    />
                                    :
                                    <MdOutlineCheckBoxOutlineBlank
                                        size={20}
                                        onClick={handleCheck}
                                    />
                                }
                            </td>
                            <td
                                className='px-4 py-2'
                            >
                                <span>08 Jan 2024</span>
                                <br/>
                                <span className='text-xs'>08:22pm</span>
                            </td>
                            <td
                                className='px-4 py-2'
                            >
                                Robiul Awal
                            </td>
                            <td
                                className='px-4 py-2'
                            >
                                
                            </td>
                            <td
                                className='px-4 py-2'
                            >
                                
                            </td>
                            <td
                                className='px-4 py-2'
                            >
                                
                            </td>
                            <td
                                className='px-4 py-2'
                            >
                                1000
                            </td>
                            <td
                                className='px-4 py-2'
                            >
                                1000
                            </td>
                            <td
                                className='px-4 py-2'
                            >

                            </td>
                        </tr>
                    </tbody>
                </table>
                </div>
            </div>

        </UserLayout>
    );
};

export default Transactions;