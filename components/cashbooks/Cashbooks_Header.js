import { useRouter } from 'next/router';
import React from 'react';
import { HiUsers } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { IoMdArrowRoundBack  } from "react-icons/io";
import Link from 'next/link'

const Cashbooks_Header = () => {
    const router = useRouter()
    const { currentBusiness } = useSelector(state => state.book)
    return (
        <div
            className='h-[50px] md:h-[70px] px-4 md:px-6 border-b flex justify-between items-center bg-white'
        >
            <Link
            href='/business'
                className='flex items-center space-x-2'
            >
            <IoMdArrowRoundBack  size={20} className='md:hidden'/>
            <p
                className='text-xl md:text-2xl'
            >
                {currentBusiness?.name}
            </p>
            </Link>
            <button
                onClick={() => router.push(`/business/${currentBusiness._id}/business-settings/team`)}
                className='px-4 md:px-6 py-1 md:py-2 flex items-center space-x-2 text-[#4863D4] border rounded hover:border-[#4863D4]'
            >
                <HiUsers size={20} />
                <span className='hidden md:inline-block'>Business Team</span>
            </button>
        </div>
    );
};

export default Cashbooks_Header;