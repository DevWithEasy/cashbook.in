import { useDispatch, useSelector } from 'react-redux';
import { createBook } from '../libs/allBookAction';
import { addBook } from '../store/slice/bookSlice';
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

      >
        <ModalOverlay />
        <ModalContent className='mx-2'>
          <ModalHeader>
            Create new book
          </ModalHeader>
          <ModalCloseButton 
            onClick={() => setView(!view)} 
          />
          <ModalBody pb={6} >
            <FormControl>
              <FormLabel>Book name</FormLabel>
              <Input placeholder='Daily Expense' onChange={(e) => setName(e.target.value)} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={() => setView(!view)} mr={3}>Cancel</Button>
            <Button
              onClick={(e) => createBook(name, setLoading, dispatch, addBook, setView)}
              colorScheme='blue'

            >
              {loading ? <Spinner /> : 'Save'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
