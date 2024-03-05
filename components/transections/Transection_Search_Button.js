import React from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

const Transection_Search_Button = ({className,handleView}) => {
    return (
        <div
                className={className}
            >
                <button
                    onClick={() => handleView('cash_in')}
                    className='w-1/2 px-8 py-2 flex justify-center items-center space-x-2 bg-[#01865F] active:ring-2 rounded'
                >
                    <AiOutlinePlus />
                    <span>Cash In</span>
                </button>
                <button
                    onClick={() => handleView('cash_out')}
                    className='w-1/2 px-8 py-2 flex justify-center items-center space-x-2 bg-[#C93B3B] active:ring-2 rounded'
                >
                    <AiOutlineMinus />
                    <span>Cash Out</span>
                </button>
            </div>
    );
};

export default Transection_Search_Button;