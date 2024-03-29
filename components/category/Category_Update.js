import {
  Modal,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateData } from '../../libs/API_CCP_Crud';
import { refresh, updateCCP } from '../../store/slice/bookSlice';
import handleInput from '../../utils/handleInput';

const Category_Update = ({ id, view, setView }) => {
  const {ccp} = useSelector(state => state.book)
  const [loading, setLoading] = useState(false)
  const [value, setValue] = useState(ccp.find(c => c._id === id))
  const dispatch = useDispatch()
  return (
    <>

      <Modal
        isOpen={view}
        size='xl'
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <div
            className='px-6 py-4 flex justify-between items-center border-b'
          >
            <p className='text-xl'>Update Category</p>
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
              name='name'
              value={value?.name}
              onChange={(e) => handleInput(e,value,setValue)}
              className='w-full px-4 py-2 rounded border focus:outline-[#4863D4]'
              autoFocus={true}
            />
          </div>
          <div
            className='px-6 py-4 flex justify-end border-t'
          >
            <button
              onClick={(e) => updateData(
                {
                  url : `category/${id}`,
                  value,
                  action : updateCCP,
                  dispatch,
                  setLoading,
                  refresh,
                  setView
                }
              )}
              className='px-8 py-3 bg-[#4863D4] text-white rounded'

            >
              {loading ? 'Saving...' : 'Save Change'}
            </button>
          </div>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Category_Update;