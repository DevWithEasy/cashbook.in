import {
    Drawer,
    DrawerContent,
    DrawerOverlay
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { RxCross2 } from 'react-icons/rx';
import { TiInfo } from "react-icons/ti";
import { IoMdCheckmark } from "react-icons/io";
import { useSelector } from 'react-redux';
import axios from 'axios'
import { MdDeleteOutline } from 'react-icons/md';
import { notificationNOT, notificationOK } from '../../utils/toastNotification';

const Business_Delete = ({ view, setView }) => {
    const { currentBusiness } = useSelector(state => state.book)
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(false)
    const [nextStep, setNextStep] = useState(false)
    const [name, setName] = useState('')

    const getBusinessInfo = async () => {
        try {
            const res = await axios.get(`/api/business/info?id=${currentBusiness._id}`, {
                headers: {
                    "cb-access-token": localStorage.getItem("cb_access_token")
                }
            })
            if (res.data.success) {
                setData(res.data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleDeleteBusiness = async () => {
        setLoading(true)
        try {
            const res = await axios.delete(`/api/business?id=${currentBusiness._id}`, {
                headers: {
                    "cb-access-token": localStorage.getItem("cb_access_token")
                }
            })
            if (res.data.success) {
                setLoading(false)
                console.log(res.data)
                notificationOK(res.data.message)

            }
        } catch (error) {
            console.log(error)
            setLoading(false)
            notificationNOT(error.message)
        }
    }

    useEffect(() => {
        getBusinessInfo()
    }, [])

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
                        {nextStep ?
                            <div
                                className='space-y-5'
                            >
                                <p>
                                    Are you sure? Please Type <b>{currentBusiness?.name}</b> to confirm
                                </p>
                                <div className="space-y-1">
                                    <label className="text-sm text-gray-500">Enter Business Name</label>
                                    <input
                                        placeholder="Enter Business Name Here"
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full px-4 py-2 rounded border focus:outline-[#4863D4]"
                                        autoFocus={true}
                                    />
                                </div>
                                <div
                                    className='p-6 border rounded'
                                >
                                    <div
                                        
                                        className='flex items-center space-x-3 mb-3 text-[#c93b3b]'
                                    >
                                        <TiInfo
                                            size={25}
                                        />
                                        <p>{data?.books} book will be deleted</p>
                                    </div>
                                    <span
                                        className='p-1 text-sm bg-[#F7E1E1] rounded'
                                    >
                                        {currentBusiness?.name}
                                    </span>
                                </div>
                            </div>
                            :
                            <div
                                className='flex flex-col items-center space-y-2 p-4 bg-[#faebeb] rounded'
                            >
                                <TiInfo
                                    size={50}
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
                                        <p className='text-3xl text-[#c93b3b]'>
                                            {data?.books ? data?.books : 0}
                                        </p>
                                        <p>Books</p>
                                    </div>
                                    <div
                                        className='w-1/2 flex flex-col justify-center items-center border-l'
                                    >
                                        <p className='text-3xl text-[#c93b3b]'>
                                            {data?.entries ? data?.entries : 0}
                                        </p>
                                        <p>Entries</p>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                    <div
                        className='h-20 p-6 flex justify-end items-center space-x-5 border-t'
                    >
                        {nextStep ?
                            <button
                                onClick={handleDeleteBusiness}
                                className={`flex items-center space-x-2 px-6 py-3 border hover:border-[#C93B3B] text-[#C93B3B] rounded ${currentBusiness?.name !== name && 'cursor-not-allowed'}`}
                                disabled={currentBusiness?.name === name ? false : true}
                            >
                                <MdDeleteOutline />
                                <span>{loading ? 'Deleting...' : 'Delete'}</span>
                            </button>
                            :
                            <button
                                onClick={() => setNextStep(!nextStep)}
                                className='flex items-center space-x-2 px-6 py-3 border hover:border-[#C93B3B] text-[#C93B3B] rounded'

                            >
                                <IoMdCheckmark />
                                <span>Continue</span>
                            </button>

                        }

                        <button
                            onClick={() => setView(!view)}
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