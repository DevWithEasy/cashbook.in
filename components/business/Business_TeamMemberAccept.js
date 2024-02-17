import { useDispatch, useSelector } from 'react-redux';
import { createBook } from '../../libs/allBookAction';
import { addBook, refresh } from '../../store/slice/bookSlice';
import React, { useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
} from '@chakra-ui/react'
import axios from 'axios'

export default function Business_TeamMemberAccept({ params, view, setView }) {
  const [code, setCode] = useState("")
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const handleVerify = async () => {
    
    const mail = localStorage.getItem('cb_email') || params.email
    setLoading(!loading)
    try {
        const res = await axios.post(`/api/user/invitation_accept?email=${mail}&otp=${otp}`,params)

        if (res.data.success) {

            // const { message, data } = res.data

            setLoading(!loading)
            // dispatch(login(data))

            // localStorage.setItem('cb_access_token', res.data.token)

            // localStorage.removeItem('cb_email')

            // notificationOK(message)

        }
    } catch (error) {
        console.log(error)
        setLoading(!loading)
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
            <p className='text-xl'>Accept Invitation and Create New Account</p>
            <button
              onClick={() => setView(!view)}
              className='px-4 py-1 border rounded'
            >X</button>
          </div>
          <div
            className='px-6 pt-3 pb-10 space-y-3'
          >
            <p>
              We sent a verifation code to your email <b>{params?.email}</b>
            </p>
            <div
              className='space-y-1'
            >
              <label className='text-sm text-gray-500'>Code</label>
              <input
                type='number'
                onChange={(e) => setCode(e.target.value)}
                className='w-full px-4 py-2 rounded border focus:outline-[#4863D4]'
                autoFocus={true}
              />
            </div>
          </div>
          <div
            className='px-6 py-4 flex justify-end border-t'
          >
            <button
              onClick={handleVerify}
              className={`px-8 py-3 text-white rounded ${code.length === 6 ? 'bg-[#4863D4]' : 'bg-[#4863D4]/50 cursor-not-allowed'}`}
              disabled ={code.length === 6 ? false : true}

            >
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </ModalContent>
      </Modal>
    </>
  )
}