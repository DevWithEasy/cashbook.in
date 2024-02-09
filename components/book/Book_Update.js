import {
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Spinner
} from '@chakra-ui/react';
import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { updateBook } from '../../libs/allBookAction';
import { renameBook } from '../../store/slice/bookSlice';

const Book_Update = ({ id, view, setView }) => {
  const book = useSelector(state => state.book.currentBook)
  const [loading, setLoading] = useState(false)
  const [value, setValue] = useState(book?.name)
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
            <p className='text-xl'>Update Book Name</p>
            <button
              onClick={() => setView(!view)}
              className='px-4 py-1 border rounded'
            >X</button>
          </div>
          <ModalBody pb={10}>
            <FormControl>
              <label htmlFor="">Book name</label>
              <Input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
            </FormControl>
          </ModalBody>

          <ModalFooter
            className='border-t'
          >
            <button
              onClick={(e) => updateBook(book._id, value, setLoading, dispatch, renameBook, setView)}
              className='px-8 py-3 bg-[#4863D4] text-white rounded'
            >
              {loading ? <Spinner /> : 'Update'}
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Book_Update;