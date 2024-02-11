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
import moment from 'moment'
import { Category_Add, Payment_Add } from '../Index';
import Entry_Add_Hour from '../entry-helper/Entry_Add_Hour';
import Entry_Add_Minute from '../entry-helper/Entry_Add_Minute';
import Entry_Add_AMPM from '../entry-helper/Entry_Add_AMPM';
import Entry_Add_Category from '../entry-helper/Entry_Add_Category';
import Entry_Add_Payment from '../entry-helper/Entry_Add_Payment';


const Entry_Add = ({ type, setType, view, setView }) => {
    const [timeView, setTimeView] = useState(false)
    const [categoryView, setCategoryView] = useState(false)
    const [paymentView, setPaymentView] = useState(false)
    const [addView, setAddView] = useState(false)
    const [paymentAddView, setPaymentAddView] = useState(false)
    const [date, setDate] = useState(moment().format('YYYY-MM-DD'))
    const [hour, setHour] = useState(moment().format('hh'))
    const [minute, setMinute] = useState(moment().format('mm'))
    const [ampm, setAmPm] = useState(moment().format('A'))
    const dateTimeString = `${date} ${hour}:${minute} ${ampm}`
    const dateObj = moment(dateTimeString, 'YYYY/MM/DD hh:mm A').toDate()
    const [value, setValue] = useState({
        amount: 0,
        remark: '',
        category: '',
        payment: ''
    })
    console.log(dateObj)
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
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
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
                                        <span>{`${hour}:${minute}:${ampm}`}</span>
                                    </button>
                                    :
                                    <div
                                        className='space-x-2'
                                    >
                                        <Entry_Add_Hour {...{ hour, setHour }} />
                                        <Entry_Add_Minute {...{ minute, setMinute }} />
                                        <Entry_Add_AMPM {...{ ampm, setAmPm }} />
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
                            <Entry_Add_Category {...{ addView, setAddView, categoryView, setCategoryView }} />

                            <Entry_Add_Payment {...{ paymentAddView, setPaymentAddView, paymentView, setPaymentView }} />

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

                    {addView &&
                        <Category_Add {...{
                            view: addView,
                            setView: setAddView
                        }} />
                    }

                    {paymentAddView &&
                        <Payment_Add {...{
                            view: paymentAddView,
                            setView: setPaymentAddView
                        }} />
                    }
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default Entry_Add;