import {
    Modal,
    ModalContent,
    ModalOverlay,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ccpUpdateEntry } from '../../libs/allEntryAction';
import { updatePrevEntry } from '../../store/slice/bookSlice';
import getFieldName from '../../utils/getFieldName';
import { RxDotFilled } from 'react-icons/rx';

export default function Entry_CCP_Confirm({ items, id, field, view, setView, setFirstView }) {
    const { ccp } = useSelector(state => state.book)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const find = ccp.find(c => c._id === id)
    
    return (
        <>
            <Modal
                isOpen={view}
                isCentered
                size='xl'

            >
                <ModalOverlay />
                <ModalContent>
                    <div
                        className='px-6 py-4 flex justify-between items-center border-b'
                    >
                        <p className='text-xl'>Change {getFieldName(field)}</p>
                        <button
                            onClick={() => setView(!view)}
                            className='px-4 py-1 border rounded'
                        >X</button>
                    </div>

                    <div
                        className='p-6 pb-10 space-y-3'
                    >
                        <p>Are you sure</p>
                        <p
                            className='flex items-center space-x-2'
                        >
                            <RxDotFilled size={25} className='text-gray-500' />
                            <span>You have selected {items?.length} entry</span>
                        </p>
                        {find === undefined ?
                            <p
                                className='flex items-center space-x-2'
                            >
                                <RxDotFilled size={25} className='text-gray-500' />
                                <span>All selected entry will not have any {field} assigned</span>
                            </p>
                            :
                            <p
                                className='flex items-center space-x-2'
                            >
                                <RxDotFilled size={25} className='text-gray-500' />
                                <span>Selected entry will be added to '{find?.name}' {field}</span>
                            </p>
                        }
                    </div>
                    <div
                        className='px-6 py-4 flex justify-end space-x-5 border-t'
                    >
                        <button
                            onClick={(e) => setView(!view)}
                            className='px-8 py-3 text-[#4863D4] border rounded'

                        >
                            Cancel
                        </button>

                        <button
                            onClick={(e) => ccpUpdateEntry(
                                {
                                    field,
                                    id,
                                    items,
                                    action: updatePrevEntry,
                                    dispatch,
                                    setLoading,
                                    setView,
                                    setFirstView
                                }
                            )}
                            className={`px-8 py-3 border rounded bg-[#4863D4] text-white`}

                        >
                            {loading ? 'Changing...' : 'Yes, Change'}
                        </button>
                    </div>
                </ModalContent>
            </Modal>
        </>
    )
}
