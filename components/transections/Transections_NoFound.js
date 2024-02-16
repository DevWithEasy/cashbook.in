import React from 'react';
import { MdOutlineInfo } from "react-icons/md";

const Transections_NoFound = () => {
    return (
        <div
            className='pt-20 flex flex-col justify-center items-center space-y-2 border-t'
        >
            <p className='text-2xl'>No entries added Yet!</p>
            <p className='flex items-center space-x-1 text-sm'>
                <MdOutlineInfo/>
                <span>Use</span>
                <span className='text-[#01865F] font-bold'>Cash In</span>
                <span>or</span>
                <span className='text-[#C93B3B] font-bold'>Cash Out</span>
                <span>to add entries</span>
            </p>
        </div>
    );
};

export default Transections_NoFound;