import React from 'react';
import { GoPlus } from 'react-icons/go';
import { MdBook } from 'react-icons/md';

const Cashbooks_NoBook = ({view,setView}) => {
    return (
        <div
            className='pt-16 flex flex-col justify-center items-center space-y-5'
        >
            <MdBook
                size={60}
                className='p-4 bg-[#ebeefb] text-[#4863D4] rounded-full'
            />
            <p className='text-xl'>No books found with this business!</p>
            <button
                onClick={() => setView(!view)}
                className='px-8 py-3 flex justify-center items-center space-x-2 bg-[#4863D4] text-white  rounded'
            >
                <GoPlus />
                <span>Add New Book</span>
            </button>
        </div>
    );
};

export default Cashbooks_NoBook;