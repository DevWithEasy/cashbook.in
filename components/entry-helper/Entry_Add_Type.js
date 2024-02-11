import React from 'react';

const Entry_Add_Type = ({ type, setType }) => {
    return (
        <div
            className='flex items-center space-x-3 text-xs'
        >
            <button
                onClick={() => setType('cash_in')}
                className={`px-4 py-2 border rounded-full ${type == 'cash_in' && 'bg-[#01865F] text-white'}`}
            >
                Cash In
            </button>
            <button
                onClick={() => setType('cash_out')}
                className={`px-4 py-2 border rounded-full ${type == 'cash_out' && 'bg-[#c93b3b] text-white'}`}
            >
                Cash Out
            </button>
        </div>
    );
};

export default Entry_Add_Type;