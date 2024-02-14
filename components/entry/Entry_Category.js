import {
    Drawer,
    DrawerContent,
    DrawerOverlay
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { MdCheckBox, MdCheckBoxOutlineBlank, MdInfo } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { addCCPs } from '../../store/slice/bookSlice';
import { getData } from '../../libs/API_CCP_Crud';
import { Category_Add } from '../Index';

const Entry_Category = ({ view, setView }) => {
    const { currentBook, ccp } = useSelector(state => state.book)
    const dispatch = useDispatch()
    const [selected, setSelected] = useState()
    const [loading, setLoading] = useState(false)
    const [addView, setAddView] = useState(false)

    useEffect(() => {
        dispatch(addCCPs([]))
        getData({
            url: `/api/category?id=${currentBook._id}`,
            dispatch,
            action: addCCPs,
            setLoading
        })
    }, [])
    return (
        <>
            <Drawer
                isOpen={view}
                placement='right'
                size='md'
            >
                <DrawerOverlay />
                <DrawerContent>
                    <div
                        className='h-16'
                    >
                        <div
                            className='px-6 py-4 flex justify-between items-center border-b'
                        >
                            <p className='text-xl'>Duplicate Book</p>
                            <button
                                onClick={() => setView(!view)}
                                className='px-4 py-1 border rounded'
                            >X</button>
                        </div>
                    </div>
                    <div
                        className='h-[calc(100vh-144px)] p-6 space-y-5 overflow-y-auto'
                    >
                        {loading ?
                            <div></div>
                            :
                            <div>
                                {ccp?.length === 0 ?
                                    <div>
                                        <div
                                        className={`w-8/12 mx-auto pt-5 flex flex-col justify-center items-center space-y-5`}
                                    >
                                        <MdLabel
                                            size={60}
                                            className='p-4 bg-[#ebeefb] text-[#4863D4] rounded-full'
                                        />
                                        <div
                                            className='w-full text-center'
                                        >
                                            <p className='text-xl font-semibold'>No Categories Found</p>
                                            <p className='text-gray-500 text-sm Add new or import from other books'>
                                                Add new or import from other books
                                            </p>
                                        </div>
                                        <div
                                            className='w-full pt-5 pb-10 space-y-3'
                                        >
                                            <button
                                                onClick={() => setAddView(!addView)}
                                                className='px-8 py-2 flex justify-center items-center space-x-2 bg-[#4863D4] text-white focus:ring-2 rounded'
                                            >
                                                <AiOutlinePlus />
                                                <span>Add New</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div
                                        className='p-4 flex space-x-3 items-center bg-[#EEEDFA] text-[#534ECD]'
                                    >
                                        <MdInfo/>
                                        <p>
                                        Go to “Book Settings &gt; Entry Field &gt; Category to import category from different book in the same business.
                                        </p>
                                    </div>
                                    </div>
                                    :
                                    <div>

                                    </div>
                                }
                            </div>
                        }
                    </div>
                    <div
                        className='h-20 p-6 flex justify-end items-center space-x-4'
                    >
                        {ccp?.length === 0 ?
                            <button
                                onClick={() => setView(!view)}
                                className='px-6 py-2 text-[#4863D4] hover:bg-gray-50 border rounded'
                            >
                                Close
                            </button>
                            :
                            <>
                                <button
                                    onClick={() => setAddView(!addView)}
                                    className='px-6 py-2 text-[#4863D4] border rounded'
                                >
                                    Add New
                                </button>
                                <button
                                    className='px-6 py-2 bg-[#4863D4] text-white rounded'
                                >
                                    Update
                                </button>
                            </>
                        }
                    </div>
                    {addView &&
                        <Category_Add {...{
                            view : addView,
                            setView : setAddView
                        }}/>
                    }
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default Entry_Category;