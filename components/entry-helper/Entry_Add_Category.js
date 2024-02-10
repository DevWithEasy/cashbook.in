import React from 'react';
import { GoPlus } from 'react-icons/go';
import { IoSettingsOutline } from 'react-icons/io5';
import { RiArrowDownSFill } from 'react-icons/ri';

const Entry_Add_Category = ({addView, setAddView,categoryView, setCategoryView}) => {
    return (
        <div
            className='w-1/2 space-y-1'
        >
            <div
                className='flex justify-between items-center'
            >
                <span className='text-sm'>Category</span>
                <IoSettingsOutline
                    size={15}
                    className='text-[#4863D4] cursor-pointer'
                />
            </div>
            <div
                className='relative rounded'
            >
                <input
                    onFocus={() => setCategoryView(!categoryView)}
                    placeholder='Search or Select'
                    className='w-full px-4 py-2 border rounded focus:outline-[#4863D4]'
                />
                <button
                    onClick={() => setCategoryView(!categoryView)}
                    className='absolute right-0 px-3 py-2.5 border-l'
                >
                    <RiArrowDownSFill size={20} />
                </button>
                {categoryView &&
                    <div
                        className='absolute w-full h-[240px] mt-1 flex flex-col justify-between border rounded'
                    >
                        <div
                            className='h-[200px] p-2 overflow-y-auto'
                        >
                            <p className='text-sm text0gray-600 text-center'>Suggestions</p>


                        </div>
                        <div
                            className='h-10 px-2'
                        >
                            <button
                                onClick={() => setAddView(!addView)}
                                className='w-full flex justify-center items-center space-x-2 p-2 text-sm bg-gray-100 rounded'
                            >
                                <GoPlus
                                    className='text-[#4863D4]'
                                />
                                <span>Add New Category</span>
                            </button>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default Entry_Add_Category;