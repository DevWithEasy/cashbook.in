import { Business_Add, UserLayout } from '../../components/Index';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'
import { GoPlus } from "react-icons/go";
import { IoSettingsOutline } from 'react-icons/io5';
import { MdBook } from "react-icons/md";
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { BsBuildings } from "react-icons/bs";
import BusinessManager from '../../utils/BusinessManager';
import Link from 'next/link'
import { CiSearch } from 'react-icons/ci';

const Businesses = () => {
    const dispatch = useDispatch()
    const { books, businesses, currentBusiness, currentBook } = useSelector(state => state.book)
    const { isAuth, user } = useSelector(state => state.auth)
    const router = useRouter()
    const [view, setView] = useState(false)
    const businessManager = new BusinessManager(user, books, businesses, currentBusiness)
    return (
        <UserLayout>
            <div
                className='h-[calc(100vh-48px)] bg-gray-100 md:bg-white'
            >
                <div
                    className=''
                >
                    <div
                        onClick={() => setView(!view)}
                        className='fixed bottom-7 right-3 px-4 py-2 flex justify-center space-x-2 items-center bg-[#4863D4] text-white rounded-full cursor-pointer'
                    >
                        <GoPlus
                            size={20}
                            className='p-0.5 text-3xl rounded-md'
                        />
                        <span>Add New</span>
                    </div>
                    <div
                        className='h-[calc(100vh-118px)] p-2 space-y-5 overflow-y-auto'
                    >
                        <div
                            className='relative'
                        >
                            <input
                                placeholder='Search by book name...'
                                className='w-full px-4 py-2 border focus:outline-[#4863D4] rounded'
                            />
                            <CiSearch
                                size={30}
                                className='absolute right-2 top-1 p-1 cursor-pointer'
                            />
                        </div>
                        <div
                            className='space-y-2'
                        >
                        {businesses?.length > 0 &&
                            businesses.map(business =>
                                <div
                                    key={business?._id}
                                    className='space-y-2 pb-2 bg-white rounded-md'
                                >
                                    <Link
                                        href={`/business/${business?._id}/cashbooks`}
                                        className={`p-4 flex items-center space-x-3  rounded cursor-pointer`}
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
                                    </Link>
                                </div>
                            )
                        }
                        </div>
                    </div>
                </div>

                {view && <Business_Add {...{
                    view, setView
                }} />}

            </div>
        </UserLayout>
    );
};

export default Businesses;