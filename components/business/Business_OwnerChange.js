import {
    Drawer,
    DrawerContent,
    DrawerOverlay
} from '@chakra-ui/react';
import axios from 'axios';
import Image from "next/image";
import React, { useState } from 'react';
import { IoMdArrowBack } from "react-icons/io";
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md';
import { RxDotFilled } from 'react-icons/rx';
import { TiInfo } from "react-icons/ti";
import { useSelector } from 'react-redux';
import user_img from '../../public/image/profile.png';
import BusinessManager from '../../utils/BusinessManager';
import { notificationNOT, notificationOK } from '../../utils/toastNotification';
import { addCurrentBusiness } from '../../store/slice/bookSlice';

const Business_OwnerChange = ({ view, setView }) => {
    const { businesses, currentBusiness, books } = useSelector(state => state.book)
    const { user } = useSelector(state => state.auth)
    const businessManager = new BusinessManager(user, books, businesses, currentBusiness)

    const partners = businessManager.getPartners()

    const [selected, setSelected] = useState({})

    const [nextStep, setNextStep] = useState(false)
    const [confirm, setConfirm] = useState(false)
    const [loading,setLoading] = useState(false)

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

    const handleOwnerChange = async () => {
        setLoading(true)
        try {
            const res = await axios.post(`/api/business/member-owner-change`, {
                b_id: currentBusiness._id,
                t_id: selected._id,
                u_id : selected?.user?._id
            },
                {
                    headers: {
                        "cb-access-token": localStorage.getItem("cb_access_token")
                    }
                }
            )
            if (res.data.success) {
                setLoading(false)
                dispatch(updateBusiness(res.data.data))
                dispatch(addCurrentBusiness(res.data.data))
                notificationOK(res.data.message)
                setView(false)
            }
        } catch (error) {
            setLoading(false)
            console.log(error)
            notificationNOT(error.message)
        }
    }

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
                                className='space-y-5'
                            >
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
                                <div
                                    className='space-y-2 text-sm'
                                >
                                    {
                                        topics.map((topic, i) =>
                                            <div key={i}
                                                className='flex items-center space-x-2'
                                            >
                                                <p>
                                                    <span className='inline-block h-3 w-3 rounded-full bg-gray-200'></span>
                                                </p>
                                                <p>{topic}</p>
                                            </div>)
                                    }
                                </div>
                            </div>

                            :
                            <div>
                                {partners.length > 0 ?
                                    <div>
                                        {!confirm ?
                                            <div
                                                className='space-y-3'
                                            >
                                                {
                                                    partners.map(member =>
                                                        <div
                                                            key={member?._id}
                                                            onClick={() => setSelected(member)}
                                                            className={`flex items-center justify-between space-x-3 cursor-pointer`}
                                                        >
                                                            {member?._id === selected?._id ?
                                                                <MdCheckBox
                                                                    size={25}
                                                                    className='text-[#2563EB]'
                                                                />
                                                                :
                                                                <MdCheckBoxOutlineBlank
                                                                    size={25}
                                                                    className='text-gray-300'
                                                                />
                                                            }
                                                            <div
                                                                className='w-full flex items-center justify-between'
                                                            >
                                                                <div>
                                                                    <p>
                                                                        {user?._id === member?.user?._id ?
                                                                            'You'
                                                                            :
                                                                            member?.user?.name
                                                                        }
                                                                    </p>
                                                                    <p className='text-sm text-gray-500'>{member?.user?.email}
                                                                    </p>
                                                                    <p className='text-sm text-gray-500'>{member?.user?.number}
                                                                    </p>
                                                                </div>
                                                                <span
                                                                    className={`px-4 py-1 text-xs rounded ${member?.role === 'Owner' ? 'bg-green-100 text-green-500' : 'bg-[#F8EFE7] text-[#BD610D]'}`}
                                                                >
                                                                    {member?.role}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                            :
                                            <div>
                                                <div
                                                    className='flex flex-col items-center space-y-2 p-4 rounded'
                                                >
                                                    <TiInfo
                                                        size={70}
                                                        className='text-[#C93B3B]'
                                                    />
                                                    <p
                                                        className='w-full text-2xl text-center font-semibold'
                                                    >
                                                        Make {selected?.user?.name} new owner?
                                                    </p>
                                                    <p
                                                        className='py-3 text-center'
                                                    >
                                                        <span className='inline-block bg-gray-200 h-1 w-6'></span>
                                                    </p>
                                                </div>
                                                <div
                                                    className='text-sm space-y-2'
                                                >
                                                    <p
                                                        className='flex items-center space-x-2'
                                                    >
                                                        <RxDotFilled size={25} className='text-gray-300' />
                                                        <span>{selected?.user?.name} will be able to remove you from business or delete the business</span>
                                                    </p>
                                                    <p
                                                        className='flex items-center space-x-2'
                                                    >
                                                        <RxDotFilled size={25} className='text-gray-300' />
                                                        <span>Once this is done, your role will be changed to partner</span>
                                                    </p>
                                                </div>
                                            </div>
                                        }
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
                                        <div
                                            className='space-y-2 text-sm'
                                        >
                                            {
                                                nextTopics.map((topic, i) =>
                                                    <div key={i}
                                                        className='flex items-center space-x-2'
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
                        }
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
                            <div
                                className='flex items-center space-x-5'
                            >
                                {!confirm ?
                                    <button
                                        onClick={(e) => setConfirm(!confirm)}
                                        className={`flex items-center space-x-2  px-8 py-3 border bg-[#4863D4] text-white rounded ${!selected?._id && 'cursor-not-allowed bg-[#4863D4]/50'}`}
                                        disabled={selected?._id ? false : true}
                                    >
                                        <span>Transfer Ownership</span>
                                    </button>
                                    :
                                    <>
                                        <button
                                            onClick={(e) => setConfirm(!confirm)}
                                            className='flex items-center space-x-2  px-8 py-3 border text-[#4863D4] rounded'
                                        >
                                            <span>No, Go Back</span>
                                        </button>
                                        <button
                                            onClick={handleOwnerChange}
                                            className='flex items-center space-x-2  px-8 py-3 border bg-[#C93B3B] text-white rounded'
                                        >
                                            <span>{loading ? 'Transfering...' : 'Transfer Ownership'}</span>
                                        </button>
                                    </>
                                }
                            </div>
                        }
                    </div>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default Business_OwnerChange;