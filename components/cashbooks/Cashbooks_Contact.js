import React from 'react';
import { IoLogoWhatsapp } from 'react-icons/io';
import Link from 'next/link';
import { GoPlus } from 'react-icons/go';

const Cashbooks_Contact = ({ view, setView }) => {
    return (
        <>
            <div
                className='flex justify-end'
            >
                <button
                    onClick={() => setView(!view)}
                    className='w-full py-2 flex justify-center items-center space-x-2 bg-[#4863D4] text-white  rounded'
                >
                    <GoPlus />
                    <span>Add New Book</span>
                </button>
            </div>
            <div
                className='p-3 space-y-1 border rounded-lg'
            >
                <IoLogoWhatsapp
                    size={50}
                    className='p-3 bg-[#DFF4ED] text-[#31BF2F] rounded-full'
                />
                <p>Need help in business setup?</p>
                <p className='pb-2 text-sm text-gray-500'>Our support team will help you</p>
                <Link href='' className='text-blue-500'>
                    Contact us
                </Link>
            </div>
        </>
    );
};

export default Cashbooks_Contact;