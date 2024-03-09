import React from 'react';

const Transection_Export_Balance = ({ EntryManager, currentBook }) => {
    return (
        <div
            className='space-y-2'
        >
            <p className='text-2xl print:text-base font-bold'>{currentBook?.name}</p>
            <div
                className='grid grid-cols-3 border rounded-md print:rounded-none print:border-gray-300'
            >
                <div
                    className='p-2 border-r print:border-gray-300'
                >
                    <p className='text-sm text-gray-500'>Total Cash In</p>
                    <p className='text-green-600 font-bold'>{EntryManager.cashIn()}</p>
                </div>
                <div
                    className='p-2 border-r print:border-gray-300'
                >
                    <p className='text-sm text-gray-500'>Total Cash Out</p>
                    <p className='text-red-600 font-bold'>{EntryManager.cashOut()}</p>
                </div>
                <div
                    className='p-2'
                >
                    <p className='text-sm text-gray-500'>Final Balance</p>
                    <p className='font-bold'>{EntryManager.balance()}</p>
                </div>
            </div>
        </div>
    );
};

export default Transection_Export_Balance;