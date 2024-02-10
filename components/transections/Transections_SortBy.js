import React from 'react';
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
} from '@chakra-ui/react'
import { TiArrowSortedDown } from 'react-icons/ti';
import { MdOutlineRadioButtonChecked, MdRadioButtonUnchecked } from 'react-icons/md';

const Transections_SortBy = ({ typeBy, setTypeBy, durationBy, setDurationBy }) => {
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
    return (
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
    );
};

export default Transections_SortBy;