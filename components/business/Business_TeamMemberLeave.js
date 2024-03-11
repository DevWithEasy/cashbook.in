import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay
} from '@chakra-ui/react'
import axios from 'axios'
import React, { useState } from 'react'
import { RxDotFilled } from "react-icons/rx"
import { useSelector } from 'react-redux'
import api from '../../utils/api'
import { notificationNOT, notificationOK } from '../../utils/toastNotification'
import { useRouter } from 'next/router'
import socket from '../../utils/socket'

export default function Business_TeamMemberLeave({ view, setView }) {
  const { currentBusiness } = useSelector(state => state.book)
  const { user } = useSelector(state => state.auth)
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleLeaveBusiness = async () => {
    setLoading(true)
    try {
      const res = await axios.put(`${api}/business/leave/${currentBusiness._id}/${user._id}`, {}, {
        headers: {
          "cb-access-token": localStorage.getItem("cb_access_token")
        }
      })
      if (res.data.success) {
        setLoading(false)
        notificationOK(res.data.message)
        socket.emit('business_leave', {business : res.data.data})
        router.push('/checking')
      }

    } catch (error) {
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
              onClick={handleLeaveBusiness}
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
