import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { BsBuildings } from "react-icons/bs";
import { GoPlus } from "react-icons/go";
import { IoSettingsOutline } from 'react-icons/io5';
import { MdBook } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { addBooks, addBusinesses, addCurrentBusiness, removeBusiness, renameBook, updateBusiness } from '../store/slice/bookSlice';
import BusinessManager from '../utils/BusinessManager';
import api from '../utils/api';
import socket from '../utils/socket';
import { Business_Add, Header } from './Index';
import axios from 'axios'


const UserLayout = ({ path, children }) => {
    const dispatch = useDispatch()
    const { books, businesses, currentBusiness, currentBook } = useSelector(state => state.book)
    const { isAuth, user } = useSelector(state => state.auth)
    const router = useRouter()
    const [view, setView] = useState(false)

    const businessManager = new BusinessManager(user, books, businesses, currentBusiness)

    if (!isAuth) {
        router.push('/signin')
    }

    const handleRoute = (business) => {
        router.push(`/business/${business?._id}/cashbooks`)
        dispatch(addCurrentBusiness(business))
    }

    const handleChecking = async () => {
        try {
            const res = await axios.get(`${api}/user/checking`, {
                headers: {
                    "cb-access-token": localStorage.getItem("cb_access_token")
                }
            })

            if (res.data.success) {

                const { businesses, books } = res.data.data

                dispatch(addBusinesses(businesses))
                dispatch(addBooks(books))
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        //===============Business=================
        socket.on('update_business_client', data => {
            dispatch(updateBusiness(data))
            dispatch(addCurrentBusiness(data))
        })

        socket.on('remove_business_client', data => {
            dispatch(removeBusiness(data.id))
            router.push('/checking')
        })

        socket.on('add_business_client', async (data) => {
            handleChecking()
        })
        //===============Business=================

        //===============Book=================
        //add book member
        socket.on('add_team_client', data => {
            handleChecking()
            if(router.asPath === `/business/${data?.business}/cashbooks`){
                router.reload()
            }
        })
        socket.on('update_book_client', data => {
            dispatch(renameBook(data))
        })

        //remove book member
        socket.on('remove_team_client', data => {
            if (currentBook._id === data._id) {
                router.push('/checking')
            } else {
                dispatch(renameBook(data))
            }
        })
        //===============Book=================
    })

    useEffect(() => {
        socket.emit('join_cashbook', { _id: user._id })
        socket.on('connection', (socket) => {

        })
    })

    return (
        <div
            className='h-screen overflow-hidden'
        >
            <Header />
            <div
                className='h-[calc(100vh-48px)] flex justify-between'
            >
                <div
                    className='hidden md:block md:w-2/12 bg-[#2c324B] text-white'
                >
                    <div
                        className='h-[70px] p-4 bg-[#212121]'
                    >
                        <div
                            onClick={() => setView(!view)}
                            className='p-1 flex space-x-3 items-center bg-[#2c324B] rounded-md cursor-pointer'
                        >
                            <GoPlus
                                size={28}
                                className='p-0.5 text-3xl bg-[#4863D4] rounded-md'
                            />
                            <span>Add New Business</span>
                        </div>
                    </div>
                    <div
                        className='h-[calc(100vh-118px)] p-2 space-y-2 overflow-y-auto'
                    >
                        {businesses?.length > 0 &&
                            businesses.map(business =>
                                <div
                                    key={business?._id}
                                    className={`space-y-2 pb-2 ${business?._id === currentBusiness?._id && 'border-b border-gray-50/50'}`}
                                >
                                    <div
                                        onClick={() => handleRoute(business)}
                                        className={`p-4 flex items-center space-x-3  ${business?._id === currentBusiness?._id && 'bg-[#4863d4]'} rounded cursor-pointer`}
                                    >
                                        <p>
                                            <BsBuildings
                                                size={30}
                                                className='px-2 bg-gray-50 text-gray-500 rounded'
                                            />
                                        </p>
                                        <div>
                                            <p className='text-sm'>{business?.name}</p>
                                            <p className='text-xs'>
                                                Role : {businessManager.getRole(business)} - {businessManager.totalBook(business._id)} Book
                                            </p>
                                        </div>
                                    </div>
                                    {business?._id === currentBusiness?._id &&
                                        <div>
                                            <button
                                                onClick={() => router.push(`/business/${business?._id}/cashbooks`)}
                                                className={`w-full px-4 py-2 flex items-center space-x-2 rounded ${!path && 'bg-[#212121]'}`}
                                            >
                                                <span>
                                                    <MdBook />
                                                </span>
                                                <span>Cashbooks</span>
                                            </button>
                                            <button
                                                onClick={() => router.push(`/business/${business?._id}/business-settings/team`)}
                                                className={`w-full px-4 py-2 flex items-center space-x-2 rounded ${path && 'bg-[#212121]'}`}
                                            >
                                                <span>
                                                    <IoSettingsOutline />
                                                </span>
                                                <span>Settings</span>
                                            </button>
                                        </div>
                                    }
                                </div>
                            )
                        }
                    </div>
                </div>
                <div
                    className='w-full md:w-10/12 overflow-y-auto bg-gray-50 md:bg-white'
                >
                    {children}
                </div>

                {view && <Business_Add {...{
                    view, setView
                }} />}

            </div>
        </div>
    );
};

export default UserLayout;