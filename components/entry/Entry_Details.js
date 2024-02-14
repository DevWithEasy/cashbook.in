import {
    Drawer,
    DrawerContent,
    DrawerOverlay
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { MdOutlineKeyboardArrowDown, MdDeleteOutline } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import { GoPlus } from "react-icons/go";
import { FiMinus } from "react-icons/fi";
import { IoCloudDone } from "react-icons/io5";
import { Entry_Action, Entry_Delete, Entry_Duplicate, Entry_Move, Entry_Opposite, Entry_Update } from '../Index';
import { useSelector } from 'react-redux'
import moment from 'moment';
import { entryDetails } from '../../libs/allEntryAction';


const Entry_Details = ({ id, view, setView }) => {
    const { user } = useSelector(state => state.auth)
    const { entries } = useSelector(state => state.book)
    const [entry, setEntry] = useState(entries.find(e => e._id === id))
    const [actionView, setActionView] = useState(false)
    const [updateView, setUpdateView] = useState(false)
    const [deleteView, setDeleteView] = useState(false)
    const [moveView, setMoveView] = useState(false)
    const [copyView, setCopyView] = useState(false)
    const [oppositeView, setOppositeView] = useState(false)
    const [loading, setLoading] = useState(false)

    const getDate = (date) => {
        return moment(date).format('DD MMM YYYY, HH:MM A')
    }

    useEffect(() => {
        entryDetails({
            id, setEntry, setLoading
        })
    }, [id])

    return (
        <>
            <Drawer
                isOpen={view}
                placement='right'
                size='lg'
            >
                <DrawerOverlay />
                <DrawerContent>
                    <div
                        className='h-16 border-b'
                    >
                        <div
                            className='px-6 py-4 flex justify-between items-center'
                        >
                            <p className='space-x-1 text-xl'>
                                <span>Entry Details</span>
                            </p>
                            <button
                                onClick={() => setView(!view)}
                                className='px-4 py-1 border rounded'
                            >X</button>
                        </div>

                    </div>
                    <div
                        className='h-[calc(100vh-144px)] p-6 space-y-5 overflow-y-auto'
                    >
                        <div
                            className='p-3 space-y-2 border rounded'
                        >
                            <div
                                className='flex justify-between text-sm'
                            >
                                <p className={`w-1/2 flex items-center space-x-2 ${entry?.entryType === 'cash_in' ? 'text-[#01865F]' : 'text-[#C93B3B]'}`}>
                                    {
                                        entry?.entryType === 'cash_in' ? <GoPlus size={15} /> : <FiMinus size={15} />
                                    }
                                    <span>{entry?.entryType === 'cash_in' ? 'Cash In' : 'Cash Out'}</span>

                                </p>
                                <p className='w-1/2 flex items-center justify-end space-x-2'>
                                    <span>On {getDate(entry?.createdAt)}</span>
                                    <IoCloudDone size={25} className='text-[#21B15B] cursor-pointer' />
                                </p>
                            </div>
                            <p
                                className={`pb-3 text-2xl ${entry?.entryType === 'cash_in' ? 'text-[#01865F]' : 'text-[#C93B3B]'}`}
                            >
                                {entry?.amount}
                            </p>
                            <div
                                className='pt-3 space-y-3 border-t'
                            >
                                {entry?.contact?.name &&
                                    <div
                                        className='text-sm'
                                    >
                                        <p className='text-gray-500'>Contact Name</p>
                                        <p>
                                            <span>{entry?.contact?.name}</span>
                                            <span className='text-gray-500'>{` (${entry?.contact?.type})`}</span>
                                        </p>
                                    </div>
                                }

                                {entry?.remark &&
                                    <div
                                        className='text-sm'
                                    >
                                        <p className='text-gray-500'>Remark</p>
                                        <p>{entry?.remark}</p>
                                    </div>
                                }

                                {entry?.category?.name || entry?.payment?.name ?
                                    <div
                                        className='space-x-3'
                                    >
                                        <span
                                            className='px-3 py-1 text-sm bg-[#EDEDFA] text-[#534ECD] rounded'
                                        >
                                            {entry?.category?.name}
                                        </span>
                                        <span
                                            className='px-3 py-1 text-sm bg-[#E7F1F9] text-[#137AC9] rounded'
                                        >
                                            {entry?.payment?.name}
                                        </span>
                                    </div>
                                    : <></>
                                }

                            </div>
                        </div>
                        <p className='text-sm text-gray-600'>Activities</p>
                        <div
                            className='px-2 border-b'
                        >
                            <div
                                className='py-1 relative pl-6 border-l'
                            >
                                <div
                                    className='absolute -left-4 top-2.5'
                                >
                                    <GoPlus
                                        size={30}
                                        className='p-2 bg-gray-100 text-gray-400 rounded-full'
                                    />
                                </div>
                                <div>
                                    <p>
                                        Created By
                                        {entry?.user?._id === user._id ? ' You' : entry?.user?.name}
                                    </p>
                                    <p className='text-gray-500 text-sm'>
                                        On {getDate(entry?.createdAt)}
                                    </p>
                                </div>
                            </div>
                            {entry?.histories?.length > 0 ?
                                <>
                                    {
                                        entry.histories.map(history =>
                                            <div
                                                key={history._id}
                                                className='py-1 relative pl-6 border-l'
                                            >
                                                <div
                                                    className='absolute -left-4 top-2.5'
                                                >
                                                    <AiOutlineEdit
                                                        size={30}
                                                        className='p-2 bg-gray-100 text-gray-400 rounded-full'
                                                    />
                                                </div>
                                                <div
                                                    className='text-sm space-y-2'
                                                >
                                                    <p className='text-gray-500'>
                                                        Change On {getDate(history.createdAt)}
                                                    </p>
                                                    <p>
                                                        <span>From : </span>
                                                        <span className='font-semibold'> {history.from}</span>
                                                    </p>
                                                    <p>
                                                        <span>To : </span>
                                                        <span className='font-semibold'> {history.to}</span>
                                                    </p>
                                                    <p>{history.remark}</p>
                                                </div>
                                            </div>
                                        )
                                    }
                                </>
                                :
                                <div
                                    className='py-1 relative pl-6 border-l'
                                >
                                    <div
                                        className='absolute -left-4 top-2.5'
                                    >
                                        <AiOutlineEdit
                                            size={30}
                                            className='p-2 bg-gray-100 text-gray-400 rounded-full'
                                        />
                                    </div>
                                    <div
                                        className='text-sm space-y-2'
                                    >
                                        <p className='text-gray-500'>
                                            Change On {getDate(history.createdAt)}
                                        </p>
                                        <p>
                                            <span>From : </span>
                                            <span className='font-semibold'> {history.from}</span>
                                        </p>
                                        <p>
                                            <span>To : </span>
                                            <span className='font-semibold'> {history.to}</span>
                                        </p>
                                        <p>{history.remark}</p>
                                    </div>
                                </div>
                            }
                            {entry?.histories?.length === 0 &&
                                <div
                                    className='py-1 relative pl-6 border-l'
                                >
                                    <div
                                        className='absolute -left-4 top-2.5'
                                    >
                                        <AiOutlineEdit
                                            size={30}
                                            className='p-2 bg-gray-100 text-gray-400 rounded-full'
                                        />
                                    </div>
                                    <div>
                                        <p>
                                            Last Update By
                                            {entry?.user?._id === user._id ? ' You' : entry?.user?.name}
                                        </p>
                                        <p className='text-gray-500 text-sm'>
                                            On {getDate(entry?.updatedAt)}
                                        </p>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                    <div
                        className='h-20 px-6 flex justify-end items-center space-x-5 border-t'
                    >
                        <button
                            onClick={() => setDeleteView(!deleteView)}
                            className='px-6 py-3 flex items-center space-x-2 text-red-500 border rounded'
                        >
                            <MdDeleteOutline size={20} />
                            <span>Delete</span>
                        </button>
                        <button
                            onClick={() => setActionView(!actionView)}
                            className='px-6 py-3 flex items-center space-x-2 text-[#4863D4] border rounded'
                        >
                            <span>More Action</span>
                            <MdOutlineKeyboardArrowDown size={20} />
                        </button>
                        <button
                            onClick={() => setUpdateView(!updateView)}
                            className='px-8 py-3 flex items-center space-x-2 bg-[#4863D4] text-white rounded'
                        >
                            <span>Edit</span>
                            <AiOutlineEdit size={20} />
                        </button>
                    </div>

                    {deleteView &&
                        <Entry_Delete {...{
                            id,
                            view: deleteView,
                            setView: setDeleteView
                        }} />
                    }
                    {updateView &&
                        <Entry_Update {...{
                            id,
                            view: updateView,
                            setView: setUpdateView
                        }} />
                    }
                    {actionView &&
                        <Entry_Action {...{
                            view: actionView,
                            setView: setActionView,
                            moveView, setMoveView,
                            copyView, setCopyView,
                            oppositeView, setOppositeView

                        }} />
                    }
                    {moveView &&
                        <Entry_Move {...{
                            items : [id],
                            setFirstView : setView,
                            view: moveView,
                            setView: setMoveView
                        }} />
                    }
                    {copyView &&
                        <Entry_Duplicate {...{
                            items : [id],
                            setFirstView : setView,
                            view: copyView,
                            setView: setCopyView
                        }} />
                    }
                    {oppositeView &&
                        <Entry_Opposite {...{
                            items : [id],
                            setFirstView : setView,
                            view: oppositeView,
                            setView: setOppositeView
                        }} />
                    }
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default Entry_Details;