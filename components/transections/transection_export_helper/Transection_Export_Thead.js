import React from 'react';

const Transection_Export_Thead = ({ fields }) => {
    return (
        <thead>
            <tr
                className='bg-[#F2F5FF] font-semibold'
            >
                <td className='p-2 border print:border-gray-300'>
                    Date
                </td>
                {fields.includes('remark') &&
                    <td className='p-2 border print:border-gray-300'>
                        Remark
                    </td>
                }
                {fields.includes('contact') &&
                    <td className='p-2 border print:border-gray-300'>
                        Contact
                    </td>
                }
                {fields.includes('category') &&
                    <td className='p-2 border print:border-gray-300'>
                        Category
                    </td>
                }
                {fields.includes('payment') &&
                    <td className='p-2 border print:border-gray-300'>
                        Mode
                    </td>
                }
                <td className='p-2 text-right border print:border-gray-300'>
                    Cash In
                </td>
                <td className='p-2 text-right border print:border-gray-300'>
                    Cash Out
                </td>
                {fields.includes('members') &&
                    <td className='p-2 border print:border-gray-300'>
                        Entry By
                    </td>
                }
                {fields.includes('balance') &&
                    <td className='p-2 text-right border print:border-gray-300'>
                        Balance
                    </td>
                }

            </tr>
        </thead>
    );
};

export default Transection_Export_Thead;