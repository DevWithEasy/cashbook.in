import {
    Modal,
    ModalContent,
    ModalOverlay
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteEntry } from '../../libs/allEntryAction';
import { removeEntry } from '../../store/slice/bookSlice';
import { IoIosArrowDown, IoIosArrowUp, IoMdCheckmarkCircle } from 'react-icons/io';
import Image from 'next/image';
import { categories, types } from '../../public/image/bussiness/business_data';

export default function Business_Update({ id, view, setView }) {
    const { currentBusiness } = useSelector(state => state.book)
    const [business, setBusiness] = useState(currentBusiness)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [categoryView, setCategoryView] = useState('')
    const [typeView, setTypeView] = useState('')
    const [category, setCategory] = useState(categories.find(cat=>cat.id === business?.category))
    const [type, setType] = useState(types.find(cat=>cat.id === business?.type))

    console.log(business)
    return (
        <>
            <Modal
                isOpen={view}
                isCentered
                size='xl'

            >
                <ModalOverlay />
                <ModalContent className='mx-2'>
                    <div
                        className='h-[450px]'
                    >
                        <div
                            className='h-16 px-6 py-4 flex justify-between items-center border-b'
                        >
                            <p className='text-xl'>Leave Business</p>
                            <button
                                onClick={() => setView(!view)}
                                className='px-4 py-1 border rounded'
                            >X</button>
                        </div>
                        <div
                            className='h-[306px] px-6 py-3 overflow-y-auto'
                        >
                            <div
                                className='space-y-3'
                            >
                                <div className="space-y-1">
                                    <label className="text-sm text-gray-500">Business Name</label>
                                    <input
                                        value={business?.name}
                                        onChange={(e) => { setName(e.target.value) }}
                                        className="w-full p-2 rounded border focus:outline-[#4863D4]"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm text-gray-500">Business Address</label>
                                    <input
                                        value={business?.address}
                                        onChange={(e) => { setName(e.target.value) }}
                                        className="w-full p-2 rounded border focus:outline-[#4863D4]"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm text-gray-500">Business Staff</label>
                                    <input
                                        type='number'
                                        value={business?.stuffs}
                                        onChange={(e) => { setName(e.target.value) }}
                                        className="w-full p-2 rounded border focus:outline-[#4863D4]"
                                    />
                                </div>
                                <div
                                    onClick={() => setCategoryView(!categoryView)}
                                    className='px-2 py-3 border rounded-md cursor-pointer'
                                >
                                    <div
                                        className='flex justify-between items-center'
                                    >
                                        <div>
                                            <p
                                                className='text-sm'
                                            >
                                                Select Business Category</p>
                                        </div>
                                        <div
                                            className={`flex items-center space-x-2 ${category?.name && 'px-4 py-1 bg-gray-100 border rounded-md'}`}
                                        >
                                            {category.id &&
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
                                            }
                                            {categoryView ?
                                                <IoIosArrowUp size={20} /> :
                                                <IoIosArrowDown size={20} />
                                            }
                                        </div>

                                    </div>
                                    {categoryView &&
                                        <div
                                            className='pt-5 grid grid-cols-2 gap-4'
                                        >
                                            {
                                                categories.map(cat =>
                                                    <div
                                                        key={cat.id}
                                                        onClick={() => setCategory(cat)}
                                                        className={`relative p-2 flex items-center space-x-2 border rounded-md ${category.id == cat.id && 'border-2 border-[#4863D4]'}`}
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
                                    className='px-2 py-3 border rounded-md cursor-pointer'
                                >
                                    <div
                                        className='flex justify-between items-center'
                                    >
                                        <div>
                                            <p
                                                className='text-sm'
                                            >
                                                Select Business Type
                                            </p>
                                        </div>
                                        <div
                                            className={`flex items-center space-x-2 ${type?.name && 'px-4 py-1 bg-gray-100 border rounded-md'}`}
                                        >
                                            {type.id &&
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
                                            }
                                            {typeView ?
                                                <IoIosArrowUp size={20} /> :
                                                <IoIosArrowDown size={20} />
                                            }
                                        </div>

                                    </div>
                                    {typeView &&
                                        <div
                                            className='pt-5 grid grid-cols-2 gap-4'
                                        >
                                            {
                                                types.map(typ =>
                                                    <div
                                                        key={typ.id}
                                                        onClick={() => setType(typ)}
                                                        className={`relative p-2 flex items-center space-x-2 border rounded-md ${type.id == typ.id && 'border-2 border-[#4863D4]'}`}
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
                            </div>
                        </div>
                        <div
                            className='h-20 px-6 flex justify-end items-center border-t space-x-5'
                        >

                            <button
                                onClick={(e) => setView(!view)}
                                className='px-6 py-3 border bg-[#4863D4] text-white rounded'

                            >
                                <span>Cancel</span>
                            </button>

                            <button
                                onClick={(e) => deleteEntry({
                                    id,
                                    action: removeEntry,
                                    dispatch,
                                    setLoading,
                                    setView
                                })}
                                className='px-6 py-3 border bg-[#C93B3B] text-white rounded'

                            >
                                <span>{loading ? 'Leaveing...' : 'Leave'}</span>
                            </button>
                        </div>
                    </div>
                </ModalContent>
            </Modal>
        </>
    )
}
