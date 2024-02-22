import { useRouter } from 'next/router';
import React from 'react';
import { HiUsers } from 'react-icons/hi';
import { useSelector } from 'react-redux';

const Cashbooks_Header = () => {
    const router = useRouter()
    const { currentBusiness } = useSelector(state => state.book)
    return (
        <div
            className='h-[70px] px-6 border-b flex justify-between items-center'
        >
            <p
                className='text-2xl'
            >
                {currentBusiness?.name}
            </p>
            <button
                onClick={() => router.push(`/business/${currentBusiness._id}/business-settings/team`)}
                className='px-6 py-2 flex items-center space-x-2 text-[#4863D4] border rounded hover:border-[#4863D4]'
            >
                <HiUsers size={20} />
                <span>Business Team</span>
            </button>
        </div>
    );
};

export default Cashbooks_Header;