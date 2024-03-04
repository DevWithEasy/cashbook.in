import {
  Modal,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { RxDotFilled } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux'
import { notificationNOT, notificationOK } from '../../utils/toastNotification';
import axios from 'axios'
import { addCurrentBusiness, updateBusiness } from '../../store/slice/bookSlice';
import api from '../../utils/api';
import socket from '../../utils/socket';

export default function Business_RoleChange_Confirm({ member, view, setView, setFirstView }) {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)
  const { currentBusiness } = useSelector(state => state.book)
  const [loading, setLoading] = useState(false)

  const handleRoleChange = async () => {
    setLoading(true)
    try {
      const res = await axios.post(`${api}/business/member-role-change`, {
        b_id: currentBusiness._id,
        t_id: member._id,
        role: member?.role === 'Staff' ? 'Partner' : 'Staff'
      },
        {
          headers: {
            "cb-access-token": localStorage.getItem("cb_access_token")
          }
        }
      )
      if(res.data.success){
        setLoading(false)
        dispatch(updateBusiness(res.data.data))
        dispatch(addCurrentBusiness(res.data.data))
        notificationOK(res.data.message)
        setView(false)
        setFirstView(false)
        socket.emit('update_business',{business : res.data.data})
      }
    } catch (error) {
      setLoading(false)
      console.log(error)
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
        <ModalContent>
          <div
            className='px-6 py-4 flex justify-between items-center border-b'
          >
            <p className='text-xl'>Change Robiul Awal’s Role to Staff?</p>
            <button
              onClick={() => setView(!view)}
              className='px-4 py-1 border rounded'
            >X</button>
          </div>

          {member?.role === 'Partner' ?
            <div
              className='p-6 pb-10 space-y-3'
            >
              <p>Are you sure?</p>
              <p
                className='flex items-center space-x-2'
              >
                <RxDotFilled size={25} className='text-gray-500' />
                <span>{user?.name} will get access to all the books of this business </span>
              </p>
              <p
                className='flex items-center space-x-2'
              >
                <RxDotFilled size={25} className='text-gray-500' />
                <span>They will get full access to book & business settings</span>
              </p>
            </div>
            :
            <div
              className='p-6 pb-10 space-y-3'
            >
              <p>Are you sure?</p>
              <p
                className='flex items-center space-x-2'
              >
                <RxDotFilled size={25} className='text-gray-500' />
                <span>{user?.name} will be made ‘Admin’ in all books</span>
              </p>
              <p
                className='flex items-center space-x-2'
              >
                <RxDotFilled size={25} className='text-gray-500' />
                <span>You can remove them from few books or change their role
                </span>
              </p>
            </div>

          }
          <div
            className='px-6 py-4 flex justify-end space-x-5 border-t'
          >
            <button
              onClick={(e) => setView(!view)}
              className='px-8 py-3 text-[#4863D4] border rounded'

            >
              Cancel
            </button>

            <button
              onClick={handleRoleChange}
              className={`px-8 py-3 border rounded bg-[#4863D4] text-white`}

            >
              {loading ? 'Changing...' : 'Change'}
            </button>
          </div>
        </ModalContent>
      </Modal>
    </>
  )
}
