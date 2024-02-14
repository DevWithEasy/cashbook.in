import {
  Modal,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { RxDotFilled } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import { moveEntry } from '../../libs/allEntryAction';
import { removeEntry } from '../../store/slice/bookSlice';

export default function Entry_Move_Confirm({items,book, view, setView,setFirstView,setConfirmView }) {
  const { currentBook } = useSelector(state => state.book)
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
        <ModalContent>
          <div
            className='px-6 py-4 flex justify-between items-center border-b'
          >
            <p className='text-xl'>Move {items?.length} Entry</p>
            <button
              onClick={() => setView(!view)}
              className='px-4 py-1 border rounded'
            >X</button>
          </div>

          <div
            className='p-6 pb-10 space-y-3'
          >
            <p>Are you sure?</p>
            <p
              className='flex items-center space-x-2'
            >
              <RxDotFilled size={25} className='text-gray-500'/>
              <span>Entry will get deleted from current book and added in <b>{book?.name}</b></span>
            </p>
            <p
              className='flex items-center space-x-2'
            >
              <RxDotFilled size={25} className='text-gray-500'/>
              <span>This will change the net balance of both books</span>
            </p>
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
              onClick={(e) => moveEntry(
                {
                  to : book._id,
                  value : items,
                  action : removeEntry,
                  dispatch,
                  setLoading,
                  setView,
                  setFirstView,
                  setConfirmView
                }
              )}
              className={`px-8 py-3 border rounded bg-[#4863D4] text-white`}

            >
              {loading ? 'Moving...' : 'Yes, Move'}
            </button>
          </div>
        </ModalContent>
      </Modal>
    </>
  )
}
