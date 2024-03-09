import moment from 'moment';
import React from 'react';

const Transection_Export_TbodyExcel = ({ lastEntry, entries, EntryManager }) => {
    return (
        <tbody>
            {
                entries.map(entry =>
                    <tr
                        key={entry?._id}
                        className='print:text-[12px]'
                    >
                        <td className='p-2 border print:border-gray-300'>
                            {moment(entry?.createdAt).format('DD MMM YYYY')}
                        </td>
                        <td className='p-2 border print:border-gray-300'>
                            {entry?.remark}
                        </td>
                        <td className='p-2 border print:border-gray-300'>
                            {entry?.contact?.name}
                        </td>
                        <td className='p-2 border print:border-gray-300'>
                            {entry?.category?.name}
                        </td>
                        <td className='p-2 border print:border-gray-300'>
                            {entry?.payment?.name}
                        </td>
                        <td className='p-2 border text-green-600 text-right print:border-gray-300'>
                            {entry?.entryType === 'cash_in' && entry?.amount}
                        </td>
                        <td className='p-2 border text-red-600 text-right print:border-gray-300'>
                            {entry?.entryType === 'cash_out' && entry?.amount}
                        </td>
                        <td className='p-2 border print:border-gray-300'>
                            {entry?.user?.name}
                        </td>
                        <td className='p-2 border text-right print:border-gray-300'>
                            {entry?.stock}
                        </td>
                    </tr>
                )
            }
            <tr
                className='bg-[#F2F5FF] font-bold'
            >
                <td className='p-2 border print:border-gray-300'>{moment(lastEntry?.createdAt).format('DD MMM YYYY')}</td>
                <td className='p-2 border print:border-gray-300'>Final Balance</td>
                <td className='p-2 border print:border-gray-300'></td>
                <td className='p-2 border print:border-gray-300'></td>
                <td className='p-2 border print:border-gray-300'></td>
                <td className='p-2 text-right border print:border-gray-300'>{EntryManager.cashIn()}</td>
                <td className='p-2 text-right border print:border-gray-300'>{EntryManager.cashOut()}</td>
                <td className='p-2 border print:border-gray-300'></td>
                <td className='p-2 text-right border print:border-gray-300'>{EntryManager.balance()}</td>
            </tr>
        </tbody>
    );
};

export default Transection_Export_TbodyExcel;