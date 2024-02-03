import React, { useState } from 'react';
import UserLayout from '../../../components/UserLayout';
import { HiUsers } from "react-icons/hi";
import { CiSearch } from "react-icons/ci";
import { TiArrowSortedDown } from "react-icons/ti";
import { MdRadioButtonUnchecked } from "react-icons/md";
import { MdOutlineRadioButtonChecked } from "react-icons/md";
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
} from '@chakra-ui/react'

const Cashbooks = () => {
    const [sortBy,setSortBy] = useState('last_update')
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
                            className='flex justify-between'
                        >
                            <div
                                className='w-8/12 flex items-center space-x-5'
                            >
                                <div
                                    className='relative w-8/12'
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

                                >
                                    <MenuButton
                                        className='w-4/12 border rounded'
                                    >
                                        <button
                                            className='w-full p-[10px] flex justify-between items-center text-sm'
                                        >
                                            <span>Sort by : {sortBy}</span>
                                            <TiArrowSortedDown />
                                        </button>
                                    </MenuButton>
                                    <MenuList>
                                        {
                                            sorts.map((sort, i) =>
                                                <MenuItem
                                                    key={i}
                                                    className='space-x-2'
                                                >
                                                    {sort.sort === sortBy ?
                                                    <MdOutlineRadioButtonChecked className='text-[#4863D4]'/>
                                                    :
                                                    <MdRadioButtonUnchecked/>
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
                                className='w-4/12'
                            >

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </UserLayout>
    );
};

export default Cashbooks;