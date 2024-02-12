import React, { useEffect, useState } from 'react';
import { GoPlus } from 'react-icons/go';
import { IoSettingsOutline } from 'react-icons/io5';
import { RiArrowDownSFill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { getData } from '../../libs/API_CCP_Crud';
import { addCCPs } from '../../store/slice/bookSlice';
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from 'react-icons/md';
import { RxCross2 } from "react-icons/rx";

const Entry_Add_Category = ({ category, setCategory, addView, setAddView, categoryView, setCategoryView }) => {
    const { currentBook, ccp } = useSelector(state => state.book)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        dispatch(addCCPs([]))
        getData({
            url: `/api/category?id=${currentBook._id}`,
            dispatch,
            action: addCCPs,
            setLoading
        })
    }, [categoryView])
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
                    <div
                        className='absolute z-50 w-full h-[240px] mt-1 flex flex-col justify-between bg-white border rounded'
                    >
                        <div
                            className='h-[200px] overflow-y-auto'
                        >
                            {ccp?.length > 0 ?
                                <div>
                                    <p className='p-2 text-center text-xs'>In This Book</p>
                                    {
                                        ccp.map(c =>
                                            <div
                                                key={c?._id}
                                                onClick={() => {
                                                    setCategory(c)
                                                    setCategoryView(!categoryView)
                                                }}
                                                className='px-4 py-2 flex items-center space-x-3 hover:bg-gray-50 cursor-pointer'
                                            >
                                                {category === c?._id ?
                                                    <MdRadioButtonChecked />
                                                    :
                                                    <MdRadioButtonUnchecked />
                                                }
                                                <span>{c?.name}</span>
                                            </div>
                                        )
                                    }
                                </div>
                                :
                                <p
                                    className='py-10 text-sm text-center'
                                >
                                    {!loading ? 'No Category Found' : 'Finding...'}
                                </p>
                            }
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