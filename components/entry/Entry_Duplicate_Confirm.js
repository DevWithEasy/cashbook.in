import {
  Modal,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { RxDotFilled } from 'react-icons/rx';
import { copyEntry } from '../../libs/allEntryAction';

export default function Entry_Duplicate_Confirm({items,book, view, setView,setFirstView,setConfirmView }) {
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
            <p className='text-xl'>Copy & Paste {items?.length} Entry</p>
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
              <span>Same entry will get added in <b>`{book?.name}`</b></span>
            </p>
            <p
              className='flex items-center space-x-2'
            >
              <RxDotFilled size={25} className='text-gray-500'/>
              <span>This will change the net balance of <b>`{book?.name}`</b></span>
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
              onClick={(e) => copyEntry(
                {
                  to : book._id,
                  value : items,
                  setLoading,
                  setView,
                  setFirstView,
                  setConfirmView
                }
              )}
              className={`px-8 py-3 border rounded bg-[#4863D4] text-white`}

            >
              {loading ? 'Copying...' : 'Yes, Copy & Paste'}
            </button>
          </div>
        </ModalContent>
      </Modal>
    </>
  )
}
