import React, { useState } from 'react';
import Link from 'next/link';

const EmailView = ({ inputRef, handleChange,handleLogin, email, valid, handleView, success, setSuccess }) => {
    const [otp, setOtp] = useState('')

    const handleChangeOTP = (e) => {
        setOtp(e.target.value)
    }

    return (
        <div>
            <p
                className='text-lg pb-4'
            >
                {success ?
                'Enter OTP':
                'Enter your email address'
                }
            </p>
            <div
                className='space-y-3'
            >
                {!success ?
                    <div
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
                                onClick={handleLogin}
                                className={`w-full p-3 rounded ${email.length > 0 ? 'bg-[#4863D4] text-white' : 'bg-gray-100 text-gray-300 cursor-not-allowed'}`}
                                disabled={email.length > 0 ? false : true}
                            >
                                Send OTP
                            </button>
                        </div>

                    </div>
                    :
                    <div
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
                                onClick={handleView}
                                className={`w-full p-3 rounded ${otp.length == 6 ? 'bg-[#4863D4] text-white' : 'bg-gray-100 text-gray-300 cursor-not-allowed'}`}
                                disabled={email.length == 6 ? false : true}
                            >
                                Verify
                            </button>
                        </div>

                    </div>

                }

                <div
                    className='py-3 text-sm'
                >
                    <span>
                        By continuing, you agree to our
                    </span>
                    <Link
                        href=''
                    >
                        <a
                            className='px-1 text-blue-500'
                        >
                            Terms
                        </a>
                    </Link>
                    <span>
                        and
                    </span>
                    <Link
                        href=''
                    >
                        <a
                            className='px-1 text-blue-500'
                        >
                            Policies.
                        </a>
                    </Link>
                </div>
                <button
                    onClick={handleView}
                    className='w-full p-3 text-blue-500 hover:bg-gray-100 border rounded'
                >
                    <span>Resend OTP</span>
                </button>
            </div>
        </div>
    );
};

export default EmailView;