import React, { useEffect, useState } from 'react';
import { ImSpinner9 } from "react-icons/im";
import {isMobile} from 'react-device-detect'
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { addBooks, addBusinesses } from '../store/slice/bookSlice';

const Checking = () => {
    const dispatch = useDispatch()
    const {isAuth,user} = useSelector(state => state.auth)
    const router = useRouter()

    if (!isAuth) {
        return router.push('/signin')
    }

    const handleChecking = async () => {
        try {
            const res = await axios.post(`/api/user/checking?id=${user._id}`)

            if (res.data.success) {
                
                const {businessId} = res.data
                const {user,businesses,books} = res.data.data

                dispatch(addBusinesses(businesses))
                dispatch(addBooks(books))
                

                if(user.name.length > 0 && businessId !== null){
                    return router.push(`/business/${businessId}/cashbooks`)
                }else if (!user.name.length > 0 && businessId === null){
                    return router.push(`/onboarding`)
                }else if(user.name.length > 0 && businessId === null){
                    return router.push(`/add-first-business`)
                }

            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        handleChecking()
    },[])
    return (
        <div
            className='h-screen flex justify-center items-center bg-gray-100'
        >
            <ImSpinner9
                size={30}
                className='animate-spin'
            />
        </div>
    );
};

export default Checking;