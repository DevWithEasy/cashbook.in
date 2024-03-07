import React from 'react';
import { BiPlus, BiMinus } from 'react-icons/bi';
import { TbEqual } from 'react-icons/tb'
import { useSelector } from 'react-redux'
import Entry from '../../utils/Entry';
import { isMobile } from 'react-device-detect'

const Balance = () => {
    const { entries } = useSelector(state => state.book)
    const balance = new Entry(entries)
    return (
        <>
            <div
                className='md:hidden bg-white border rounded-md'
            >
                <p className='p-2 flex justify-between border-b'>
                    <span>Net Balance</span>
                    <span>{balance.balance()}</span>
                </p>
                <div
                    className='p-2 text-sm'
                >
                    <p className='flex justify-between'>
                        <span>Total In (+)</span>
                        <span>{balance.cashIn()}</span>
                    </p>
                    <p className='flex justify-between'>
                        <span>Total Out (-)</span>
                        <span>{balance.cashOut()}</span>
                    </p>
                </div>
            </div>
            <div className='hidden border p-4 rounded sm:flex sm:justify-between sm:items-center mb-2 space-y-3 sm:space-y-0 bg-white'>
                <div className="flex items-center w-4/12">
                    <div className="flex space-x-2 pt-2 ">
                        <BiPlus color='green' size={25} className="p-1 bg-green-100 rounded-full" />
                        <div>
                            <p className='text-sm text-gray-600'>
                                Cash In
                            </p>
                            <p className='font-2xl font-semibold'>{balance.cashIn()}/-</p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center w-4/12">
                    <div className="flex space-x-2 pt-2 ">
                        <BiMinus color='red' size={25} className="p-1 bg-red-100 rounded-full" />
                        <div>
                            <p className='text-sm text-gray-600'>
                                Cash Out
                            </p>
                            <p className='font-2xl font-semibold'>{balance.cashOut()}/-</p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center w-4/12">
                    <div className="flex space-x-2 pt-2 ">
                        <TbEqual size={25} className="p-1 bg-gray-100 rounded-full" />
                        <div>
                            <p className='text-sm text-gray-600'>
                                Net Balance
                            </p>
                            <p className='font-2xl font-semibold'>{balance.balance()}/-</p>
                        </div>
                    </div>
                </div>
            </div>
        </>


    );
};

export default Balance;