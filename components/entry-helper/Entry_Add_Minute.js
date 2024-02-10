import React from 'react';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';

const Entry_Add_Minute = ({minute, setMinute}) => {
    return (
        <select
            value={minute}
            onChange={(e) => setMinute(e.target.value)}
            className='px-4 py-2 border rounded focus:outline-[#4863D4]'
        >
            {
                new Array(59).fill(0).map((_, i) =>
                    <option
                        key={i}
                        value={i}
                        className='flex items-center space-x-2'
                    >
                        <span>{i}</span>
                        <span >
                            <MdOutlineKeyboardArrowDown />
                        </span>
                    </option>
                )
            }
        </select>
    );
};

export default Entry_Add_Minute;