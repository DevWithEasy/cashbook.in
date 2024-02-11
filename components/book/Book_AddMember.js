import {
    Drawer,
    DrawerContent,
    DrawerOverlay
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { ImUsers } from 'react-icons/im';
import { IoIosArrowForward } from 'react-icons/io';
import { MdInfo } from "react-icons/md";
import { Business_AddTeamMember } from '../Index';

const Book_AddMember = ({ view, setView }) => {
    const [addView,setAddView]=useState(false)
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
                        className='h-28'
                    >
                        <div
                            className='px-6 py-4 flex justify-between items-center border-b'
                        >
                            <p className='text-xl'>Add from book</p>
                            <button
                                onClick={() => setView(!view)}
                                className='px-4 py-1 border rounded'
                            >X</button>
                        </div>
                        <div
                            className='p-4 flex items-center space-x-3 bg-[#EEEDFA]'
                        >
                            <MdInfo
                                size={20}
                                className='text-[#4863D4]'
                            />
                            <p
                                className='text-sm'
                            >
                                You can add members to this book from the staff of “book”
                            </p>
                        </div>
                    </div>
                    <div
                        className='h-[calc(100vh-192px)] p-6 space-y-5 overflow-y-auto'
                    >
                        <div
                            className='space-y-2'
                        >
                            <input
                                placeholder='Search by name or number...'
                                className='w-full p-2 border rounded focus:outline-[#4863D4]'
                            />
                        </div>
                        <div
                            onClick={()=>setAddView(!addView)}
                            className='flex justify-between items-center cursor-pointer'
                        >
                            <div
                                className='flex items-center space-x-4'
                            >
                                <ImUsers
                                    size={50}
                                    className='p-4 bg-[#ebeefb] text-[#4863D4] rounded-full'
                                />
                                <div
                                    className='text-sm space-y-1'
                                >
                                    <p className='font-semibold'>Add New Member</p>
                                    <p className='text-gray-500 text-xs'>
                                        Invite members who are not part of your business yet</p>
                                </div>
                            </div>
                            <IoIosArrowForward />
                        </div>
                        <div
                            className='space-y-3'
                        >
                            <p className='text-slate-700'>Members of book</p>
                            <div>
                                <p className='text-gray-500 text-sm'>There are no staff members in business!</p>
                            </div>
                        </div>
                    </div>
                    <div
                        className='h-20 p-6 flex justify-end items-center space-x-4'
                    >
                        <button
                            onClick={() => setView(!view)}
                            className='px-6 py-2 bg-gray-200 rounded'
                        >
                            Cancel
                        </button>
                        <button
                            className='px-6 py-2 bg-[#4863D4] text-white rounded'
                        >
                            Add New Book
                        </button>
                    </div>
                    {view &&
                        <Business_AddTeamMember {...{
                            view: addView,
                            setView: setAddView
                        }}/>
                    }
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default Book_AddMember;