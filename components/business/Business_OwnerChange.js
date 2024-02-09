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

const Business_OwnerChange = ({ view, setView }) => {
    const [nextStep, setNextStep] = useState(false)

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
                                        Change Owner
                                    </p>
                                    :
                                    <p className='text-xl flex items-center space-x-3'>
                                        <IoMdArrowBack
                                            size={25}
                                            onClick={(e) => setNextStep(!nextStep)}
                                            className='cursor-pointer'
                                        />
                                        <span>
                                            Choose New Owner
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
                        className={`${nextStep ? 'h-[calc(100vh-144px)]' : 'h-[calc(100vh-184px)]'} p-6 space-y-5 overflow-y-auto`}
                    >
                        {!nextStep ?
                            <div
                                className='flex flex-col items-center space-y-2 p-4 bg-[#faebeb] rounded'
                            >
                                <TiInfo
                                    size={40}
                                    className='text-[#c93b3b]'
                                />
                                <p
                                    className='w-11/12 mx-auto text-xl text-center'
                                >
                                    This will transfer all your permissions to new owner
                                </p>
                            </div>
                            :
                            <div>
                                <div
                                    className='flex flex-col items-center space-y-2 p-4 rounded'
                                >
                                    <Image
                                        src={user_img.src}
                                        alt="logo"
                                        className="rounded-full"
                                        height={60}
                                        width={60}
                                    />
                                    <p
                                        className='w-full text-xl text-center'
                                    >
                                        No business partners found!
                                    </p>
                                    <p
                                        className='w-10/12 mx-auto text-center text-sm'
                                    >
                                        Add partner from business team page & then you can transfer ownership to them
                                    </p>
                                    <p
                                        className='py-5 text-center'
                                    >
                                        <span className='inline-block bg-gray-200 h-1 w-6'></span>
                                    </p>
                                </div>
                            </div>
                        }
                        <div
                            className='space-y-2 text-sm'
                        >
                            {
                                (nextStep ? nextTopics : topics)
                                    .map((topic, i) =>
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
                    {!nextStep &&
                        <p
                            className='h-10 flex items-center space-x-2 px-6 py-2 bg-gray-200 text-xs'
                        >
                            <span>Next Step:</span>
                            <span className='font-semibold'>Choose New Owner</span>
                        </p>
                    }
                    <div
                        className='h-20 p-6 flex justify-end items-center space-x-5 border-t'
                    >
                        {!nextStep ?
                            <button
                            onClick={(e) => setNextStep(!nextStep)}
                            className='flex items-center space-x-2  px-8 py-3 border bg-[#4863D4] text-white rounded'

                        >
                            <span>Next</span>
                        </button>
                        :
                        <button
                            onClick={(e) => setNextStep(!nextStep)}
                            className='flex items-center space-x-2  px-8 py-3 border bg-[#4863D4] text-white rounded'

                        >
                            <span>Transfer Ownership</span>
                        </button>
                        }
                    </div>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default Business_OwnerChange;