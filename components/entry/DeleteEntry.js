import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { MdDeleteOutline } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { TiInfo } from "react-icons/ti";
import { useDispatch } from 'react-redux';
import { createBook } from '../../libs/allBookAction';
import { addBook } from '../../store/slice/bookSlice';

export default function DeleteEntry({ view, setView }) {
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
            <p className='text-xl'>Delete Entry</p>
            <button
              onClick={() => setView(!view)}
              className='px-4 py-1 border rounded'
            >X</button>
          </div>
          <ModalBody py={3} className='space-y-3'>
            <div
              className='p-4 flex items-center space-x-3 bg-[#F8EFE7] text-sm text-[#bd610d] border border-[#bd610d] rounded'
            >
              <TiInfo size={30}/>
              <div>
                <p>Once deleted, this entry cannot be restored.</p>
                <p>Are you sure you want to Delete ?</p>
              </div>
            </div>
            <div
              className='space-y-1'
            >
              <p className='text-sm'>Review Details</p>
              <div
                className='flex space-x-4 p-4 border rounded'
              >
                <div>
                  <p className='text-gray-500 text-sm'>Type</p>
                  <p>Cash In</p>
                </div>
                <div>
                  <p className='text-gray-500 text-sm'>Amount</p>
                  <p>10000</p>
                </div>
                <div>
                  <p className='text-gray-500 text-sm'>Date</p>
                  <p>22 January 2024</p>
                </div>
              </div>
            </div>
          </ModalBody>

          <ModalFooter
            className='border-t space-x-5'
          >
            <button
              onClick={(e) => createBook(name, setLoading, dispatch, addBook, setView)}
              className='flex items-center space-x-2 px-6 py-3 border text-red-500 rounded'

            >
              <MdDeleteOutline/>
              <span>Yes, Delete</span>
            </button>

            <button
              onClick={(e) => createBook(name, setLoading, dispatch, addBook, setView)}
              className='flex items-center space-x-2  px-6 py-3 border bg-[#4863D4] text-white rounded'

            >
              <RxCross2/>
              <span>Cancel</span>
            </button>
            
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
