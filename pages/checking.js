"use client"
import React, { useEffect, useState } from 'react';
import { ImSpinner9 } from "react-icons/im";
import { isMobile } from 'react-device-detect'
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { addBooks, addBusinesses } from '../store/slice/bookSlice';
import api from '../utils/api';
import { FaCheckCircle } from "react-icons/fa";
import { MdError } from "react-icons/md"

const Checking = () => {
    const dispatch = useDispatch()
    const { isAuth, user } = useSelector(state => state.auth)
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)

    if (!isAuth) {
        return router.push('/signin')
    }

    const handleChecking = async () => {
        setLoading(true)
        try {
            const res = await axios.get(`${api}/user/checking`, {
                headers: {
                    "cb-access-token": localStorage.getItem("cb_access_token")
                }
            })

            if (res.data.success) {
                setLoading(false)
                setSuccess(true)
                const { businessId } = res.data
                const { user, businesses, books } = res.data.data


                dispatch(addBusinesses(businesses))
                dispatch(addBooks(books))


                if (user.name.length > 0 && businessId !== null) {
                    if(isMobile){
                        return router.push(`/business`)
                    }else{
                        return router.push(`/business/${businessId}/cashbooks`)
                    }
                    
                } else if (!user.name.length > 0 && businessId === null) {
                    return router.push(`/onboarding`)
                } else if (user.name.length > 0 && businessId === null) {
                    return router.push(`/add-first-business`)
                } else if (!user.name.length > 0 && businessId) {
                    return router.push(`/onboarding`)
                }

            }
        } catch (error) {
            console.log(error)
            setLoading(false)
            setError(true)
        }
    }
    useEffect(() => {
        handleChecking()
    }, [])
    return (
        <div
            className='h-screen flex justify-center items-center bg-gray-100'
        >
            {loading &&
                <div
                    className='p-4 flex items-center space-x-3 bg-white rounded-md'
                >
                    <ImSpinner9
                        size={20}
                        className='animate-spin'
                    />
                    <span>Checking...</span>
                </div>
            }
            {success &&
                <div
                    className='p-4 flex flex-col items-center space-y-3 bg-white rounded-md'
                >
                    <FaCheckCircle
                        size={30}
                        className='text-green-500'
                    />
                    <span
                        className='text-gray-500'
                    >
                        Checking Complete
                    </span>
                </div>
            }

            {error &&
                <div
                    className='p-4 flex flex-col items-center space-y-3 bg-white rounded-md'
                >
                    <MdError
                        size={30}
                        className='text-red-500'
                    />
                    <span
                        className='text-gray-500'
                    >
                        Something went wrong
                    </span>
                    <button
                        onClick={()=>router.reload()}
                        className='px-4 py-1 bg-red-500 hover:bg-red-700 text-white rounded-md'
                    >
                        Try Again
                    </button>
                </div>
            }

        </div>
    );
};

export default Checking;