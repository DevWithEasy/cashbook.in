import Image from 'next/image';
import React, { useState } from 'react';
import opposite from '../../public/image/opposite.png';

import {
  Modal,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/react';
import { RxDotFilled } from 'react-icons/rx';
import { oppositeEntry } from '../../libs/allEntryAction';

export default function Entry_Opposite_Confirm({ items, book, view, setView, setFirstView, setConfirmView }) {
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
              <p className='text-xl'>Copy {items?.length} Opposite Entry</p>
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
                className='flex space-x-2'
              >
                <RxDotFilled size={25} className='text-gray-500' />
                <span><b>Cash In</b> entries will be added as <b>Cash Out</b> entries in <b>{book?.name} </b>and vice versa</span>
              </p>
              <Image
                src={opposite.src}
                alt=''
                width={507}
                height={164}
              />
              <p
                className='flex space-x-2'
              >
                <RxDotFilled size={25} className='text-gray-500' />
                <span>This will change the net balance of <b>{book?.name}</b></span>
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
                onClick={(e) => oppositeEntry(
                  {
                    to: book._id,
                    value: items,
                    setLoading,
                    setView,
                    setFirstView,
                    setConfirmView
                  }
                )}
                className={`px-8 py-3 border rounded bg-[#4863D4] text-white`}

              >
                {loading ? 'Please Wait' : 'Yes, Copy Opposite'}
              </button>
            </div>
          </div>
        </ModalContent>
      </Modal>
    </>
  )
}
