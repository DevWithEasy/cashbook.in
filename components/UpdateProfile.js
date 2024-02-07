import {
  Modal,
  ModalContent,
  ModalOverlay
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { MdOutlineContentCopy, MdOutlineTurnRight } from "react-icons/md";
import { TbPlusMinus } from "react-icons/tb";
import { useDispatch } from 'react-redux';

export default function UpadateProfile({ view, setView }) {
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
            className='h-[450px]'
          >
            <div
              className='h-16 px-6 py-4 flex justify-between items-center border-b'
            >
              <p className='text-xl'>
                Update Profile Details
              </p>
              <button
                onClick={() => setView(!view)}
                className='px-4 py-1 border rounded'
              >X</button>
            </div>
            <div
              className='h-[318px] px-6 py-3 space-y-5 overflow-y-auto'
            >
              <div
                className='space-y-1'
              >
                <label className='text-sm'>Your Name</label>
                <input
                  className='w-full px-4 py-2 border rounded focus:outline-[#4863D4]'
                />
              </div>
              <div
                className='space-y-1'
              >
                <label className='text-sm'>Email</label>
                <input
                  className='w-full px-4 py-2 border rounded focus:outline-[#4863D4]'
                />
              </div>
              <div
                className='space-y-1'
              >
                <label className='text-sm'>Mobile Number</label>
                <input
                  className='w-full px-4 py-2 border rounded focus:outline-[#4863D4]'
                />
              </div>
            </div>
            <div
              className='h-20 px-6 py-4 flex justify-end items-center space-x-5 border-t bg-white rounded-b'
            >
              <button
                onClick={() => setView(!view)}
                className='px-8 py-3 text-[#4894c3] border rounded'
              >
                Cancel
              </button>
              <button
                className='px-8 py-3 bg-[#4863d4] text-white border rounded'
              >
                Save
              </button>
            </div>
          </div>
        </ModalContent>
      </Modal>
    </>
  )
}
