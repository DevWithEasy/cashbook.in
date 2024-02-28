import React from 'react';
import Image from 'next/image'
import { useSelector } from 'react-redux'
import { IoMdCheckmarkCircle } from "react-icons/io"

const Book_AddMember_Member = ({ member, nextStep, setNextStep, setSelected }) => {
    const { currentBook } = useSelector(state => state.book)
    const isAdd = currentBook?.members?.find(m => m?.user?._id === member?.user?._id)
    console.log(isAdd)
    return (
        <div
            className='flex items-center justify-between space-x-3 pr-5'
        >
            <Image
                alt=''
                src={member?.user?.image?.url ? member?.image?.url : '/image/profile.png'}
                width={50}
                height={50}
                className='rounded-full'
            />
            <div
                className='w-full flex items-center justify-between'
            >
                <div>
                    <p>
                        {member?.user?.name}
                    </p>
                    <p className='text-sm text-gray-500'>
                        {member?.user?.email}
                    </p>
                    <p className='text-sm text-gray-500'>
                        {member?.user?.number}
                    </p>
                </div>
                {isAdd ?
                    <button
                        className='flex items-center space-x-3 cursor-not-allowed'
                    >
                        <IoMdCheckmarkCircle size={20} className='text-[#21b15e]'/>
                        <span className='text-gray-300 font-semibold'>
                            ADDED
                        </span>
                    </button>
                    :
                    <button
                        onClick={() => {
                            setNextStep(!nextStep)
                            setSelected(member)
                        }}
                        className='px-4 py-1 text-xs rounded bg-[#E7F2F9] text-[#0c0e0f]'
                    >
                        ADD
                    </button>
                }
            </div>
        </div>

    );
};

export default Book_AddMember_Member;