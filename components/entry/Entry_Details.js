import {
    Drawer,
    DrawerContent,
    DrawerOverlay
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { MdOutlineKeyboardArrowDown, MdDeleteOutline } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import { GoPlus } from "react-icons/go";
import { FiMinus } from "react-icons/fi";
import { IoCloudDone } from "react-icons/io5";
import {Entry_Action} from '../Index';



const Entry_Details = ({ id, view, setView }) => {
    const type = 'cash_in'
    const [actionView,setActionView] = useState(false)
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
                            <p className='space-x-1 text-xl'>
                                <span>Entry Details</span>
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
                            className='p-3 space-y-2 border rounded'
                        >
                            <div
                                className='flex justify-between text-sm'
                            >
                                <p className={`w-1/2 flex items-center space-x-2 ${type === 'cash_in' ? 'text-[#01865F]' : 'text-[#C93B3B]'}`}>
                                    {
                                        type === 'cash_in' ? <GoPlus size={15} /> : <FiMinus size={15} />
                                    }
                                    <span>{type === 'cash_in' ? 'Cash In' : 'Cash Out'}</span>

                                </p>
                                <p className='w-1/2 flex items-center justify-end space-x-2'>
                                    <span>On 22 January 2024,12:26 PM</span>
                                    <IoCloudDone size={25} className='text-[#21B15B] cursor-pointer' />
                                </p>
                            </div>
                            <p
                                className={`pb-3 text-2xl ${type === 'cash_in' ? 'text-[#01865F]' : 'text-[#C93B3B]'}`}
                            >
                                1000
                            </p>
                            <div
                                className='pt-3 border-t'
                            >
                                <span
                                    className='px-3 py-1 text-sm bg-[#E7F1F9] text-[#137AC9] rounded'
                                >
                                    Cash
                                </span>
                            </div>
                        </div>
                        <p className='text-sm text-gray-600'>Activities</p>
                        <div
                            className='px-2 border-b'
                        >
                            <div
                                className='py-1 relative pl-6 border-l'
                            >
                                <div
                                    className='absolute -left-4 top-2.5'
                                >
                                    <GoPlus
                                        size={30}
                                        className='p-2 bg-gray-100 text-gray-400 rounded-full'
                                    />
                                </div>
                                <div>
                                    <p>Created By you</p>
                                    <p className='text-gray-500 text-sm'>
                                        On 22 January 2024,12:26 PM
                                    </p>
                                </div>
                            </div>
                            <div
                                className='py-1 relative pl-6 border-l'
                            >
                                <div
                                    className='absolute -left-4 top-2.5'
                                >
                                    <AiOutlineEdit
                                        size={30}
                                        className='p-2 bg-gray-100 text-gray-400 rounded-full'
                                    />
                                </div>
                                <div>
                                    <p>Last Updated By you</p>
                                    <p className='text-gray-500 text-sm'>
                                        On 22 January 2024,12:26 PM
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className='h-20 px-6 flex justify-end items-center space-x-5 text-sm border-t'
                    >
                        <button
                            className='px-6 py-3 flex items-center space-x-2 text-red-500 border rounded'
                        >
                            <MdDeleteOutline size={20} />
                            <span>Delete</span>
                        </button>
                        <button
                            onClick={()=>setActionView(!actionView)}
                            className='px-6 py-3 flex items-center space-x-2 text-[#4863D4] border rounded'
                        >
                            <span>More Action</span>
                            <MdOutlineKeyboardArrowDown size={20} />
                        </button>
                        <button
                            className='px-8 py-3 flex items-center space-x-2 bg-[#4863D4] text-white rounded'
                        >
                            <span>Edit</span>
                            <AiOutlineEdit size={20} />
                        </button>
                    </div>
                    
                    {actionView &&
                        <Entry_Action {...{
                            view : actionView,
                            setView : setActionView
                        }}/>
                    }
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default Entry_Details;