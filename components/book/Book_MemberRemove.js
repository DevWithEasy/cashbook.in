import {
  Modal,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { MdInfo } from 'react-icons/md';
import { RxDotFilled } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import { addCurrentBook, renameBook } from '../../store/slice/bookSlice';
import axios from 'axios'
import { notificationNOT, notificationOK } from '../../utils/toastNotification';
import api from '../../utils/api';

export default function Book_MemberRemove({ member, view, setView }) {
  const { currentBook } = useSelector(state => state.book)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const removeBookMember = async () => {
    setLoading(true)
    try {
        const res = await axios.post(`${api}/book/member/delete`, {
            member: member?._id,
            book: currentBook._id
        },
            {
                headers: {
                    "cb-access-token": localStorage.getItem("cb_access_token")
                }
            })

        if (res.data.success) {
            setLoading(false)
            notificationOK(res.data.message)
            setView(false)
            dispatch(addCurrentBook(res.data.data))
            dispatch(renameBook(res.data.data))
        }

    } catch (error) {
        console.log(error)
        setLoading(false)
        notificationNOT(error.message)
    }
}
  
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
            <p className='text-xl'>
              Remove {member?.user?.name} from Business Book?
            </p>
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
              <RxDotFilled size={25} className='text-gray-500' />
              <span>{member?.user?.name} will lose access to this book </span>
            </p>
            <p
              className='flex items-center space-x-2'
            >
              <RxDotFilled size={25} className='text-gray-500' />
              <span>We will also notify {member?.user?.name} that they have been removed from this book.</span>
            </p>
            <div
                className='px-4 py-2 flex items-center space-x-3 bg-[#EEEDFA]'
            >
                <p>
                    <MdInfo
                        size={25}
                        className='text-[#4863D4]'
                    />
                </p>
                <p
                    className='text-xs'
                >
                    {member?.user?.name} will still be a part of your business
                </p>
            </div>
          </div>
          <div
            className='px-6 py-4 flex justify-end space-x-5 border-t'
          >
            <button
              onClick={(e) => setView(!view)}
              className='px-8 py-3 text-[#4863D4] border rounded'

            >
              <span>Cancel</span>
            </button>

            <button
              onClick={removeBookMember}
              className={`px-8 py-3  rounded bg-[#C93B3B] text-white`}

            >
              <span>{loading ? 'Removing...' : 'Remove'}</span>
            </button>
          </div>
        </ModalContent>
      </Modal>
    </>
  )
}
