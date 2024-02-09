import React from 'react';
import { ImSpinner9 } from 'react-icons/im';

const Loading = () => {
    return (
        <div
            className='h-[calc(100vh-48px)] flex justify-center items-center bg-gray-100'
        >
            <ImSpinner9
                size={30}
                className='animate-spin'
            />
        </div>
    );
};

export default Loading;