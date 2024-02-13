import { useDispatch, useSelector } from 'react-redux';
import {  deleteBook } from '../../libs/allBookAction';
import { refresh, removeBook } from '../../store/slice/bookSlice';
import React, { useState } from 'react'
import Image from 'next/image'
import opposite from '../../public/image/opposite.png'

import {
  Modal,
  ModalOverlay,
  ModalContent,
} from '@chakra-ui/react'
import { RxDotFilled } from 'react-icons/rx';
import { useRouter } from 'next/router';

export default function Entry_Opposite_Confirm({fromBook,toBook, view, setView }) {
  const { currentBook } = useSelector(state => state.book)
  const [name, setName] = useState("")
  const dispatch = useDispatch()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  
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
            className='h-[450px]'
          >
          <div
            className='h-16 px-6 py-4 flex justify-between items-center border-b'
          >
            <p className='text-xl'>Copy 1 Opposite Entry</p>
            <button
              onClick={() => setView(!view)}
              className='px-4 py-1 border rounded'
            >X</button>
          </div>

          <div
            className='h-[306px] p-6 pb-10 space-y-3 overflow-y-auto'
          >
            <p>Are you sure?</p>
            <p
              className='flex items-center space-x-2'
            >
              <RxDotFilled size={25} className='text-gray-500'/>
              <span>‘Cash In’ entries will be added as ‘Cash Out’ entries in'New 2' and vice versa</span>
            </p>
            <Image
              src={opposite.src}
              alt=''
              width={507}
              height={164}
            />
            <p
              className='flex items-center space-x-2'
            >
              <RxDotFilled size={25} className='text-gray-500'/>
              <span>This will change the net balance of 'New 2'</span>
            </p>
          </div>
          <div
            className='h-20 px-6 flex items-center justify-end space-x-5 border-t'
          >
            <button
              onClick={(e) => setView(!view)}
              className='px-8 py-3 text-[#4863D4] border rounded'

            >
              Cancel
            </button>

            <button
              onClick={(e) => deleteBook(
                name,
                currentBook,
                router,
                setLoading,
                dispatch,
                removeBook,
                refresh,
                setView
              )}
              className={`px-8 py-3 border rounded bg-[#4863D4] text-white`}

            >
              {loading ? 'Copying...' : 'Yes, Copy & Paste'}
            </button>
          </div>
          </div>
        </ModalContent>
      </Modal>
    </>
  )
}
