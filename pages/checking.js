import React, { useEffect, useState } from 'react';
import { ImSpinner9 } from "react-icons/im";
import {isMobile} from 'react-device-detect'
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux'
import axios from 'axios'

const Checking = () => {
    const user = useSelector(state => state.auth.user)
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const handleChecking = async () => {
        setLoading(!loading)
        try {
            const res = await axios.post(`/api/user/checking?id=${user._id}`)

            if (res.data.success) {
                
                const {data,businessId} = res.data

                setLoading(!loading)

                if(data.name.length > 0 && businessId !== null){
                    return router.push(`/business/${businessId}/cashbooks`)
                }else if (!data.name.length > 0 && businessId === null){
                    return router.push(`/onboarding`)
                }else if(data.name.length > 0 && businessId === null){
                    return router.push(`/add-first-business`)
                }

            }
        } catch (error) {
            console.log(error)
            setLoading(!loading)
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