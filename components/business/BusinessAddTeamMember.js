import {
    Drawer,
    DrawerContent,
    DrawerOverlay
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { TiInfo } from "react-icons/ti";
import { IoMdArrowBack } from "react-icons/io";
import user_img from '../../public/image/profile.png'
import Image from "next/image";

const BusinessAddTeamMember = ({ view, setView }) => {
    const [nextStep, setNextStep] = useState(false)
    const [emailView, setEmailView] = useState(false)

    const topics = [
        'Every business can have only one owner',
        'Once you transfer ownership to new owner, your role will be changed to partner',
        'New owner can remove you from business or delete the business',
        'You will not be able to reverse this'
    ]
    const nextTopics = [
        'Add ‘Partner’ from business team page',
        'Alternately you can change the role of existing staff member to partner',
        'Once you have partner in your team, then you can transfer ownership to them'
    ]

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
                            <div>
                                {!nextStep ?
                                    <p className='text-xl'>
                                        Add Team Member
                                    </p>
                                    :
                                    <p className='text-xl flex items-center space-x-3'>
                                        <IoMdArrowBack
                                            size={25}
                                            onClick={(e) => setNextStep(!nextStep)}
                                            className='cursor-pointer'
                                        />
                                        <span>
                                            Choose Role & Add
                                        </span>
                                    </p>
                                }
                            </div>
                            <button
                                onClick={() => setView(!view)}
                                className='px-4 py-1 border rounded'
                            >X</button>
                        </div>
                    </div>
                    <div
                        className='h-[calc(100vh-144px)] p-6 space-y-5 overflow-y-auto'
                    >
                        {!nextStep ?
                            <div
                                className=''
                            >
                                {emailView ?
                                    <div>

                                    </div>
                                    :
                                    <div
                                        className='space-y-1'
                                    >
                                        <label className='block text-sm'>Add Mail</label>
                                        <input
                                            type='email'
                                            placeholder='eg - xyz123@gmail.com'
                                            className='w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ring-[#4863D4]'
                                        />
                                    </div>
                                }
                            </div>
                            :
                            <div>
                                <div
                                    className='space-y-2 text-sm'
                                >
                                    {
                                        topics.map((topic, i) =>
                                            <div key={i}
                                                className='flex items-end space-x-2'
                                            >
                                                <p>
                                                    <span className='inline-block h-3 w-3 rounded-full bg-gray-200'></span>
                                                </p>
                                                <p>{topic}</p>
                                            </div>)
                                    }
                                </div>
                            </div>
                        }

                    </div>

                    <div
                        className='h-20 p-6 flex justify-end items-center space-x-5 border-t'
                    >
                        {!nextStep ?
                            <div
                                className='flex items-center space-x-4'
                            >
                                <button
                                    onClick={(e) => setEmailView(!emailView)}
                                    className='flex items-center space-x-2  px-8 py-3 text-[#4863D4]  border rounded'

                                >
                                    Add With Mobile Number
                                </button>
                                <button
                                    onClick={(e) => setNextStep(!nextStep)}
                                    className='flex items-center space-x-2  px-8 py-3 border bg-[#4863D4] text-white rounded'

                                >
                                    Next
                                </button>
                            </div>
                            :
                            <div
                                className='flex items-center space-x-4'
                            >
                                <button
                                    onClick={(e) => setNextStep(!nextStep)}
                                    className='flex items-center space-x-2  px-8 py-3 border bg-[#4863D4] text-white rounded'

                                >
                                    <span>Transfer Ownership</span>
                                </button>
                                <button
                                    onClick={(e) => setNextStep(!nextStep)}
                                    className='flex items-center space-x-2  px-8 py-3 border bg-[#4863D4] text-white rounded'

                                >
                                    <span>Transfer Ownership</span>
                                </button>
                            </div>
                        }
                    </div>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default BusinessAddTeamMember;