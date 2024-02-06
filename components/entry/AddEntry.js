import {
    Drawer,
    DrawerContent,
    DrawerOverlay
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { BsClock } from "react-icons/bs";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { RiArrowDownSFill } from "react-icons/ri";
import { GoPlus } from "react-icons/go";


const AddEntry = ({ type, setType, view, setView }) => {
    const [timeView, setTimeView] = useState(false)
    const [categoryView, setCategoryView] = useState(false)
    const [paymentView, setPaymentView] = useState(false)

    return (
        <>
            <Drawer
                isOpen={view}
                placement='right'
                size='md'
            >
                <DrawerOverlay />
                <DrawerContent>
                    <div
                        className='h-16 border-b'
                    >
                        <div
                            className='px-6 py-4 flex justify-between items-center'
                        >
                            <p className={`space-x-1 text-xl ${type == 'cash_out' && 'text-[#c93b3b]'}`}>
                                <span>Add Cash</span>
                                <span>{type === 'cash_in' ? 'In Entry' : 'Out Entry'}</span>
                            </p>
                            <button
                                onClick={() => setView(!view)}
                                className='px-4 py-1 border rounded'
                            >X</button>
                        </div>

                    </div>
                    <div
                        className='h-[calc(100vh-144px)] p-6 space-y-5 overflow-y-auto'
                    >
                        <div
                            className='flex items-center space-x-3 text-xs'
                        >
                            <button
                                onClick={() => setType('cash_in')}
                                className={`px-4 py-2 border rounded-full ${type == 'cash_in' && 'bg-[#01865F] text-white'}`}
                            >
                                Cash In
                            </button>
                            <button
                                onClick={() => setType('cash_out')}
                                className={`px-4 py-2 border rounded-full ${type == 'cash_out' && 'bg-[#c93b3b] text-white'}`}
                            >
                                Cash Out
                            </button>
                        </div>
                        <div
                            className='flex justify-between items-center'
                        >
                            <div
                                className='space-y-2'
                            >
                                <label className='block text-sm'>Date</label>
                                <input
                                    type="date"
                                    className='px-4 py-2 rounded border focus:outline-[#4863D4]'
                                />
                            </div>
                            <div
                                className='space-y-1'
                            >
                                <label className='block text-sm'>Time</label>
                                {!timeView ?
                                    <button
                                        onClick={() => setTimeView(!timeView)}
                                        className='px-6 py-2 flex items-center space-x-2 rounded border'
                                    >
                                        <BsClock />
                                        <span>12:30 PM</span>
                                    </button>
                                    :
                                    <div
                                        className='space-x-2'
                                    >
                                        <select
                                            className='px-4 py-2 border rounded focus:outline-[#4863D4]'
                                        >
                                            {
                                                new Array(12).fill(0).map((_, i) =>
                                                    <option
                                                        key={i}
                                                        value={i + 1}
                                                        className='flex items-center space-x-2'
                                                    >
                                                        <span>{i + 2}</span>
                                                        <span >
                                                            <MdOutlineKeyboardArrowDown />
                                                        </span>
                                                    </option>
                                                )
                                            }
                                        </select>
                                        <select
                                            className='px-4 py-2 border rounded focus:outline-[#4863D4]'
                                        >
                                            {
                                                new Array(59).fill(0).map((_, i) =>
                                                    <option
                                                        key={i}
                                                        value={i}
                                                        className='flex items-center space-x-2'
                                                    >
                                                        <span>{i}</span>
                                                        <span >
                                                            <MdOutlineKeyboardArrowDown />
                                                        </span>
                                                    </option>
                                                )
                                            }
                                        </select>
                                        <select
                                            className='px-4 py-2 border rounded focus:outline-[#4863D4]'
                                        >
                                            <option
                                                className='flex items-center space-x-2'
                                                value='AM'
                                            >
                                                <span>AM</span>
                                                <span >
                                                    <MdOutlineKeyboardArrowDown />
                                                </span>
                                            </option>
                                            <option
                                                className='flex items-center space-x-2'
                                                value='PM'
                                            >
                                                <span>PM</span>
                                                <span >
                                                    <MdOutlineKeyboardArrowDown />
                                                </span>
                                            </option>
                                        </select>
                                    </div>
                                }

                            </div>
                        </div>
                        <div
                            className='space-y-1'
                        >
                            <label className='block text-sm'>Amount</label>
                            <input
                                type='number'
                                placeholder='eg - 1000'
                                autoFocus
                                className='w-full px-4 py-2 border rounded focus:outline-[#4863D4]'
                            />
                        </div>
                        <div
                            className='space-y-1'
                        >
                            <label className='block text-sm'>Remark</label>
                            <input
                                type='text'
                                placeholder='eg - Enter Detail (Name, Bill No, Item, Quantity etc)'
                                className='w-full px-4 py-2 border rounded focus:outline-[#4863D4]'
                            />
                        </div>
                        <div
                            className='flex justify-between space-x-5'
                        >
                            <div
                                className='w-1/2 space-y-1'
                            >
                                <div
                                    className='flex justify-between items-center'
                                >
                                    <span className='text-sm'>Category</span>
                                    <IoSettingsOutline
                                        size={15}
                                        className='text-[#4863D4] cursor-pointer'
                                    />
                                </div>
                                <div
                                    className='relative rounded'
                                >
                                    <input
                                        onFocus={() => setCategoryView(!categoryView)}
                                        placeholder='Search or Select'
                                        className='w-full px-4 py-2 border rounded focus:outline-[#4863D4]'
                                    />
                                    <button
                                        onClick={() => setCategoryView(!categoryView)}
                                        className='absolute right-0 px-3 py-2.5 border-l'
                                    >
                                        <RiArrowDownSFill size={20} />
                                    </button>
                                    {categoryView &&
                                        <div
                                            className='absolute w-full h-[300px] mt-1 flex flex-col justify-between border rounded'
                                        >
                                            <div
                                                className='h-[260px] p-2 overflow-y-auto'
                                            >
                                                <p className='text-sm text0gray-600 text-center'>Suggestions</p>


                                            </div>
                                            <div
                                                className='h-10 px-2'
                                            >
                                                <button
                                                    className='w-full flex justify-center items-center space-x-2 p-2 text-sm bg-gray-100 rounded'
                                                >
                                                    <GoPlus
                                                        className='text-[#4863D4]'
                                                    />
                                                    <span>Add New Category</span>
                                                </button>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                            <div
                                className='w-1/2 space-y-1'
                            >
                                <div
                                    className='flex justify-between items-center'
                                >
                                    <span className='text-sm'>Paymment</span>
                                    <IoSettingsOutline
                                        size={15}
                                        className='text-[#4863D4] cursor-pointer'
                                    />
                                </div>
                                <div
                                    className='relative rounded'
                                >
                                    <input
                                        onClick={() => setPaymentView(!paymentView)}
                                        placeholder='Search or Select'
                                        className='w-full px-4 py-2 border rounded focus:outline-[#4863D4]'
                                    />
                                    <button
                                        onClick={() => setPaymentView(!paymentView)}
                                        className='absolute right-0 px-3 py-2.5 border-l'
                                    >
                                        <RiArrowDownSFill size={20} />
                                    </button>
                                    {paymentView &&
                                        <div
                                            className='absolute w-full h-[300px] mt-1 flex flex-col justify-between border rounded'
                                        >
                                            <div
                                                className='h-[260px] p-2 overflow-y-auto'
                                            >
                                                <p className='text-sm text0gray-600 text-center'>Suggestions</p>


                                            </div>
                                            <div
                                                className='h-10 px-2'
                                            >
                                                <button
                                                    className='w-full flex justify-center items-center space-x-2 p-2 text-sm bg-gray-100 rounded'
                                                >
                                                    <GoPlus
                                                        className='text-[#4863D4]'
                                                    />
                                                    <span>Add New Payment</span>
                                                </button>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className='h-20 px-6 flex justify-end items-center space-x-5 text-sm border-t'
                    >
                        <button
                            className='px-8 py-3 text-[#4863D4] border rounded'
                        >
                            Save
                        </button>
                        <button
                            className='px-4 py-3 bg-[#4863D4] text-white rounded'
                        >
                            Save & Add New
                        </button>
                    </div>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default AddEntry;