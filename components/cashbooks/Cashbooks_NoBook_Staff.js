import React from 'react';
import { MdBook } from 'react-icons/md';
import Image from 'next/image'

const Cashbooks_NoBook_Staff = ({view,setView}) => {
    return (
        <div
            className='pt-16 flex flex-col justify-center items-center space-y-5'
        >
            <Image
                src='/image/arrowLeft.svg'
                alt=''
                height={48}
                width={48}
            />
            <div
                className='text-gray-500 text-center'
            >
            <p>We found no books in this business!</p>
            <p>Select different business on left side panel to check other books</p>
            </div>
        </div>
    );
};

export default Cashbooks_NoBook_Staff;