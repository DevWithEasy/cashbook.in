import React, { useEffect, useRef, useState } from 'react';
import logo from '../public/cashbook.svg';
import sideImage from '../public/image/carousel_01.svg'
import Image from 'next/image';
import EmailView from '../components/signin/EmailView';
import GoogleView from '../components/signin/GoogleView';
import axios from 'axios'
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux'
import api from '../utils/api';

const Signup = () => {
    const router = useRouter()
    const user = useSelector(state => state.auth.user)
    const [emailView, setEmailView] = useState(false)
    const [email, setEmail] = useState('')
    const [valid, setValid] = useState(true)
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)
    const inputRef = useRef(null)

    const handleView = () => {
        setEmailView(!emailView)
        if (inputRef) {
            inputRef?.current?.focus()
        }
    }
    const handleChange = (e) => {
        setEmail(e.target.value)
        const checkValidEmail = /\S+@\S+\.\S+/
        const isValid = checkValidEmail.test(e.target.value)
        if (isValid) {
            setValid(true)
        } else {
            setValid(false)
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const res = await axios.post(`${api}/user/send-otp?email=${email}`)
            if (res.data.success) {
                setSuccess(true)
                localStorage.setItem('cb_email', email)
                setLoading(false)
            }
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    useEffect(() => {
        if (user?.email) {
            router.push(`/checking`)
        }
    })

    return (
        <div
            className='h-screen flex justify-between'
        >
            <div
                className='w-4/12 p-8 bg-[#EDEFFB]'
            >
                <Image
                    src={logo.src}
                    alt='logo'
                    className=''
                    height={39}
                    width={150}
                />
                <div
                    className='pt-10 flex flex-col items-center space-y-6'
                >
                    <Image
                        src={sideImage.src}
                        alt='logo'
                        className=''
                        height={280}
                        width={280}
                    />
                    <p
                        className='text-2xl text-center'
                    >
                        Easy Book-Keeping For Healthy Cashflow
                    </p>
                </div>
            </div>
            <div
                className='w-8/12 py-12'
            >
                <div
                    className='w-5/12 mx-auto flex flex-col items-center space-y-5'
                >
                    <Image
                        src={logo.src}
                        alt='logo'
                        className=''
                        height={39}
                        width={150}
                    />
                    <p
                        className='text-3xl text-center'
                    >
                        Log In/Create Account
                    </p>
                    <div
                        className='w-full p-6 space-y-3 border rounded'
                    >
                        {!emailView ?
                            <GoogleView {...{
                                handleView
                            }} />
                            :
                            <EmailView {...{
                                inputRef,
                                email,
                                valid,
                                handleView,
                                handleChange,
                                handleLogin,
                                success,
                                setSuccess,
                                loading,
                                setLoading
                            }} />
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;