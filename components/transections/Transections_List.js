import React from 'react';
import { useSelector } from 'react-redux'
import Entry from '../../utils/Entry';
import getEntryDate from '../../utils/getEntryDate';

const Transections_List = ({ detailsView, setDetailsView,setMenuId }) => {
    const { entries } = useSelector(state => state.book)
    const { user } = useSelector(state => state.auth)
    const entryConst = new Entry(entries)
    const generatedEntries = entryConst.generatedEntry()
    return (
        <div
            className='md:hidden pb-16'
        >
            {
                generatedEntries.map(entry =>
                    <div
                        key={entry?._id}
                        onClick={()=>{
                            setDetailsView(!detailsView)
                            setMenuId(entry?._id)
                        }}
                        className='px-4 py-2 space-y-1 bg-white border-b cursor-pointer'
                    >
                        <div
                            className='flex justify-between'
                        >
                            <p className='text-sm'>
                                By {entry?.user?._id === user._id ? ' You' : entry?.user?.name}
                            </p>
                            <p
                                className={`${entry?.entryType === 'cash_in' ? 'text-[#01865F]' : 'text-[#C93B3B]'}`}
                            >
                                {entry?.amount}
                            </p>
                        </div>
                        <div
                            className='flex justify-between'
                        >
                            <span
                                className={`px-3 py-1 text-sm rounded bg-[#E7F1F9] text-[#4863D4]`}
                            >
                                {entry?.payment?.name}
                            </span>
                            <p className='text-sm'>Balance: {entry?.stock}</p>
                        </div>
                        {entry?.remarks &&
                            <p className='text-sm'>{entry?.remarks}</p>
                        }
                        <p className='text-sm'>
                            {getEntryDate(entry?.updatedAt)}
                        </p>
                    </div>
                )
            }
        </div>
    );
};

export default Transections_List;