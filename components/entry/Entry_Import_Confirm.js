import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { importEntry } from '../../libs/allEntryAction';
import { addEntry } from '../../store/slice/bookSlice';

export default function Entry_Import_Confirm({entries,view, setView }) {
  const {currentBook} = useSelector(state=>state.book)
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
            <p className='text-xl'>Confirm Import Entries</p>
            <button
              onClick={() => setView(!view)}
              className='px-4 py-1 border rounded'
            >X</button>
          </div>
          <ModalBody py={3} className='space-y-3'>
            <div
              className='space-y-2'
            >
              <p>Total Entries : <b>{entries?.length}</b></p>
              <p>Book Name : <b>{currentBook?.name}. </b></p>
              <p className='px-2 py-1 inline-block border border-red-500 text-red-500 rounded-md'>All book member availabe this entries.</p>
            </div>
          </ModalBody>

          <ModalFooter
            className='border-t space-x-5'
          >
            <button
              onClick={(e) => setView(!view)}
              className='px-6 py-3 border text-[#4863D4] rounded-md'

            >
              Cancel
            </button>

            <button
              onClick={(e) => importEntry({
                book : currentBook._id,
                entries,
                setLoading,
                setView
              })}
              className='px-6 py-3 border border-[#4863D4] bg-[#4863D4] text-white rounded-md'

            >
              {loading ? 'Processing...' : 'Confirm'}
            </button>
            
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
