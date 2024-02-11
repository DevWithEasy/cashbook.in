import React from 'react';

const Entry_Add_Header = ({ type, view, setView }) => {
    return (
        <div
            className='px-6 py-4 flex justify-between items-center'
        >
            <p className={`space-x-1 text-xl ${type == 'cash_out' && 'text-[#c93b3b]'}`}>
                <span>Add Cash</span>
                <span>{type === 'cash_in' ? 'In Entry' : 'Out Entry'}</span>
            </p>
            <button
                onClick={() => setView(!view)}
                className='px-4 py-1 border rounded'
            >X</button>
        </div>
    );
};

export default Entry_Add_Header;