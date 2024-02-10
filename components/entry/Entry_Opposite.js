import {
    Drawer,
    DrawerContent,
    DrawerOverlay
} from '@chakra-ui/react';
import React from 'react';
import { BsBuildings } from "react-icons/bs";
import { ImSpinner9 } from "react-icons/im";
import { MdInfo } from "react-icons/md";

const Entry_Opposite = ({ view, setView }) => {

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
                            <p className='text-xl'>Move Book</p>
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
                                Move the the another business.It not avilable in this business
                            </p>
                        </div>
                    </div>
                    <div
                        className='h-[calc(100vh-192px)] p-6 space-y-5 overflow-y-auto'
                    >
                        <div
                            className='flex justify-between items-center'
                        >
                            <p>Please Select with you want to move</p>
                            <div
                                className='px-2 py-1 flex items-center space-x-2 border rounded'
                            >
                                <ImSpinner9
                                    size={20}
                                    className='animate-spin'
                                />
                                <span className='animate-pulse'>Moving ...</span>
                            </div>
                        </div>

                        <div
                            className='px-4 py-2 flex items-center space-x-3 text-sm bg-[#EEEDFA] hover:bg-[#e2dffc] border rounded cursor-pointer'
                        >
                            <BsBuildings
                                size={20}
                                className='text-[#4863D4]'
                            />
                            <span>Book Name</span>
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

export default Entry_Opposite;