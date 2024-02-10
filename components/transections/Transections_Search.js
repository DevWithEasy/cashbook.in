import React from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { CiSearch } from 'react-icons/ci';

const Transections_Search = ({handleView}) => {
    return (
        <div
            className='flex justify-between items-center'
        >
            <div
                className='relative w-6/12'
            >
                <input
                    placeholder='Search by book name...'
                    className='w-full px-4 py-2 border focus:outline-[#4863D4] rounded'
                />
                <CiSearch
                    size={30}
                    className='absolute right-2 top-1 p-1 cursor-pointer'
                />
            </div>
            <div
                className='flex justify-end text-white space-x-5'
            >
                <button
                    onClick={() => handleView('cash_in')}
                    className='px-8 py-2 flex items-center space-x-2 bg-[#01865F] active:ring-2 rounded'
                >
                    <AiOutlinePlus />
                    <span>Cash In</span>
                </button>
                <button
                    onClick={() => handleView('cash_out')}
                    className='px-8 py-2 flex items-center space-x-2 bg-[#C93B3B] active:ring-2 rounded'
                >
                    <AiOutlineMinus />
                    <span>Cash Out</span>
                </button>
            </div>
        </div>
    );
};

export default Transections_Search;