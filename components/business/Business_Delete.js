import {
    Drawer,
    DrawerContent,
    DrawerOverlay
} from '@chakra-ui/react';
import React from 'react';
import { RxCross2 } from 'react-icons/rx';
import { TiInfo } from "react-icons/ti";
import { IoMdCheckmark } from "react-icons/io";

const Business_Delete = ({ view, setView }) => {

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
                            <p className='text-xl'>Delete Business</p>
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
                            className='flex flex-col items-center space-y-2 p-4 bg-[#faebeb] rounded'
                        >
                            <TiInfo
                                size={40}
                                className='text-[#c93b3b]'
                            />
                            <p
                                className='w-full text-2xl text-center'
                            >
                                Are you sure?
                            </p>
                            <p
                                className='w-10/12 mx-auto text-center text-sm'
                            >
                                This business will be deleted permanently. All the team members will lose access
                            </p>
                            <p
                                className='py-5 text-center'
                            >
                                <span className='inline-block bg-red-200 h-1 w-6'></span>
                            </p>
                            <p
                                className='w-full text-xl text-center'
                            >
                                You are deleting
                            </p>
                            <div
                                className='w-10/12 mx-auto flex justify-between p-4 bg-white rounded'
                            >
                                <div
                                    className='w-1/2 flex flex-col justify-center items-center'
                                >
                                    <p className='text-3xl text-[#c93b3b]'>5</p>
                                    <p>Books</p>
                                </div>
                                <div
                                    className='w-1/2 flex flex-col justify-center items-center border-l'
                                >
                                    <p className='text-3xl text-[#c93b3b]'>15</p>
                                    <p>Entries</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className='h-20 p-6 flex justify-end items-center space-x-5'
                    >
                        <button
                            onClick={(e) => { }}
                            className='flex items-center space-x-2 px-6 py-3 border text-red-500 rounded'

                        >
                            <IoMdCheckmark />
                            <span>Continue</span>
                        </button>

                        <button
                            onClick={(e) => { }}
                            className='flex items-center space-x-2  px-6 py-3 border bg-[#4863D4] text-white rounded'

                        >
                            <RxCross2 />
                            <span>Cancel</span>
                        </button>
                    </div>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default Business_Delete;