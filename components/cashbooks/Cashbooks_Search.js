import React from 'react';
import { CiSearch } from 'react-icons/ci';
import { TiArrowSortedDown } from 'react-icons/ti';
import { MdOutlineRadioButtonChecked, MdOutlineTurnRight, MdRadioButtonUnchecked } from "react-icons/md";
import {
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
} from '@chakra-ui/react';

const Cashbooks_Search = ({ sortBy, setSortBy }) => {
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
                    <div
                        className='w-full p-[10px] flex justify-between items-center space-x-2 text-sm'
                    >
                        <span>Sort by : {sortBy?.title}</span>
                        <TiArrowSortedDown />
                    </div>
                </MenuButton>
                <MenuList>
                    {
                        sorts.map((sort, i) =>
                            <MenuItem
                                key={i}
                            >
                                <button
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
                                </button>
                            </MenuItem>
                        )
                    }
                    <div></div>
                </MenuList>
            </Menu>
        </div>
    );
};

export default Cashbooks_Search;