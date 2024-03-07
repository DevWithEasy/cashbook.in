import React from 'react';
import { IoSettingsOutline } from 'react-icons/io5';
import { RiArrowDownSFill } from 'react-icons/ri';
import { RxCross2 } from "react-icons/rx";
import Entry_Add_CategoryList from './Entry_Add_CategoryList';

const Entry_Add_Category = ({ category, setCategory, addView, setAddView, categoryView, setCategoryView }) => {
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
                    placeholder={`${category?.name ? category?.name : 'Search or Select'}`}
                    className='w-full px-4 py-2 border rounded focus:outline-[#4863D4]'
                />
                {category?.name &&
                    <button
                        onClick={() => setCategory({})}
                        className='absolute right-10 px-3 py-2.5'
                    >
                        <RxCross2 size={18} />
                    </button>
                }
                <button
                    onClick={() => setCategoryView(!categoryView)}
                    className='absolute right-0 px-3 py-2.5 border-l'
                >
                    <RiArrowDownSFill size={20} />
                </button>
                {categoryView &&
                    <Entry_Add_CategoryList {...{category, setCategory, addView, setAddView, categoryView, setCategoryView}}/>
                }
            </div>
        </div>
    );
};

export default Entry_Add_Category;