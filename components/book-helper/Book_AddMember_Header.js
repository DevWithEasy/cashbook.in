import React from 'react';
import { MdInfo } from "react-icons/md";
import { useSelector } from 'react-redux';

const Book_AddMember_Header = ({ view, setView, nextStep }) => {
    const { currentBook } = useSelector(state => state.book)
    return (
        <div
            className='h-32'
        >
            <div
                className='px-6 py-4 flex justify-between items-center'
            >
                <p className='text-xl'>Add from {currentBook?.name}</p>
                <button
                    onClick={() => setView(!view)}
                    className='px-4 py-1 border rounded'
                >X</button>
            </div>
            <div
                className='p-4 flex items-center space-x-3 bg-[#EEEDFA]'
            >
                <p>
                    <MdInfo
                        size={25}
                        className='text-[#4863D4]'
                    />
                </p>
                <p
                    className='text-sm'
                >
                    {nextStep ?
                        'You can change operator permissions from book setting page after adding this operator.'
                        :
                        `You can add members to this book from the staff of “${currentBook?.name}”`
                    }
                </p>
            </div>
        </div>
    );
};

export default Book_AddMember_Header;