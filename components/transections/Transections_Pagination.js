import React, { useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
} from '@chakra-ui/react'
import { TiArrowSortedDown } from 'react-icons/ti';
import { MdOutlineRadioButtonChecked, MdRadioButtonUnchecked } from 'react-icons/md';

const Transections_Pagination = ({selected}) => {
    const [durationBy, setDurationBy] = useState({
        title: 'All Time',
        sort: 'all_time'
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
    return (
        <div
            className='sticky top-0 p-2 z-10 flex justify-between items-center bg-white rounded-md'
        >
            <p
                className='text-sm space-x-3'
            >
                <span
                    className='text-gray-500'
                >
                    Showing 1-2 of 2 Entries
                </span>
                {selected.length > 0 &&
                    <>
                        <span
                            className='text-gray-200'
                        >
                            |
                        </span>
                        <span>1 selected on this page.</span>
                    </>
                }
            </p>
            <div
                className='flex justify-end space-x-3'
            >
                <div
                    className='space-x-2'
                >
                    <Menu>
                        <MenuButton
                            className='border rounded bg-white'
                        >
                            <div
                                className='w-full px-2 py-1 flex justify-between items-center space-x-2 text-sm'
                            >
                                <span>Page 01</span>
                                <TiArrowSortedDown />
                            </div>
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
                        className='p-1 bg-gray-200 rounded cursor-pointer'
                    />
                    <IoIosArrowForward
                        size={25}
                        className='p-1 bg-gray-200 rounded cursor-pointer'
                    />
                </div>
            </div>
        </div>
    );
};

export default Transections_Pagination;