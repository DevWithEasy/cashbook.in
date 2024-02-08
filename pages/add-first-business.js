import React, { useState } from 'react';
import Layout from '../components/Layout';
import Image from 'next/image';
import { IoIosArrowDown, IoIosArrowUp, IoMdCheckmarkCircle } from "react-icons/io";
import { useDispatch } from 'react-redux';
import { categories, types } from '../public/image/bussiness/business_data';
import handleInput from '../utils/handleInput';
import { createData } from '../libs/api_crud';
import { addBook } from '../store/slice/bookSlice';
import { ImSpinner9 } from "react-icons/im";
import Head  from 'next/head';

const AddFirstBusiness = () => {
    const [value, setValue] = useState({
        name: ''
    })
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [categoryView, setCategoryView] = useState('')
    const [typeView, setTypeView] = useState('')
    const [category, setCategory] = useState({})
    const [type, setType] = useState({})
    return (
        <Layout>
            <Head>
                <title>Add Business - CashBook</title>
            </Head>
            <div
                className='h-[calc(100vh-48px)] bg-gray-100 overflow-y-auto'
            >
                <div
                    className='w-11/12 p-6 mx-auto mt-6 space-y-5 bg-white rounded'
                >
                    <p className='text-xl'>Add your first business</p>
                    <div
                        className='space-y-2'
                    >
                        <label
                            className='block text-sm'
                        >
                            Business Name
                        </label>
                        <input
                            name = 'name'
                            placeholder='Added Business Name'
                            onChange={(e) => handleInput(e, value, setValue)}
                            className='w-1/2 p-2 border rounded focus:outline-[#4863D4]'
                        />
                    </div>
                    <div
                        onClick={() => setCategoryView(!categoryView)}
                        className='p-5 border rounded-md cursor-pointer'
                    >
                        <div
                            className='flex justify-between items-center'
                        >
                            <div>
                                <p
                                    className='text-lg'
                                >
                                    Select Business Category</p>
                                <p
                                    className='text-sm text-gray-500'
                                >
                                    This will help us personalize your business</p>
                            </div>
                            <div
                                className={`flex items-center space-x-2 ${category?.name && 'px-4 py-1 bg-gray-100 border rounded-md'}`}
                            >
                                <div
                                    className='flex items-center space-x-2'
                                >
                                    <Image
                                        alt=''
                                        src={category.image}
                                        height={35}
                                        width={35}
                                    />
                                    <p className='text-sm'>{category.name}</p>
                                </div>
                                {categoryView ?
                                    <IoIosArrowUp size={20} /> :
                                    <IoIosArrowDown size={20} />
                                }
                            </div>

                        </div>
                        {categoryView &&
                            <div
                                className='pt-5 grid grid-cols-4 gap-4'
                            >
                                {
                                    categories.map(cat =>
                                        <div
                                            key={cat.id}
                                            onClick={() => setCategory(cat)}
                                            className={`relative p-4 flex items-center space-x-2 border rounded-md ${category.id == cat.id && 'border-2 border-[#4863D4]'}`}
                                        >
                                            <Image
                                                alt=''
                                                src={cat.image}
                                                height={40}
                                                width={40}
                                            />
                                            <p className='text-sm'>{cat.name}</p>
                                            {category.id == cat.id &&
                                                <IoMdCheckmarkCircle
                                                    className='absolute right-1 top-1 text-[#4863D4]'
                                                />
                                            }
                                        </div>
                                    )
                                }

                            </div>
                        }
                    </div>
                    <div
                        onClick={() => setTypeView(!typeView)}
                        className='p-5 border rounded-md cursor-pointer'
                    >
                        <div
                            className='flex justify-between items-center'
                        >
                            <div>
                                <p
                                    className='text-lg'
                                >
                                    Select Business Type
                                </p>
                                <p
                                    className='text-sm text-gray-500'
                                >
                                    This will help us personalize your business
                                </p>
                            </div>
                            <div
                                className={`flex items-center space-x-2 ${type?.name && 'px-4 py-1 bg-gray-100 border rounded-md'}`}
                            >
                                <div
                                    className='flex items-center space-x-2'
                                >
                                    <Image
                                        alt=''
                                        src={type?.image}
                                        height={35}
                                        width={35}
                                    />
                                    <p className='text-sm'>{type?.name}</p>
                                </div>
                                {typeView ?
                                    <IoIosArrowUp size={20} /> :
                                    <IoIosArrowDown size={20} />
                                }
                            </div>

                        </div>
                        {typeView &&
                            <div
                                className='pt-5 grid grid-cols-4 gap-4'
                            >
                                {
                                    types.map(typ =>
                                        <div
                                            key={typ.id}
                                            onClick={() => setType(typ)}
                                            className={`relative p-4 flex items-center space-x-2 border rounded-md ${type.id == typ.id && 'border-2 border-[#4863D4]'}`}
                                        >
                                            <Image
                                                alt=''
                                                src={typ.image}
                                                height={40}
                                                width={40}
                                            />
                                            <p className='text-sm'>{typ.name}</p>
                                            {type.id == typ.id &&
                                                <IoMdCheckmarkCircle
                                                    className='absolute right-1 top-1 text-[#4863D4]'
                                                />
                                            }
                                        </div>
                                    )
                                }

                            </div>
                        }
                    </div>
                    <div
                        className='h-20 px-6 flex justify-end items-center border-t'
                    >
                        <button
                            onClick={() => createData({
                                url : `/api/business`,
                                value: {
                                    ...value, category, type
                                },
                                setLoading,
                                dispatch, addBook
                            })}
                            className={`px-6 py-3 font-bold text-white rounded-md ${value?.name.length > 0 ? 'bg-[#4863D4]' : 'bg-[#4863D4]/80 cursor-not-allowed'}`}
                        >
                            {!loading ?
                                'Create Business'
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

export default AddFirstBusiness;