import {
  Modal,
  ModalContent,
  ModalOverlay
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createData } from '../../libs/API_CCP_Crud';
import { addCCP, refresh } from '../../store/slice/bookSlice';

export default function Category_Add({ view, setView }) {
  const { currentBook } = useSelector(state => state.book)
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
            <p className='text-xl'>Add New Category</p>
            <button
              onClick={() => setView(!view)}
              className='px-4 py-1 border rounded'
            >X</button>
          </div>

          <div
            className='px-6 pt-3 pb-10 space-y-1'
          >
            <label className='text-sm text-gray-500'>Category name</label>
            <input
              placeholder='e.g - Salary, EMI, Travel, Food'
              onChange={(e) => setName(e.target.value)}
              className='w-full px-4 py-2 rounded border focus:outline-[#4863D4]'
              autoFocus={true}
            />
          </div>
          <div
            className='px-6 py-4 flex justify-end border-t'
          >
            <button
              onClick={(e) => createData({
                url : `category/${currentBook._id}`,
                value : {
                  name
                },
                action : addCCP,
                dispatch,
                setLoading,
                refresh,
                setView
              })}
              className='px-8 py-3 bg-[#4863D4] text-white rounded'

            >
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </ModalContent>
      </Modal>
    </>
  )
}
