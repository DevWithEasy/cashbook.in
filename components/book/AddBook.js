import { useDispatch, useSelector } from 'react-redux';
import { createBook } from '../../libs/allBookAction';
import { addBook } from '../../store/slice/bookSlice';
import React, { useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Spinner,
} from '@chakra-ui/react'

export default function AddBook({ view, setView }) {
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
          <ModalBody pb={10} >
            <FormControl>
              <FormLabel>Book name</FormLabel>
              <Input placeholder='Daily Expense' onChange={(e) => setName(e.target.value)} />
            </FormControl>
          </ModalBody>

          <ModalFooter
            className='border-t'
          >
            <button
              onClick={(e) => createBook(name, setLoading, dispatch, addBook, setView)}
              className='px-6 py-2 bg-[#4863D4] text-white rounded'

            >
              {loading ? <Spinner /> : 'Save'}
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
