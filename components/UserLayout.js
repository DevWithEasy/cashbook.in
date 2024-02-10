import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { BsBuildings } from "react-icons/bs";
import { GoPlus } from "react-icons/go";
import { IoSettingsOutline } from 'react-icons/io5';
import { MdBook } from "react-icons/md";
import { useSelector,useDispatch } from 'react-redux';
import { addCurrentBusiness } from '../store/slice/bookSlice';
import { Business_Add, Header } from './Index';

const UserLayout = ({ path, children }) => {
    const dispatch = useDispatch()
    const { businesses, currentBusiness } = useSelector(state => state.book)
    const { isAuth } = useSelector(state => state.auth)
    const router = useRouter()
    const [view, setView] = useState(false)

    if(!isAuth) {
        router.push('/signin')
    }
    
    const handleRoute=(business)=>{
        router.push(`/business/${business?._id}/cashbooks`)
        dispatch(addCurrentBusiness(business))
    }
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
                                            <p className='text-xs'>Role : Owner - 6 Book</p>
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
                                                onClick={() => router.push(`/business/${business?._id}/business-settings/settings`)}
                                                className={`w-full px-4 py-2 flex items-center space-x-2 rounded ${path == 'settings' && 'bg-[#212121]'}`}
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
                    className='w-full md:w-10/12 overflow-y-auto'
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