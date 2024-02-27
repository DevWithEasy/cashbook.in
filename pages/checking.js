import React, { useEffect, useState } from 'react';
import { ImSpinner9 } from "react-icons/im";
import { isMobile } from 'react-device-detect'
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { addBooks, addBusinesses } from '../store/slice/bookSlice';
import api from '../utils/api';

const Checking = () => {
    const dispatch = useDispatch()
    const { isAuth, user } = useSelector(state => state.auth)
    const router = useRouter()

    if (!isAuth) {
        return router.push('/signin')
    }

    const handleChecking = async () => {
        try {
            const res = await axios.get(`${api}/user/checking`,{
                headers: {
                    "cb-access-token": localStorage.getItem("cb_access_token")
                }
            })

            if (res.data.success) {

                const { businessId } = res.data
                const { user, businesses, books } = res.data.data
                

                dispatch(addBusinesses(businesses))
                dispatch(addBooks(books))


                if (user.name.length > 0 && businessId !== null) {
                    return router.push(`/business/${businessId}/cashbooks`)
                } else if (!user.name.length > 0 && businessId === null) {
                    return router.push(`/onboarding`)
                } else if (user.name.length > 0 && businessId === null) {
                    return router.push(`/add-first-business`)
                }else if (!user.name.length > 0 && businessId) {
                    return router.push(`/onboarding`)
                }

            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        handleChecking()
    }, [])
    return (
        <div
            className='h-screen flex justify-center items-center bg-gray-100'
        >
            <div
                className='flex items-center space-x-3'
            >
                <ImSpinner9
                    size={30}
                    className='animate-spin'
                />
                <span>Loading...</span>
            </div>
        </div>
    );
};

export default Checking;