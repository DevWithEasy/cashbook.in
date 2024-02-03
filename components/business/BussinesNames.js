import React from 'react';
import { GoPlus } from 'react-icons/go';

const BussinesNames = () => {
    return (
        <div
            style={{ height: 'calc(100vh - 48px)' }}
            className='md:hidden w-full bg-[#2c324B] text-white overflow-y-auto'
        >
            <div
                className='h-[70px] p-4 bg-[#212121]'
            >
                <div
                    onClick={() => setView(!view)}
                    className='p-1 flex space-x-3 items-center bg-[#2c324B] rounded-md cursor-pointer'
                >
                    <GoPlus
                        size={28}
                        className='p-0.5 text-3xl bg-[#4863D4] rounded-md'
                    />
                    <span>Add New Business</span>
                </div>
            </div>
        </div>
    );
};

export default BussinesNames;