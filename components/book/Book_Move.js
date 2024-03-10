import {
    Drawer,
    DrawerContent,
    DrawerOverlay
} from '@chakra-ui/react';
import moment from 'moment';
import React, { useState } from 'react';
import { IoMdArrowRoundForward } from 'react-icons/io';
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { moveBook } from '../../libs/allBookAction';
import { refresh, renameBook } from '../../store/slice/bookSlice';
import { Business_Add } from '../Index';

const Book_Move = ({ id,view, setView }) => {
    const dispatch = useDispatch()
    const {businesses,currentBusiness} = useSelector(state=>state.book)
    const avialabeBusinesses = businesses.filter(business=> business._id !== currentBusiness._id)
    const [business, setBusiness] = useState(avialabeBusinesses.length > 0 ? avialabeBusinesses[0] : {})
    const [addBusinessView, setAddBusinessView] = useState(false)
    const [loading,setLoading] = useState(false)

    return (
        <>
            <Drawer
                isOpen={view}
                placement='right'
                size='lg'
            >
                <DrawerOverlay />
                <DrawerContent>
                    <div
                        className='h-16'
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
                    </div>
                    <div
                        className='h-[calc(100vh-208px)] p-6 space-y-5 overflow-y-auto'
                    >
                        <div
                            className='flex justify-between items-center'
                        >
                            <p>Please Select with you want to move</p>
                            
                        </div>

                        {avialabeBusinesses?.length > 0 ?
                            <div
                                className='space-y-2'
                            >
                                {
                                    avialabeBusinesses.map(b =>
                                        <div
                                            key={b._id}
                                            onClick={() => setBusiness(b)}
                                            className={`py-2 flex space-x-3 border-b ${business?._id === b._id ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                                        >
                                            {business?._id === b._id ?
                                                <MdRadioButtonChecked size={25} className='text-[#4863D4]' />
                                                :
                                                <MdRadioButtonUnchecked size={25} />
                                            }
                                            <div
                                                className='space-y-1'
                                            >
                                                <p className=''>{b?.name}</p>
                                                <p className='text-sm text-gray-500'>
                                                    <span>Created on : {moment(b?.createdAt).fromNow()}</span>
                                                    <span> | </span>
                                                    <span>{b?.books?.length + 1} Books</span>
                                                </p>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                            :
                            <div
                                className='pt-10 flex flex-col justify-center items-center space-y-3'
                            >
                                <p className='text-sm text-gray-500 text-center'>No business found for this action</p>
                                <button
                                    onClick={() => setAddBusinessView(!addBusinessView)}
                                    className='px-6 py-2 text-[#4863D4] hover:bg-gray-50 border rounded'
                                >
                                    Create New Business
                                </button>
                            </div>
                        }
                    </div>
                    <div
                        className='h-16 px-6 py-4 flex justify-between items-center text-sm bg-gray-100'
                    >
                        <div
                            className='w-full'
                        >
                            <p className='text-gray-500'>Moving From</p>
                            <p>{currentBusiness?.name}</p>
                        </div>
                        <IoMdArrowRoundForward size={40} />
                        <div
                            className='w-full pl-4'
                        >
                            <p className='text-gray-500'>Moving From</p>
                            <p>
                                {business?.name ? business?.name : 'Please select a valid book'}
                            </p>
                        </div>
                    </div>
                    <div
                        className='h-20 px-6 flex justify-end items-center space-x-5'
                    >
                        <button
                            onClick={() => setView(!view)}
                            className='px-6 py-3 text-[#4863D4] border rounded'
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => moveBook({
                                id,
                                to : business?._id,
                                action : renameBook,
                                refresh,
                                dispatch,
                                setLoading,
                                setView
                            })}
                            className={`px-8 py-3 border rounded ${business?.name ? 'bg-[#4863D4] text-white' : 'bg-gray-100 text-gray-600 cursor-not-allowed'}`}
                            disabled={business?.name ? false : true}
                        >
                            {loading ? 'Moving...' : 'Move'}
                        </button>
                    </div>
                    {addBusinessView &&
                        <Business_Add {...{
                            view : addBusinessView,
                            setView : setAddBusinessView
                        }}/>
                    }
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default Book_Move;