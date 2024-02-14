import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { ImUsers } from 'react-icons/im';
import {useDispatch, useSelector} from 'react-redux'
import { MdBook, MdOutlineContentCopy, MdOutlineEdit, MdOutlineTurnRight } from 'react-icons/md';
import moment from 'moment'
import { addCurrentBook } from '../../store/slice/bookSlice';

const Cashbooks_Book = ({book,setId,updateView,setUpdateView,duplicateView,setDuplicateView,moveView,setMoveView}) => {
    const { currentBusiness,books } = useSelector(state => state.book)
    const router = useRouter()
    const dispatch = useDispatch()
    const [menu, setMenu] = useState(false)
    const days = moment(book?.updatedAt).fromNow()

    const handleRoute=()=>{
        const findBook = books.find(b=>b._id === book._id)

        dispatch(addCurrentBook(findBook))

        router.push(`/business/${currentBusiness?._id}/cashbooks/${book?._id}/transactions`)
    }

    return (
        <div
                onMouseOver={() => setMenu(true)}
                onMouseOut={() => setMenu(false)}
                className='relative p-4 flex justify-between items-center space-x-5 border-b hover:bg-gray-100 cursor-pointer'
            >
                <div
                    onClick={handleRoute}
                    className='w-1/2 flex items-center space-x-3'
                >
                    <div>
                        <MdBook
                            size={35}
                            className='p-1 bg-[#EBEEFD] text-[#4863D4] rounded-full'
                        />
                    </div>
                    <div
                        className='w-full'
                    >
                        <p>{book?.name}</p>
                        <p
                            className='text-xs text-gray-500'
                        >
                            Update on {days}
                        </p>
                    </div>
                </div>
                {!menu ?
                    <p className='w-1/2 text-right text-[#21B15E]'>10000</p>
                    :
                    <div
                        onMouseOver={() => setMenu(true)}
                        onMouseOut={() => setMenu(false)}
                        className='absolute right-0 w-1/2 p-4 flex justify-end items-center space-x-4 '
                    >
                        <p className='text-[#21B15E]'>10000</p>
                        <button
                            className='relative group'
                        >
                            <MdOutlineEdit
                                onClick={() => {
                                    setUpdateView(!updateView)
                                    setId(book?._id)
                                }}
                                size={22}
                                className='text-[#4863D4] cursor-pointer'
                            />
                            <span
                                className='absolute hidden group-hover:block w-24 px-2 py-1 pb-2 -translate-x-1/2 translate-y-3 bg-black text-xs text-white rounded'
                            >
                                Rename Book
                            </span>
                        </button>
                        <button
                            className='relative group'
                        >
                            <MdOutlineContentCopy
                                onClick={() => {
                                    setDuplicateView(!duplicateView)
                                    setId(book?._id)
                                }}
                                size={22}
                                className='text-[#4863D4] cursor-pointer'
                            />
                            <span
                                className='absolute hidden group-hover:block w-24 px-2 py-1 pb-2 -translate-x-1/2 translate-y-3 bg-black text-xs text-white rounded'
                            >
                                Copy Book
                            </span>
                        </button>
                        <button
                            className='relative group'
                        >
                            <ImUsers
                                size={22}
                                onClick={() => router.push(`/business/${currentBusiness?._id}/cashbooks/${book?._id}/settings/members`)}
                                className='text-[#4863D4] cursor-pointer'
                            />
                            <span
                                className='absolute hidden group-hover:block w-24 px-2 py-1 pb-2 -translate-x-1/2 translate-y-3 bg-black text-xs text-white rounded'
                            >
                                Add member
                            </span>
                        </button>
                        <button
                            className='relative group'
                        >
                            <MdOutlineTurnRight
                                onClick={() => {
                                    setMoveView(!moveView)
                                    setId(book?._id)
                                }} size={22}
                                className='text-red-500 cursor-pointer'
                            />
                            <span
                                className='absolute hidden group-hover:block w-24 px-2 py-1 pb-2 -translate-x-1/2 translate-y-3 bg-black text-xs text-white rounded'
                            >
                                Move Book
                            </span>
                        </button>

                    </div>
                }
            </div>
    );
};

export default Cashbooks_Book;