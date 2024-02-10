import React from 'react';
import { MdDeleteOutline, MdOutlineCheckBox, MdOutlineCheckBoxOutlineBlank } from 'react-icons/md';
import { RiEdit2Line } from 'react-icons/ri';

const Transections_Tbody_Tr = ({menuId,setMenuId,check,handleCheck,handleDetails,deleteView,setDeleteView,updateView,setUpdateView}) => {
    return (
        <tr
            onMouseEnter={() => setMenuId()}
            className='hover:bg-[#EBEEFD] cursor-pointer'


        >
            <td
                className='px-4 py-2'
            >

                {check ?
                    <MdOutlineCheckBox
                        size={20}
                        onClick={handleCheck}
                    />
                    :
                    <MdOutlineCheckBoxOutlineBlank
                        size={20}
                        onClick={handleCheck}
                    />
                }
            </td>
            <td
                onClick={handleDetails}
                className='px-4 py-2'
            >
                <span>08 Jan 2024</span>
                <br />
                <span className='text-xs'>08:22pm</span>
            </td>
            <td
                onClick={handleDetails}
                className='px-4 py-2'
            >
                Robiul Awal
            </td>
            <td
                onClick={handleDetails}
                className='px-4 py-2'
            >

            </td>
            <td
                onClick={handleDetails}
                className='px-4 py-2'
            >

            </td>
            <td
                onClick={handleDetails}
                className='px-4 py-2'
            >

            </td>
            <td
                onClick={handleDetails}
                className='px-4 py-2 text-right'
            >
                1000
            </td>
            <td
                onClick={handleDetails}
                className='px-4 py-2 text-right'
            >
                1000
            </td>
            <td
                className='py-4 flex justify-center items-center'
            >
                <div
                    className={`flex space-x-3 ${menuId === 1 ? 'visible' : 'invisible'}`}
                >
                    <RiEdit2Line
                        size={22}
                        onClick={() => setUpdateView(!updateView)}
                        className='text-[#4863D4] cursor-pointer'
                    />
                    <MdDeleteOutline
                        size={22}
                        onClick={() => setDeleteView(!deleteView)}
                        className='text-red-500 cursor-pointer'
                    />
                </div>
            </td>
        </tr>
    );
};

export default Transections_Tbody_Tr;