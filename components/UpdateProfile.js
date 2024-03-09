import {
  Modal,
  ModalContent,
  ModalOverlay
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import handleInput from '../utils/handleInput';
import axios from 'axios'
import api from '../utils/api';
import { notificationNOT, notificationOK } from '../utils/toastNotification';
import { login } from '../store/slice/authSlice';

export default function UpadateProfile({ view, setView }) {
  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const [value, setValue] = useState(user)
  const [loading, setLoading] = useState(false)

  const handleUpdate = async () => {
    try {
      setLoading(true)
      const res = await axios.put(`${api}/user/update`, value, {
        headers: {
          "cb-access-token": localStorage.getItem("cb_access_token")
        }
      })
      
      if (res.data.success) {
        notificationOK(res.data.message)
        dispatch(login(res.data.data))
        setLoading(false)
        setView(false)
      }
    } catch (error) {
      console.log(error)
      notificationNOT()
      setLoading(false)
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
                  name='name'
                  value={value?.name}
                  onChange={(e) => handleInput(e, value, setValue)}
                  className='w-full px-4 py-2 border rounded focus:outline-[#4863D4]'
                />
              </div>
              <div
                className='space-y-1'
              >
                <label className='text-sm'>Email</label>
                <input
                  name='email'
                  value={value?.email}
                  onChange={(e) => handleInput(e, value, setValue)}
                  className='w-full px-4 py-2 border rounded focus:outline-[#4863D4]'
                />
              </div>
              <div
                className='space-y-1'
              >
                <label className='text-sm'>Mobile Number</label>
                <input
                  name='number'
                  value={value?.number}
                  onChange={(e) => handleInput(e, value, setValue)}
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
                onClick={handleUpdate}
                className='px-8 py-3 bg-[#4863d4] text-white border rounded'
              >
                {loading ? "Saving..." : "Save Change"}
              </button>
            </div>
          </div>
        </ModalContent>
      </Modal>
    </>
  )
}
