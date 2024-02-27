import {
  Modal,
  ModalContent,
  ModalOverlay
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { AiFillBook } from 'react-icons/ai';
import { ImUsers } from 'react-icons/im';
import { IoCheckmarkOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';

export default function Business_AddMemberSuccess({ view, setView }) {
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
            <p className='text-xl'>Added in Business Team</p>
            <button
              onClick={() => setView(!view)}
              className='px-4 py-1 border rounded'
            >X</button>
          </div>

          <div
            className='px-6 pt-3 pb-10 flex flex-col justify-center items-center space-y-5'
          >
            <IoCheckmarkOutline size={60}
              className='p-4 bg-[#21B15E] text-white rounded-full' />
              <p className='w-full text-center text-2xl font-semibold'>
              Robiul Awal added as staff!
              </p>
              <p className='w-full text-center text-gray-500'>
              Your new team count is 2. You can add Robiul Awal to books of this business
              </p>
          </div>
          <div
            className='px-6 py-4 flex justify-end space-x-5 border-t'
          >
            <button
              className='px-8 py-3 flex items-center space-x-5 bg-[#4863D4] text-white rounded'

            >
              <ImUsers />
              <span>Add more member</span>
            </button>
            <button
              className='px-8 py-3 flex items-center space-x-5 bg-[#4863D4] text-white rounded'

            >
              <AiFillBook />
              <span>Add to  book</span>
            </button>
          </div>
        </ModalContent>
      </Modal>
    </>
  )
}
