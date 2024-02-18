import { useDisclosure } from "@chakra-ui/react";
import Head from "next/head";
import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Layout from "../components/Layout";
import { MdVerified } from "react-icons/md";
import { RiEdit2Line } from "react-icons/ri";
import { IoIosLogOut } from "react-icons/io";
import Image from "next/image";
import user_img from '../public/image/profile.png'
import UpadateProfile from "../components/UpdateProfile";
import UpdateProfilePhoto from "../components/UpdateProfilePhoto";
import moment from "moment";

export default function Profile() {
    const [isNoti, setNoti] = useState(false)
    const user = useSelector(state => state.auth.user)
    const dispatch = useDispatch()
    const [view, setView] = useState(false)
    const [updatePhoto, setUpdatePhoto] = useState(false)
    const [deleteAccount, setDeleteAccount] = useState(false)
    const [image, setImage] = useState(null)
    const [file, setFile] = useState(null)
    const [password, setPassword] = useState({
        email: user.email,
        oldPassword: '',
        newPassword: ''
    })
    const handleFile = (e) => {
        setFile(e.target.files[0])
        const fileReader = new FileReader()
        fileReader.onload = (e) => {
            setImage(e.target.result)
        }
        fileReader.readAsDataURL(e.target.files[0])
    }
    console.log(user)
    return (
        <Layout>
            <div
                className="h-full bg-gray-100"
            >
                <Head>
                    <title>Your Profile - CashBook</title>
                </Head>
                <div
                    className="pt-6"
                >
                    <div
                        className="w-5/12 mx-auto bg-white p-6 rounded"
                    >
                        <div
                            className="space-y-2"
                        >
                            <div
                                className="flex justify-between"
                            >
                                <div
                                    className="w-1/2 space-y-1"
                                >
                                    <p className='text-sm text-gray-400'>Name</p>
                                    <p className='text-2xl'>
                                        {user?.name}
                                    </p>
                                    <p className='text-sm'>
                                        {user?.number}
                                    </p>
                                    <p className='text-sm'>
                                        {user?.email}
                                    </p>
                                </div>
                                <div
                                    className="w-1/2 flex justify-center items-center"
                                >
                                    <Image
                                        src={user?.image?.url || user_img.src}
                                        alt="logo"
                                        className="cursor-pointer"
                                        height={100}
                                        width={100}
                                        onClick={() => setUpdatePhoto(!updatePhoto)}
                                    />
                                </div>
                            </div>
                            <div
                                className="p-4 flex space-x-3 bg-[#e8f5ee] text-[#179f51] rounded"
                            >
                                <p
                                    className="pt-1"
                                >
                                    <MdVerified size={20} />
                                </p>
                                <div
                                    className="space-y-1"
                                >
                                    <p className="font-bold text-sm">Verified Email ID</p>
                                    <p className="text-xs">Use this Email ID to log in to the mobile app & web.cashbook.in on your laptop/desktop</p>
                                </div>
                            </div>
                            <div
                                className="pt-2 pb-5 flex items-center space-x-5"
                            >
                                <button
                                    onClick={() => setView(!view)}
                                    className="px-6 py-1 flex items-center space-x-2 border rounded text-[#4863d4]"
                                >
                                    <RiEdit2Line />
                                    <span>Edit Profile</span>
                                </button>
                                <button
                                    className="px-6 py-1 flex items-center space-x-2 border rounded text-[#c93b3b]"
                                >
                                    <IoIosLogOut />
                                    <span>Logout</span>
                                </button>
                            </div>
                            <hr className="pb-5" />
                            <div
                                className="space-y-2"
                            >
                                <p className="text-gray-400">Preferences</p>
                                <div
                                    className="flex justify-between items-center"
                                >
                                    <div>
                                        <p className="">
                                            Notifications
                                        </p>
                                        <p className="text-sm text-gray-400">
                                            Get notified for entries from group books
                                        </p>
                                    </div>
                                    <div
                                        onClick={() => setNoti(!isNoti)}
                                        className="h-6 flex bg-gray-100 text-xs cursor-pointer"
                                    >
                                        <div
                                            className={`px-2 h-6 flex justify-center items-center ${!isNoti && 'bg-red-500 text-white'}`}
                                        >
                                            <span>
                                                OFF
                                            </span>
                                        </div>
                                        <div
                                            className={`px-2 h-6 flex justify-center items-center ${isNoti && 'bg-green-500 text-white'}`}
                                        >
                                            <span>
                                                ON
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className="w-5/12 py-1 mx-auto flex justify-end text-xs text-gray-500"
                    >
                        <span>{moment(user?.createdAt).fromNow()}</span>
                    </div>
                </div>

                {view &&
                    <UpadateProfile {...{
                        view, setView
                    }} />
                }

                {updatePhoto &&
                    <UpdateProfilePhoto {...{
                        view: updatePhoto,
                        setView: setUpdatePhoto
                    }} />
                }
            </div>
        </Layout>
    )
}