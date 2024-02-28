import React, { useState } from 'react';
import Link from 'next/link';
import axios from 'axios'
import { IoArrowBackOutline } from "react-icons/io5";
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { login } from '../../store/slice/authSlice';
import { notificationOK } from '../../utils/toastNotification';
import api from '../../utils/api';

const EmailView = ({ inputRef, handleChange, handleLogin, email, valid, handleView, success, setSuccess, loading, setLoading }) => {
    const router = useRouter()
    const dispatch = useDispatch()
    const [otp, setOtp] = useState('')

    const handleChangeOTP = (e) => {
        setOtp(e.target.value)
    }
    const handleVerify = async (e) => {
        e.preventDefault()
        const mail = localStorage.getItem('cb_email') || email
        setLoading(!loading)
        try {
            const res = await axios.post(`${api}/user/verify-otp?email=${mail}&otp=${otp}`)

            if (res.data.success) {

                const { message, data } = res.data

                setLoading(!loading)
                dispatch(login(data))

                localStorage.setItem('cb_access_token', res.data.token)

                localStorage.removeItem('cb_email')

                notificationOK(message)

            }
        } catch (error) {
            console.log(error)
            setLoading(!loading)
        }
    }

    return (
        <div>
            <div
                className='text-lg pb-4'
            >

                {success ?
                    <p
                        className='flex items-center space-x-3'
                    >
                        <IoArrowBackOutline
                            onClick={() => { handleView(), setSuccess(false) }}
                            className='cursor-pointer'
                        />
                        <span>Enter OTP</span>
                    </p>
                    :
                    'Enter your email address'
                }
            </div>
            <div
                className='space-y-3'
            >
                {!success ?
                    <form
                        onSubmit={handleLogin}
                        className='space-y-0.5'
                    >
                        <input
                            ref={inputRef}
                            type='email'
                            onChange={(e) => handleChange(e)}
                            placeholder='xyz123@gmail.com'
                            className='w-full p-2 focus:outline-blue-500 border rounded'
                        />
                        {!valid &&
                            <p
                                className='px-2 py-1 text-xs bg-red-100 text-red-400 rounded-md'
                            >
                                Provide a valid email please
                            </p>
                        }
                        <div
                            className='pt-3'
                        >
                            <button
                                className={`w-full p-3 rounded ${email.length > 0 ? 'bg-[#4863D4] text-white' : 'bg-gray-100 text-gray-300 cursor-not-allowed'}`}
                                disabled={email.length > 0 ? false : true}
                            >
                                {!loading ?
                                    'Send OTP'
                                    :
                                    'Sending...'
                                }
                            </button>
                        </div>

                    </form>
                    :
                    <form
                        onSubmit={handleVerify}
                        className='space-y-0.5'
                    >
                        <p
                            className='py-3 text-sm'
                        >
                            Please enter the 6-digit OTP sent to {email}
                        </p>
                        <input
                            ref={inputRef}
                            type='number'
                            onChange={(e) => handleChangeOTP(e)}
                            placeholder='e.g-123456'
                            className='w-full p-2 focus:outline-blue-500 border rounded'
                        />
                        <div
                            className='pt-3'
                        >
                            <button
                                className={`w-full p-3 rounded ${otp.length == 6 ? 'bg-[#4863D4] text-white' : 'bg-gray-100 text-gray-300 cursor-not-allowed'}`}
                                disabled={otp.length == 6 ? false : true}
                            >
                                {!loading ?
                                    'Verifying...'
                                    :
                                    'Verify'
                                }
                            </button>
                        </div>

                    </form>

                }

                <div
                    className='py-3 text-sm'
                >
                    <span>
                        By continuing, you agree to our
                    </span>
                    <Link
                        href=''
                        className='px-1 text-blue-500'
                    >
                        Terms
                    </Link>
                    <span>
                        and
                    </span>
                    <Link
                        href=''
                        className='px-1 text-blue-500'
                    >
                        Policies.
                    </Link>
                </div>
                <button
                    onClick={handleView}
                    className='w-full p-3 text-blue-500 hover:bg-gray-100 border rounded'
                >
                    <span>Other Ways to Login</span>
                </button>
            </div>
        </div>
    );
};

export default EmailView;