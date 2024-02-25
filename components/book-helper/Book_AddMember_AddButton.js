import React from 'react';
import { ImUsers } from 'react-icons/im';
import { IoIosArrowForward } from 'react-icons/io';

const Book_AddMember_AddButton = ({addView,setAddView}) => {
    return (
        <div
            onClick={() => setAddView(!addView)}
            className='flex justify-between items-center cursor-pointer'
        >
            <div
                className='flex items-center space-x-4'
            >
                <ImUsers
                    size={50}
                    className='p-4 bg-[#ebeefb] text-[#4863D4] rounded-full'
                />
                <div
                    className='text-sm space-y-1'
                >
                    <p className='font-semibold'>Add New Member</p>
                    <p className='text-gray-500 text-xs'>
                        Invite members who are not part of your business yet</p>
                </div>
            </div>
            <IoIosArrowForward />
        </div>
    );
};

export default Book_AddMember_AddButton;