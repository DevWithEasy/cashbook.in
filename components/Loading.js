import React from 'react';

const Loading = () => {
    return (
        <div
            className='h-screen flex justify-center items-center bg-gray-100'
        >
            <ImSpinner9
                size={30}
                className='animate-spin'
            />
        </div>
    );
};

export default Loading;