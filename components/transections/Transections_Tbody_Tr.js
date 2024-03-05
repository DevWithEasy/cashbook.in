import moment from 'moment';
import React from 'react';
import { MdDeleteOutline, MdOutlineCheckBox, MdOutlineCheckBoxOutlineBlank } from 'react-icons/md';
import { RiEdit2Line } from 'react-icons/ri';

const Transections_Tbody_Tr = ({ entry, menuId, setMenuId, selected, setSelected, handleDetails, deleteView, setDeleteView, updateView, setUpdateView }) => {
    const date = moment(entry.updatedAt).format('DD MMM YYYY')
    const time = moment(entry.updatedAt).format('h:mm A')

    const handleCheck=()=>{
        const isAdd = selected.includes(entry?._id)

        if(isAdd){
            const filtered = selected.filter(e=>e !== entry._id)
            setSelected(filtered)
        }else{
            setSelected([...selected,entry?._id])
        }
    }
    
    return (
        <tr
            onMouseEnter={() => setMenuId(entry?._id)}
            className='hover:bg-[#EBEEFD] cursor-pointer text-sm'
        >
            <td
                className='px-4 py-2'
            >

                {selected?.includes(entry?._id) ?
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
                <span>{date}</span>
                <br />
                <span className='text-xs'>{time}</span>
            </td>
            <td
                onClick={handleDetails}
                className='px-4 py-2'
            >
                {entry?.contact &&
                    <p>
                        <span className='font-semibold'>({entry?.contact?.name})</span>
                        <span className='text-gray-500'>({entry?.contact?.type})</span>
                    </p>
                }
                <p>{entry.remark ? entry.remark : '--'}</p>
            </td>
            <td
                onClick={handleDetails}
                className='px-4 py-2'
            >
                {entry?.category?.name}
            </td>
            <td
                onClick={handleDetails}
                className='px-4 py-2'
            >
                {entry?.payment?.name}
            </td>
            <td
                onClick={handleDetails}
                className='px-4 py-2'
            >

            </td>
            <td
                onClick={handleDetails}
                className={`px-4 py-2 text-right font-semibold ${entry?.entryType === 'cash_in' ? 'text-[#01865F]' : 'text-[#C93B3B]'}`}
            >
                {entry.amount}
            </td>
            <td
                onClick={handleDetails}
                className='px-4 py-2 text-right'
            >
                {entry.stock}
            </td>
            <td
                className='py-4 flex justify-center items-center'
            >
                <div
                    className={`flex space-x-3 ${menuId === entry?._id ? 'visible' : 'invisible'}`}
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