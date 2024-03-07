import React from 'react';
import { IoSettingsOutline } from 'react-icons/io5';
import { RiArrowDownSFill } from 'react-icons/ri';
import { RxCross2 } from "react-icons/rx";
import Entry_Add_PaymentList from './Entry_Add_PaymentList';

const Entry_Add_Payment = ({ payment, setPayment, paymentAddView, setPaymentAddView, paymentView, setPaymentView }) => {
    return (
        <div
            className='w-1/2 space-y-1'
        >
            <div
                className='flex justify-between items-center'
            >
                <span className='text-sm'>Paymment</span>
                <IoSettingsOutline
                    size={15}
                    className='text-[#4863D4] cursor-pointer'
                />
            </div>
            <div
                className='relative rounded'
            >
                <input
                    onClick={() => setPaymentView(!paymentView)}
                    placeholder={`${payment?.name ? payment?.name : 'Search or Select'}`}
                    className='w-full px-4 py-2 border rounded focus:outline-[#4863D4]'
                />
                                {payment?.name &&
                    <button
                        onClick={() => setPayment({})}
                        className='absolute right-10 px-3 py-2.5'
                    >
                        <RxCross2 size={18} />
                    </button>
                }
                <button
                    onClick={() => setPaymentView(!paymentView)}
                    className='absolute right-0 px-3 py-2.5 border-l'
                >
                    <RiArrowDownSFill size={20} />
                </button>
                {paymentView &&
                    <Entry_Add_PaymentList {...{payment, setPayment, paymentAddView, setPaymentAddView, paymentView, setPaymentView}}/>
                }
            </div>
        </div>
    );
};

export default Entry_Add_Payment;