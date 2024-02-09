import {
    Modal,
    ModalContent,
    ModalOverlay
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { MdOutlineContentCopy, MdOutlineTurnRight } from "react-icons/md";
import { TbPlusMinus } from "react-icons/tb";
import { useDispatch } from 'react-redux';

export default function Entry_Action({ view, setView }) {
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
                        className='h-[400px]'
                    >
                        <div
                            className='h-16 px-6 py-4 flex justify-between items-center border-b'
                        >
                            <p className='text-xl'>More Action</p>
                            <button
                                onClick={() => setView(!view)}
                                className='px-4 py-1 border rounded'
                            >X</button>
                        </div>
                        <div
                            className='h-[336px] px-6 py-3 space-y-5 overflow-y-auto'
                        >
                            <p
                                className='p-4 bg-gray-100 text-sm rounded-md'
                            >
                                Transfer Entry
                                (<span className='text-[#bd610d]'>Premium Trial Feature.</span>
                                learn more)
                            </p>
                            <div
                                className=''
                            >
                                <div
                                    className='flex items-center p-4 space-x-4 border-b hover:bg-gray-100 rounded-md'
                                >
                                    <MdOutlineTurnRight size={25} />
                                    <div>
                                        <p>Move Entry</p>
                                        <p className='text-sm text-gray-500'>
                                            Entry will be moved to the other selected book</p>
                                    </div>
                                </div>
                                <div
                                    className='flex items-center p-4 space-x-4 border-b hover:bg-gray-100 rounded-md'
                                >
                                    <MdOutlineContentCopy size={25} />
                                    <div>
                                        <p>Copy Entry</p>
                                        <p className='text-sm text-gray-500'>

                                            Entry will stay in both books</p>
                                    </div>
                                </div>
                                <div
                                    className='flex items-center p-4 space-x-4 border-b hover:bg-gray-100 rounded-md'
                                >
                                    <TbPlusMinus size={25} />
                                    <div>
                                        <p>Copy Opposite Entry</p>
                                        <p className='text-sm text-gray-500'>
                                            Cash In entry will be added as Cash out entry in other book and vice versa</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ModalContent>
            </Modal>
        </>
    )
}
