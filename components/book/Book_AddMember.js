import {
    Drawer,
    DrawerContent,
    DrawerOverlay
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { MdOutlineInfo } from "react-icons/md"
import { useSelector } from 'react-redux'
import BusinessManager from '../../utils/BusinessManager'
import { notificationNOT, notificationOK } from '../../utils/toastNotification'
import { Book_AddMember_AddButton, Book_AddMember_Header, Book_AddMember_Member, Book_AddMember_Role, Book_AddMember_Search, Book_AddMember_Selected, Business_AddTeamMember } from '../Index'
import axios from 'axios'

const Book_AddMember = ({ view, setView }) => {
    const { books, businesses, currentBusiness, currentBook } = useSelector(state => state.book)
    const { user } = useSelector(state => state.auth)
    const [addView, setAddView] = useState(false)
    const [nextStep, setNextStep] = useState(false)
    const [active, setActive] = useState('Data Operator')
    const [selected, setSelected] = useState({})
    const [loading, setLoading] = useState(false)

    const businessManager = new BusinessManager(user, books, businesses, currentBusiness)

    const addBookMember = async () => {
        setLoading(true)
        try {
            const res = await axios.post(`/api/book/member/add`, {
                role : active,
                member: selected?.user?._id,
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
                        <Book_AddMember_Header {...{
                            view, setView, nextStep
                        }} />

                        <div
                            className='h-[calc(100vh-224px)] p-6 overflow-y-auto'
                        >
                            {!nextStep ?
                                <div
                                    className='space-y-5'
                                >
                                    <Book_AddMember_Search />

                                    <Book_AddMember_AddButton {...{ addView, setAddView }} />

                                    <div
                                        className='space-y-3'
                                    >
                                        <p className='text-slate-700'>Members of book</p>

                                        <div>
                                            {
                                                businessManager.getStaffs().length === 0 ?
                                                    <p className='text-gray-500 text-sm'>
                                                        There are no staff members in business!
                                                    </p>
                                                    :
                                                    <div>
                                                        {
                                                            businessManager.getStaffs().map((member, i) =>
                                                                <Book_AddMember_Member
                                                                    key={i}
                                                                    {...{
                                                                        member, nextStep, setNextStep, setSelected
                                                                    }}
                                                                />
                                                            )
                                                        }
                                                    </div>
                                            }

                                        </div>
                                    </div>
                                </div>
                                :
                                <div
                                    className='space-y-5'
                                >
                                    <Book_AddMember_Selected {...{ selected }} />

                                    <Book_AddMember_Role {...{ active, setActive }} />
                                    <p
                                        className='flex items-center space-x-3 text-sm text-gray-500'
                                    >
                                        <MdOutlineInfo />
                                        <span>You can change this role later</span>
                                    </p>
                                </div>
                            }
                        </div>

                        {nextStep &&
                            <div
                                className='h-20 p-6 flex justify-end items-center border-t'
                            >
                                <button
                                    onClick={addBookMember}
                                    className='flex items-center space-x-2  px-8 py-3 border bg-[#4863D4] text-white rounded'

                                >
                                    <AiOutlinePlus />
                                    {loading ?
                                        <span>Addeding...</span>
                                        :
                                        <span>
                                            ADD
                                        </span>
                                    }
                                </button>
                            </div>
                        }

                    </div>


                    {view &&
                        <Business_AddTeamMember {...{
                            view: addView,
                            setView: setAddView
                        }} />
                    }
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default Book_AddMember;