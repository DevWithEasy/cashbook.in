import {
    Drawer,
    DrawerContent,
    DrawerOverlay
} from '@chakra-ui/react'
import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addCurrentBook, renameBook } from '../../store/slice/bookSlice'
import api from '../../utils/api'
import { notificationNOT, notificationOK } from '../../utils/toastNotification'
import { Book_AddMember_Role } from '../Index'
import socket from '../../utils/socket'

const Book_MemberRoleChange = ({ member, view, setView }) => {
    const dispatch = useDispatch()
    const { currentBook } = useSelector(state => state.book)
    const [active, setActive] = useState(member?.role)
    const [loading, setLoading] = useState(false)

    const updateBookMember = async () => {
        setLoading(true)
        try {
            const res = await axios.post(`${api}/book/member/update`, {
                role : active,
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
                socket.emit('update_book',{book : res.data.data})
            }

        } catch (error) {
            console.log(error)
            setLoading(false)
            notificationNOT(error.message)
        }
    }

    return (
        <>
            <Drawer
                isOpen={view}
                placement='right'
                size='md'
            >
                <DrawerOverlay />
                <DrawerContent>
                    <div
                        className='h-screen'
                    >
                        <div
                            className='h-28'
                        >
                            <div
                                className='px-6 py-4 flex justify-between items-center'
                            >
                                <p className='text-xl'>
                                    Change {member?.user?.name}' Role
                                </p>
                                <button
                                    onClick={() => setView(!view)}
                                    className='px-4 py-1 border rounded'
                                >X</button>
                            </div>
                            <div
                                className='px-6 py-2 flex items-center space-x-3 bg-gray-200 text-sm'
                            >
                                <p
                                    className='text-gray-500'
                                >
                                    Book: 
                                </p>
                                <p
                                    className='font-semibold'
                                >
                                    {currentBook?.name}
                                </p>
                            </div>
                        </div>

                        <div
                            className='h-[calc(100vh-192px)] p-6 overflow-y-auto'
                        >
                            <Book_AddMember_Role {...{ active, setActive }} />
                        </div>

                        <div
                                className='h-20 p-6 flex justify-end items-center border-t'
                            >
                                <button
                                    onClick={updateBookMember}
                                    className='flex items-center space-x-2  px-8 py-3 border bg-[#4863D4] text-white rounded'

                                >
                                    {loading ?
                                        <span>Updating...</span>
                                        :
                                        <span>
                                            Update
                                        </span>
                                    }
                                </button>
                            </div>

                    </div>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default Book_MemberRoleChange;