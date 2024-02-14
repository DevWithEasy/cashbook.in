import React from 'react';
import { MdOutlineCheckBox, MdOutlineCheckBoxOutlineBlank } from 'react-icons/md';

const Transections_TheadMain = ({selected,handleSelectAll}) => {
    return (
        <thead
            className='text-sm h-12'
        >
            <tr
                className='bg-slate-100 border-b'
            >
                <td
                    className='p-4'
                >

                    {selected?.length > 0 ?
                        <MdOutlineCheckBox
                            size={20}
                            onClick={handleSelectAll}
                        />
                        :
                        <MdOutlineCheckBoxOutlineBlank
                            size={20}
                            onClick={handleSelectAll}
                        />
                    }
                </td>
                <td
                    className='px-4 py-2'
                >
                    Date & Time</td>
                <td
                    className='px-4 py-2'
                >
                    Details</td>
                <td
                    className='px-4 py-2'
                >
                    Category</td>
                <td
                    className='px-4 py-2'
                >
                    Mode</td>
                <td
                    className='px-4 py-2'
                >
                    Bill</td>
                <td
                    className='px-4 py-2 text-right'
                >
                    Amount</td>
                <td
                    className='px-4 py-2 text-right'
                >
                    Balance</td>
                <td
                    className='px-4 py-2'
                >
                </td>
            </tr>
        </thead>
    );
};

export default Transections_TheadMain;