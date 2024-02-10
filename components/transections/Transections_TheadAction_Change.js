import React from 'react';
import {
    Menu,
    MenuButton,
    MenuList,
} from '@chakra-ui/react'
import { HiOutlineUsers } from 'react-icons/hi2';
import { MdOutlineArrowDropDown, MdOutlineCategory, MdOutlinePayments } from 'react-icons/md';
import { FaExchangeAlt } from 'react-icons/fa';

const Transections_TheadAction_Change = ({ categoryView, setCategoryView, paymentView, setPaymentView, contactView, setContactView }) => {
    return (
        <Menu>
            <MenuButton

            >
                <button
                    className='flex items-center space-x-2 text-[#4863D4]'
                >
                    <FaExchangeAlt
                        size={15}
                    />
                    <span>Change Field</span>
                    <MdOutlineArrowDropDown size={20} className='text-gray-500' />
                </button>

            </MenuButton>
            <MenuList
                className='space-y-2'
            >
                <button
                    onClick={() => setCategoryView(!categoryView)}
                    className='w-full p-2 flex space-x-2 text-gray-700 hover:bg-slate-100'
                >
                    <MdOutlineCategory size={20} />
                    <span>Change Category</span>
                </button>

                <button
                    onClick={() => setPaymentView(!paymentView)}
                    className='w-full p-2 flex space-x-2 text-gray-700 hover:bg-slate-100'
                >
                    <MdOutlinePayments size={20} />
                    <span>Change Payment Mode</span>
                </button>

                <button
                    onClick={() => setContactView(!contactView)}
                    className='w-full p-2 flex space-x-2 text-gray-700 hover:bg-slate-100'
                >
                    <HiOutlineUsers size={20} />
                    <span>Change Contact</span>
                </button>
            </MenuList>
        </Menu>
    );
};

export default Transections_TheadAction_Change;