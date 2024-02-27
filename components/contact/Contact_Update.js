import {
  Modal,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateData } from '../../libs/API_CCP_Crud';
import { refresh, updateCCP } from '../../store/slice/bookSlice';

const Contact_Update = ({ id, view, setView }) => {
  const { ccp } = useSelector(state => state.book)
  const contact = ccp.find(c => c._id === id)
  const dispatch = useDispatch()
  const [name, setName] = useState(contact?.name)
  const [phone, setPhone] = useState(contact?.phone)
  const [type, setType] = useState(contact?.type)
  const [loading, setLoading] = useState(false)

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
            <p className='text-xl'>Update Contact</p>
            <button
              onClick={() => setView(!view)}
              className='px-4 py-1 border rounded'
            >X</button>
          </div>

          <div className="px-6 pt-3 pb-10 space-y-5">
            <div className="space-y-1">
              <label className="text-sm text-gray-500">Contact name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 rounded border focus:outline-[#4863D4]"
                autoFocus={true}
              />
            </div>
            <div className="space-y-1">
              <label className="block text-sm text-gray-500">
                Mobile Number (Optional){" "}
              </label>
              <select className="mr-2 px-4 py-2 border rounded focus:outline-[#4863D4]">
                <option>BD</option>
              </select>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="px-4 py-2 rounded border focus:outline-[#4863D4]"
              />
            </div>
            <div
              className="space-y-1"
            >
              <label className="block text-sm text-gray-500">
                Contact Type
              </label>
              <div
                className="space-x-2"
              >
                <button
                  onClick={() => setType("Customer")}
                  className={`px-6 py-1 border rounded-full ${type === "Customer" && "bg-[#EBEEFD] text-[#4863D4]"
                    }`}
                >
                  Customer
                </button>
                <button
                  onClick={() => setType("Supplier")}
                  className={`px-6 py-1 border rounded-full ${type === "Supplier" && "bg-[#EBEEFD] text-[#4863D4]"
                    }`}
                >
                  Supplier
                </button>
              </div>
            </div>
          </div>

          <div
            className='px-6 py-4 flex justify-end border-t'
          >
            <button
              onClick={(e) => updateData(
                {
                  url: `contact/${id}`,
                  value: { name, phone, type },
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

export default Contact_Update;