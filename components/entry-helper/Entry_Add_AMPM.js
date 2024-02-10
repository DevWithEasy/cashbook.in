import React from 'react';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';

const Entry_Add_AMPM = ({ ampm, setAmPm }) => {
    return (
        <select
            value={ampm}
            onChange={(e) => setAmPm(e.target.value)}
            className='px-4 py-2 border rounded focus:outline-[#4863D4]'
        >
            <option
                className='flex items-center space-x-2'
            >
                <span>AM</span>
                <span >
                    <MdOutlineKeyboardArrowDown />
                </span>
            </option>
            <option
                className='flex items-center space-x-2'
                value='PM'
            >
                <span>PM</span>
                <span >
                    <MdOutlineKeyboardArrowDown />
                </span>
            </option>
        </select>
    );
};

export default Entry_Add_AMPM;