import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay
} from '@chakra-ui/react';
import moment from 'moment';
import React, { useState } from 'react';
import { MdDeleteOutline } from "react-icons/md";
import { RxCross2, RxDotFilled } from "react-icons/rx";
import { TiInfo } from "react-icons/ti";
import { useDispatch, useSelector } from 'react-redux';
import { deleteEntry } from '../../libs/allEntryAction';
import { removeEntry } from '../../store/slice/bookSlice';

export default function Business_TeamMemberLeave({ id, view, setView }) {
  const { entries } = useSelector(state => state.book)
  const entry = entries.find(e => e._id === id)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const date = moment(entry?.createdAt).format('DD MMM YYYY')
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
            <p className='text-xl'>Leave Business</p>
            <button
              onClick={() => setView(!view)}
              className='px-4 py-1 border rounded'
            >X</button>
          </div>
          <ModalBody py={3} className='space-y-3'>
            <div
              className='space-y-3'
            >
              <p>Are you sure ? </p>
              <p
                className='flex items-center space-x-2'
              >
                <RxDotFilled size={25} className='text-gray-500' />
                <span>You will lose access to this business</span>
              </p>
              <p
                className='flex items-center space-x-2'
              >
                <span>
                <RxDotFilled size={25} className='text-gray-500' />
                </span>
                <span>We will also notify the business owner & other members that you have left the business.</span>
              </p>
            </div>
          </ModalBody>

          <ModalFooter
            className='border-t space-x-5'
          >

            <button
              onClick={(e) => setView(!view)}
              className='px-6 py-3 border bg-[#4863D4] text-white rounded'

            >
              <span>Cancel</span>
            </button>

            <button
              onClick={(e) => deleteEntry({
                id,
                action: removeEntry,
                dispatch,
                setLoading,
                setView
              })}
              className='px-6 py-3 border bg-[#C93B3B] text-white rounded'

            >
              <span>{loading ? 'Leaveing...' : 'Leave'}</span>
            </button>

          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
