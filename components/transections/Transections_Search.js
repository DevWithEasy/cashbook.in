import React from 'react';
import { CiSearch } from 'react-icons/ci';
import Transection_Search_Button from './Transection_Search_Button'

const Transections_Search = ({ handleView,permission }) => {
    return (
        <div
            className='flex flex-col md:flex-row justify-between md:items-center space-y-3 md:space-y-0 md:space-x-10'
        >
            <div
                className='relative w-full md:w-6/12'
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
            {permission.transectionAdd() &&
                <>
                    <Transection_Search_Button {...{
                        className: 'hidden md:w-6/12 md:flex justify-end text-white space-x-5',
                        handleView
                    }} />
                    <Transection_Search_Button {...{
                        className: 'md:hidden fixed bottom-0 left-0 w-full p-2 flex justify-between bg-white text-white space-x-5',
                        handleView
                    }} />
                </>
            }


        </div>
    );
};

export default Transections_Search;