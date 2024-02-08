import React, { useState } from 'react';
import { ImSpinner9 } from 'react-icons/im';
import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";
import { createData } from '../libs/api_crud';
import { useDispatch } from 'react-redux';
import Layout from '../components/Layout';
import Head  from 'next/head';

const Onboarding = () => {
    const [value, setValue] = useState({
        name: '',
        businessName: ''
    })
    const [check, setCheck] = useState(false)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    return (
        <Layout>
            <Head>
                <title>Onboarding - CashBook</title>
            </Head>
            <div
                className='h-[calc(100vh-48px)] bg-gray-100 overflow-y-auto'
            >
                <div
                    className='w-5/12 mx-auto p-6 mt-6 space-y-5 bg-white rounded'
                >
                    <div
                        className='space-y-1 pb-5'
                    >
                        <p className='text-3xl'>Welcome to CashBook</p>
                        <p className='text-xl'>Add your details</p>
                    </div>
                    <div
                        className='space-y-1'
                    >
                        <label
                            className='block text-sm'
                        >
                            Your Full Name
                        </label>
                        <input
                            placeholder='Your name'
                            onChange={(e) => handleInput(e, value, setValue)}
                            className='w-full px-2 py-2 border rounded focus:outline-[#4863D4]'
                        />
                    </div>
                    <div
                        className='space-y-1'
                    >
                        <label
                            className='block text-sm'
                        >
                            Business Name
                        </label>
                        <input
                            placeholder='Added Business Name'
                            onChange={(e) => handleInput(e, value, setValue)}
                            className='w-full px-2 py-2 border rounded focus:outline-[#4863D4]'
                        />
                    </div>
                    <div
                        onClick={() => setCheck(!check)}
                        className='flex items-center space-x-2  cursor-pointer'
                    >
                        <span
                            className={`${check ? 'text-[#4863D4]' : 'text-gray-400'}`}
                        >
                            {check ?
                                <MdCheckBox size={20} />
                                :
                                <MdCheckBoxOutlineBlank size={20} />
                            }
                        </span>
                        <span className='text-sm text-gray-400'>
                            I don’t own a business. Skip this.
                        </span>
                    </div>
                    <div
                        className='h-20 px-6 flex justify-end items-center'
                    >
                        <button
                            onClick={() => createData({
                                value,
                                setLoading,
                                dispatch, addBook
                            })}
                            className={`px-6 py-3 text-white rounded-md ${value?.name.length > 0 ? 'bg-[#4863D4]' : 'bg-[#4863D4]/80 cursor-not-allowed'}`}
                        >
                            {!loading ?
                                'Get Started'
                                :
                                <ImSpinner9 />
                            }

                        </button>
                    </div>
                </div>
            </div>
        </Layout>

    );
};

export default Onboarding;