import { useDispatch, useSelector } from 'react-redux';
import { createBook } from '../../libs/allBookAction';
import { addBook, refresh } from '../../store/slice/bookSlice';
import React, { useState } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
} from '@chakra-ui/react'
import { TiInfo } from 'react-icons/ti';
import { MdDeleteOutline } from 'react-icons/md';
import { RxCross2 } from 'react-icons/rx';

export default function Category_Delete({ view, setView }) {
    const { currentBusiness } = useSelector(state => state.book)
    const [name, setName] = useState("")
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    return (
        <>
            <Modal
                isOpen={view}
                isCentered
                size='xl'

            >
                <ModalOverlay />
                <ModalContent className='mx-2'>
                    <div
                        className='px-6 py-4 flex justify-between items-center border-b'
                    >
                        <p className='text-xl'>Delete Category</p>
                        <button
                            onClick={() => setView(!view)}
                            className='px-4 py-1 border rounded'
                        >X</button>
                    </div>

                    <div
                        className='p-6 pb-10 space-y-3'
                    >
                        <div
                            className='p-2 flex items-center space-x-3 bg-[#F8EFE7] text-[#BD610D] border border-[#BD610D] rounded'
                        >
                            <TiInfo
                                size={35}
                            />
                            <p className='text-sm'>
                                Are you sure? You will lose all entries of this book permanently.
                            </p>
                        </div>
                        <div
                            className='space-y-1'
                        >
                            
                        </div>
                    </div>
                    <div
                        className='px-6 py-4 flex justify-end space-x-5 border-t'
                    >
                        <button
                            onClick={(e) => setView(!view)}
                            className='px-8 py-3 flex items-center space-x-3 text-[#4863D4] border rounded'

                        >
                            <RxCross2 size={20} />
                            <span>Cancel</span>
                        </button>

                        <button
                            onClick={(e) => createBook(
                                currentBusiness?._id,
                                name,
                                setLoading,
                                dispatch,
                                addBook,
                                refresh,
                                setView
                            )}
                            className={`px-8 py-3 flex items-center space-x-3 border rounded ${!name === 'Robiul Awal' ? 'text-[#C93B3B]' : 'bg-[#C93B3B] text-white'}`}

                        >
                            <MdDeleteOutline size={20} />
                            <span>{loading ? 'Deleting...' : 'Delete'}</span>
                        </button>
                    </div>
                </ModalContent>
            </Modal>
        </>
    )
}
