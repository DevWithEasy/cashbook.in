import React from 'react';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';

const Entry_Add_Hour = ({hour,setHour}) => {
    return (
        <select
            value={hour}
            onChange={(e) => setHour(e.target.value)}
            className='px-4 py-2 border rounded focus:outline-[#4863D4]'
        >
            {
                new Array(12).fill(0).map((_, i) =>
                    <option
                        key={i}
                        value={i + 1}
                        className='flex items-center space-x-2'
                    >
                        <span>{i + 1}</span>
                        <span >
                            <MdOutlineKeyboardArrowDown />
                        </span>
                    </option>
                )
            }
        </select>
    );
};

export default Entry_Add_Hour;