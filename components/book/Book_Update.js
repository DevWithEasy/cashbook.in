import {
  Modal,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/react';
import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { updateBook } from '../../libs/allBookAction';
import { addCurrentBook, refresh, renameBook } from '../../store/slice/bookSlice';
import handleInput from '../../utils/handleInput';

const Book_Update = ({view, setView, isCurrent }) => {
  const { currentBook } = useSelector(state => state.book)
  const [loading, setLoading] = useState(false)
  const [value, setValue] = useState(currentBook)
  const dispatch = useDispatch()
  return (
    <>

      <Modal
        isOpen={view}
        size='xl'
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <div
            className='px-6 py-4 flex justify-between items-center border-b'
          >
            <p className='text-xl'>Update Book</p>
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
              name='name'
              value={value?.name}
              onChange={(e) => handleInput(e, value, setValue)}
              className='w-full px-4 py-2 rounded border focus:outline-[#4863D4]'
              autoFocus={true}
            />
          </div>
          <div
            className='px-6 py-4 flex justify-end border-t'
          >
            <button
              onClick={(e) => updateBook(
                currentBook._id,
                value?.name,
                setLoading,
                dispatch,
                renameBook,
                refresh,
                setView,
                isCurrent,
                addCurrentBook
              )}
              className='px-8 py-3 bg-[#4863D4] text-white rounded'

            >
              {loading ? 'Saving...' : 'Save Change'}
            </button>
          </div>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Book_Update;