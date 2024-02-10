import { useDispatch, useSelector } from 'react-redux';
import { createBook } from '../../libs/allBookAction';
import { addBook, refresh } from '../../store/slice/bookSlice';
import React, { useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  Spinner,
} from '@chakra-ui/react'

export default function Category_Add({ view, setView }) {
  const { currentBook } = useSelector(state => state.book)
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
            <p className='text-xl'>Add New Book</p>
            <button
              onClick={() => setView(!view)}
              className='px-4 py-1 border rounded'
            >X</button>
          </div>

          <div
            className='px-6 pt-3 pb-10 space-y-1'
          >
            <label className='text-sm text-gray-500'>Book name</label>
            <input
              placeholder='Daily Expense'
              onChange={(e) => setName(e.target.value)}
              className='w-full px-4 py-2 rounded border focus:outline-[#4863D4]'
              autoFocus={true}
            />
          </div>
          <div
            className='px-6 py-4 flex justify-end border-t'
          >
            <button
              onClick={(e) => createBook(
                currentBook?._id,
                name,
                setLoading,
                dispatch,
                addBook,
                refresh,
                setView
              )}
              className='px-8 py-3 bg-[#4863D4] text-white rounded'

            >
              {loading ? <Spinner /> : 'Save'}
            </button>
          </div>
        </ModalContent>
      </Modal>
    </>
  )
}
