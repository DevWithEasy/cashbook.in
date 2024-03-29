import moment from 'moment';
import React from 'react';
import { useSelector } from 'react-redux';
import Image from "next/image";

const Transection_Export_PDFHeader = () => {
    const { user } = useSelector(state => state.auth)
    return (
        <div
            className='px-4 py-2 flex items-center space-x-3 bg-[#F2F5FF] rounded-t-md print:rounded-none'
        >
            <div>
                <Image
                    src='/logo.svg'
                    alt="logo"
                    className=""
                    height={30}
                    width={80}
                />
            </div>
            <div>
                <p className='text-2xl print:text-xl font-bold'>CashBook Report</p>
                <p
                    className='text-sm'
                >
                    Generated On - {moment().format('DD MMM YYYY')}, {moment().format('hh:mm A')}. Generated by - {user?.name}  ({user?.number})
                </p>
            </div>
        </div>
    );
};

export default Transection_Export_PDFHeader;