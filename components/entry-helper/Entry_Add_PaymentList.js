import React, { useEffect, useState } from 'react';
import { GoPlus } from 'react-icons/go';
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { getData } from '../../libs/API_CCP_Crud';
import { addCCPs } from '../../store/slice/bookSlice';

const Entry_Add_PaymentList = ({ payment, setPayment, paymentAddView, setPaymentAddView, paymentView, setPaymentView }) => {
    const { currentBook, ccp } = useSelector(state => state.book)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        dispatch(addCCPs([]))
        getData({
            url: `payment/${currentBook._id}`,
            dispatch,
            action: addCCPs,
            setLoading
        })
    }, [paymentView])
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
                                        setPayment(c)
                                        setPaymentView(!paymentView)
                                    }}
                                    className='px-4 py-2 flex items-center space-x-3 hover:bg-gray-50 cursor-pointer'
                                >
                                    {payment?._id === c?._id ?
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
                    onClick={() => setPaymentAddView(!paymentAddView)}
                    className='w-full flex justify-center items-center space-x-2 p-2 text-sm bg-gray-100 rounded'
                >
                    <GoPlus
                        className='text-[#4863D4]'
                    />
                    <span>Add New Payment</span>
                </button>
            </div>
        </div>
    );
};

export default Entry_Add_PaymentList;