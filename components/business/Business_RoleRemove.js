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
import { useRouter } from 'next/router';

export default function Business_RoleRemove({ member, view, setView }) {
  const router = useRouter()
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)
  const { currentBusiness } = useSelector(state => state.book)
  const [loading, setLoading] = useState(false)

  const handleRoleRemove = async () => {
    setLoading(true)
    try {
      const res = await axios.post(`${api}/business/member-remove`, {
        b_id: currentBusiness._id,
        t_id: member._id
      },
        {
          headers: {
            "cb-access-token": localStorage.getItem("cb_access_token")
          }
        }
      )
      if (res.data.success) {
        setLoading(false)
        dispatch(updateBusiness(res.data.data))
        dispatch(addCurrentBusiness(res.data.data))
        router.push(`/business/${currentBusiness._id}/business-settings/team`)
        notificationOK(res.data.message)
        setView(false)
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
            <p className='text-xl'>Remove {member?.user?.name}?</p>
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
              <span>{member?.user?.name} will lose access to this business & it’s books </span>
            </p>
            <p
              className='flex items-center space-x-2'
            >
              <RxDotFilled size={25} className='text-gray-500' />
              <span>We will also notify {member?.user?.name} that they have been removed from this business.</span>
            </p>
          </div>
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
              onClick={handleRoleRemove}
              className={`px-8 py-3 border rounded bg-[#C93B3B] text-white`}

            >
              {loading ? 'Removing...' : 'Remove'}
            </button>
          </div>
        </ModalContent>
      </Modal>
    </>
  )
}
