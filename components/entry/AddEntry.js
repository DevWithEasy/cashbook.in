import {
    Drawer,
    DrawerContent,
    DrawerOverlay
} from '@chakra-ui/react';
import React, { useRef, useState } from 'react';
import { BsClock } from "react-icons/bs";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const AddEntry = ({ type, setType, view, setView }) => {
    const [timeView, setTimeView] = useState(false)
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
                            <input
                                type="date"
                                className='px-4 py-2 rounded border'
                            />
                            <div>
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
                                            className='px-4 py-2 border rounded'
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
                                            className='px-4 py-2 border rounded'
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
                                            className='px-4 py-2 border rounded'
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
                    </div>
                    <div
                        className='h-20'
                    >

                    </div>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default AddEntry;