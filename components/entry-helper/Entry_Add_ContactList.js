import React, { useEffect, useState } from 'react';
import { GoPlus } from 'react-icons/go';
import { IoSettingsOutline } from 'react-icons/io5';
import { RiArrowDownSFill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { getData } from '../../libs/API_CCP_Crud';
import { addCCPs } from '../../store/slice/bookSlice';
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from 'react-icons/md';
import { RxCross2 } from "react-icons/rx";

const Entry_Add_ContactList = ({ contact, setContact, contactAddView, setContactAddView, contactView, setContactView }) => {
    const { currentBook, ccp } = useSelector(state => state.book)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        dispatch(addCCPs([]))
        getData({
            url: `contact/${currentBook._id}`,
            dispatch,
            action: addCCPs,
            setLoading
        })
    }, [contactView])
    return (
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
                                        setContact(c)
                                        setContactView(!contactView)
                                    }}
                                    className='px-4 py-2 flex items-center space-x-3 hover:bg-gray-50 cursor-pointer'
                                >
                                    {contact?._id === c?._id ?
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
                    onClick={() => setContactAddView(!contactAddView)}
                    className='w-full flex justify-center items-center space-x-2 p-2 text-sm bg-gray-100 rounded'
                >
                    <GoPlus
                        className='text-[#4863D4]'
                    />
                    <span>Add New Contact</span>
                </button>
            </div>
        </div>
    );
};

export default Entry_Add_ContactList;