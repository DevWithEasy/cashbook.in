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
import { RxCross2 } from "react-icons/rx";
import { TiInfo } from "react-icons/ti";
import { useDispatch, useSelector } from 'react-redux';
import { deleteEntry, deleteEntryMany } from '../../libs/allEntryAction';
import { removeEntry } from '../../store/slice/bookSlice';

export default function Entry_Delete({items, view, setView }) {
  const {entries,currentBook} = useSelector(state=>state.book)
  const entry = entries.find(e=>e._id === items[0])
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
            <p className='text-xl'>Delete Entry</p>
            <button
              onClick={() => setView(!view)}
              className='px-4 py-1 border rounded'
            >X</button>
          </div>
          <ModalBody py={3} className='space-y-3'>
            <div
              className='p-4 flex items-center space-x-3 bg-[#F8EFE7] text-sm text-[#bd610d] border border-[#bd610d] rounded'
            >
              <TiInfo size={30}/>
              <div>
                <p>Once deleted, this entry cannot be restored.</p>
                <p>Are you sure you want to Delete ?</p>
              </div>
            </div>
            <div
              className='space-y-1'
            >
              <p className='text-sm'>Review Details</p>
              <div
                className='p-4 space-y-3 border rounded text-sm'
              >
                <div
                  className='flex space-x-4'
                >
                  <div>
                  <p className='text-gray-500'>Type</p>
                  <p>{entry?.entryType === 'cash_in' ? 'Cash In' : 'Cash Out'}</p>
                </div>
                <div>
                  <p className='text-gray-500'>Amount</p>
                  <p>{entry?.amount}</p>
                </div>
                <div>
                  <p className='text-gray-500'>Date</p>
                  <p>{date}</p>
                </div>
                </div>
                <div>
                  <p className='text-gray-500'>Remark</p>
                  <p>{entry?.remark}</p>
                </div>
              </div>
            </div>
            <div>
              <p>Are you sure?</p>
              <p>You want to delete 2 entries from ‘{currentBook?.name}’</p>
            </div>
          </ModalBody>

          <ModalFooter
            className='border-t space-x-5'
          >
            <button
              onClick={(e) => deleteEntryMany({
                to : currentBook._id,
                items,
                action : removeEntry,
                dispatch,
                setLoading,
                setView
              })}
              className='flex items-center space-x-2 px-6 py-3 border text-red-500 rounded'

            >
              <MdDeleteOutline size={18}/>
              <span>{loading ? 'Deleting...' : 'Yes, Delete'}</span>
            </button>

            <button
              onClick={(e) => setView(!view)}
              className='flex items-center space-x-2  px-6 py-3 border bg-[#4863D4] text-white rounded'

            >
              <RxCross2 size={18}/>
              <span>Cancel</span>
            </button>
            
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
