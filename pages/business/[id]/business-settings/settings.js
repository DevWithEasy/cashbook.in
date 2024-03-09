"use client"
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { FaExchangeAlt } from "react-icons/fa";
import { MdOutlineDelete,MdLogout } from "react-icons/md";
import { useSelector } from 'react-redux';
import { BusinessLayout, Business_Delete, Business_OwnerChange, Business_TeamMemberLeave, UserLayout } from '../../../../components/Index';
import BusinessManager from '../../../../utils/BusinessManager';
import Head from 'next/head'

const settings = () => {
    const { businesses, currentBusiness, books } = useSelector(state => state.book)
    const { user } = useSelector(state => state.auth)
    const router = useRouter()
    const { pathname } = router
    const path = pathname.split('/').pop()
    const [deleteView, setDeleteView] = useState(false)
    const [ownerChangeView, setOwnerChangeView] = useState(false)
    const [leaveView, setLeaveView] = useState(false)

    const businessManager = new BusinessManager(user, books, businesses, currentBusiness)
    const role = businessManager.getRole(currentBusiness)


    return (
        <UserLayout  {...{ path }}>
            <BusinessLayout {...{ path }}>
                <Head>
                    <title>Settings - {currentBusiness?.name} - CashBook</title>
                </Head>
                <div
                    className='w-full md:w-8/12 space-y-5'
                >
                    {role === 'Owner' ?
                        <>
                            <div
                                className='p-6 flex justify-between items-center border rounded'
                            >
                                <div>
                                    <p
                                        className=''
                                    >
                                        Change Owner
                                    </p>
                                    <p
                                        className='text-sm text-gray-500'
                                    >
                                        Current owner: You
                                    </p>
                                </div>
                                <button
                                    onClick={() => setOwnerChangeView(!ownerChangeView)}
                                    className='px-6 py-2 flex items-center space-x-2 text-yellow-600 focus:ring-2 rounded'
                                >
                                    <FaExchangeAlt />
                                    <span>Change Owner</span>
                                </button>
                            </div>
                            <div
                                className='p-6 flex justify-between items-center border rounded'
                            >
                                <div>
                                    <p
                                        className=''
                                    >
                                        Delete Business
                                    </p>
                                    <p
                                        className='text-sm text-gray-500'
                                    >
                                        This will delete your business permanently
                                    </p>
                                </div>
                                <button
                                    onClick={() => setDeleteView(!deleteView)}
                                    className='px-6 py-2 flex items-center space-x-2 text-red-600 focus:ring-2 rounded'
                                >
                                    <MdOutlineDelete />
                                    <span>Delete Business</span>
                                </button>
                            </div>
                        </>
                        :
                        <div
                            className='p-6 flex justify-between items-center border rounded'
                        >
                            <div>
                                <p
                                    className=''
                                >
                                    Leave Business
                                </p>
                                <p
                                    className='text-sm text-gray-500'
                                >
                                    You will lose access to this business
                                </p>
                            </div>
                            <button
                                onClick={() => setLeaveView(!leaveView)}
                                className='px-6 py-2 flex items-center space-x-2 text-red-600 focus:ring-2 rounded'
                            >
                                <MdLogout />
                                <span>Leave Business</span>
                            </button>
                        </div>
                    }
                </div>
                {deleteView &&
                    <Business_Delete {...{
                        view: deleteView,
                        setView: setDeleteView
                    }} />
                }
                {ownerChangeView &&
                    <Business_OwnerChange {...{
                        view: ownerChangeView,
                        setView: setOwnerChangeView
                    }} />
                }
                {leaveView &&
                    <Business_TeamMemberLeave {...{
                        view: leaveView,
                        setView: setLeaveView
                    }} />
                }
            </BusinessLayout>
        </UserLayout>
    );
};

export default settings;