import {
    Drawer,
    DrawerContent,
    DrawerOverlay
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { IoMdArrowBack } from "react-icons/io";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { MdCancel } from "react-icons/md";
import axios from 'axios'
import Business_AddMemberSuccess from './Business_AddMemberSuccess';
import {useSelector} from 'react-redux'
import { notificationNOT, notificationOK } from '../../utils/toastNotification';


const Business_AddTeamMember = ({ view, setView }) => {
    const {currentBusiness} = useSelector(state=>state.book)
    const [nextStep, setNextStep] = useState(false)
    const [emailView, setEmailView] = useState(false)
    const [active, setActive] = useState('staff')
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [isUser, setIsUser] = useState(false)
    const [user, setUser] = useState({})
    const [success, setSuccess] = useState(false)

    const partnerTopics = [
        {
            title: 'Permissions',
            roles: [
                'Full access to all books of this business',
                'Full access to business settings',
                'Add/remove members in business'
            ]
        },
        {
            title: 'Restrictions',
            roles: [
                'Can’t delete business',
                'Can’t remove owner from business'
            ]
        }
    ]
    const stuffTopics = [
        {
            title: 'Permissions',
            roles: [
                'Limited access to selected book',
                'Owner/Partner can assign Admin, Viewer or Operator role to staff in any book'
            ]
        },
        {
            title: 'Restrictions',
            roles: [
                'No access to books they are not part of',
                'No access to business settings',
                'No option to delete books'
            ]
        }
    ]

    const handleVerify = async () => {
        setLoading(true)
        try {
            const res = await axios.post(`/api/business/member-verify?email=${email}`, {}, {
                headers: {
                    "cb-access-token": localStorage.getItem("cb_access_token")
                }
            })

            if (res.data.success) {
                setIsUser(res.data.find)
                setNextStep(true)
                setUser(res.data.data)
                setLoading(false)
            }
        } catch (error) {
            setLoading(false)
        }
    }

    const addMemberConfirm = async () => {
        setLoading(true)
        try {
            const res = await axios.post(`/api/business/member-confirm?email=${email}&role=${active}&business=${currentBusiness._id}`, {}, {
                headers: {
                    "cb-access-token": localStorage.getItem("cb_access_token")
                }
            })

            if (res.data.success) {
                setLoading(false)
                notificationOK(res.data.message)
                setView(false)
            }

            if (!res.data.invite) {
                setSuccess(true)
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
                        className='h-16 border-b'
                    >
                        <div
                            className='px-6 py-4 flex justify-between items-center'
                        >
                            <div>
                                {!nextStep ?
                                    <p className='text-xl'>
                                        Add Team Member
                                    </p>
                                    :
                                    <p className='text-xl flex items-center space-x-3'>
                                        <IoMdArrowBack
                                            size={25}
                                            onClick={(e) => setNextStep(!nextStep)}
                                            className='cursor-pointer'
                                        />
                                        <span>
                                            Choose Role & Add
                                        </span>
                                    </p>
                                }
                            </div>
                            <button
                                onClick={() => setView(!view)}
                                className='px-4 py-1 border rounded'
                            >X</button>
                        </div>
                    </div>
                    <div
                        className='h-[calc(100vh-144px)] p-6 space-y-5 overflow-y-auto'
                    >
                        {!nextStep ?
                            <div
                                className=''
                            >
                                {emailView ?
                                    <div
                                        className='space-y-6'
                                    >
                                        <div
                                            className='pb-3 space-x-2'
                                        >
                                            <select
                                                className='px-4 py-2 border rounded focus:outline-[#4863D4]'
                                            >
                                                <option>BD</option>
                                            </select>
                                            <input
                                                placeholder='eg- 1717652515'
                                                className='px-4 py-2 rounded border focus:outline-[#4863D4]'
                                            />
                                        </div>
                                        <div
                                            className=' flex justify-center items-center border-t'
                                        >
                                            <span className='px-2 py-1 -mt-5 inline-block bg-white'>OR</span>
                                        </div>
                                        <div
                                            className='flex justify-center'
                                        >
                                            <button
                                                onClick={() => setEmailView(!emailView)}
                                                className='px-6 py-3 text-[#4863D4] border rounded hover:border-[#4863D4]'
                                            >
                                                Add Email
                                            </button>
                                        </div>
                                    </div>
                                    :
                                    <div
                                        className='space-y-1'
                                    >
                                        <label className='block text-sm'>Add Email</label>
                                        <input
                                            type='email'
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder='eg - xyz123@gmail.com'
                                            className='w-full px-4 py-2 border rounded focus:outline-[#4863D4]'
                                        />
                                    </div>
                                }
                            </div>
                            :
                            <div
                                className='space-y-5'
                            >
                                <p>
                                    {isUser ?
                                        `${user?.name} is already using CashBook app. Choose their role in this business and add`
                                        :
                                        `${email} is a new user. Send invite to ${email} to join this business`
                                    }
                                </p>
                                <div
                                    className='p-4 flex justify-between items-center space-x-2 border rounded'
                                >
                                    <div
                                        className='h-10 w-10 flex justify-center items-center text-xl bg-[#eee6ed] text-[#5a0f4c] rounded-full'
                                    >
                                        <span>
                                            {email.toLocaleUpperCase().split('')[0]}
                                        </span>
                                    </div>
                                    <div
                                        className=''
                                    >
                                        <p className=''>
                                            {isUser ? user?.name : email}
                                        </p>
                                        <p className='text-sm text-gray-500'>{email}</p>
                                    </div>
                                    <div
                                        className={`px-4 py-1 flex justify-center items-center text-xs rounded no-wrap ${isUser ? 'bg-[#EDEFFB] text-[#4863D4]' : 'bg-gray-100 text-gray-500'}`}
                                    >
                                        {isUser ?
                                            'Cashbook User'
                                            :
                                            'Not a Cashbook User'
                                        }
                                    </div>
                                </div>
                                <div
                                    className='border rounded'
                                >
                                    <div
                                        className='p-4 border-b'
                                    >
                                        Cloose Role
                                    </div>
                                    <div
                                        className='p-4'
                                    >
                                        <div
                                            className='space-x-2'
                                        >
                                            <button
                                                onClick={() => setActive('partner')}
                                                className={`px-4 py-1 bg-gray-100 border rounded-full ${active == 'partner' && 'bg-[#f8efe7] text-[#bd610d] border-[#bd610d]'}`}
                                            >
                                                Partner
                                            </button>
                                            <button
                                                onClick={() => setActive('staff')}
                                                className={`px-4 py-1 bg-gray-100 border rounded-full ${active == 'staff' && 'bg-[#e7f2f9] text-[#137ac9] border-[#137ac9]'}`}
                                            >
                                                Staff
                                            </button>
                                        </div>
                                        <div
                                            className='pt-4'
                                        >
                                            {
                                                (active == 'partner' ? partnerTopics : stuffTopics)
                                                    .map((cat, i) =>
                                                        <div
                                                            key={i}
                                                        >
                                                            {cat?.roles?.length > 0 &&
                                                                <div
                                                                    key={i}
                                                                    className='pb-5 space-y-2'
                                                                >
                                                                    <p>{cat.title}</p>
                                                                    <div
                                                                        className='space-y-2 text-sm'
                                                                    >
                                                                        {
                                                                            cat.roles.map((role, i) =>
                                                                                <div
                                                                                    key={i}
                                                                                    className='flex items-center space-x-2'
                                                                                >
                                                                                    <p>
                                                                                        {cat.title == 'Permissions' ?
                                                                                            <IoMdCheckmarkCircle
                                                                                                size={23}
                                                                                                className='text-[#21b15e]'
                                                                                            />
                                                                                            :
                                                                                            <MdCancel
                                                                                                size={23}
                                                                                                className='text-[#c93b3b]'
                                                                                            />
                                                                                        }
                                                                                    </p>
                                                                                    <p>{role}</p>
                                                                                </div>
                                                                            )
                                                                        }
                                                                    </div>
                                                                </div>
                                                            }
                                                        </div>
                                                    )
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }

                    </div>

                    <div
                        className='h-20 p-6 flex justify-end items-center space-x-5 text-sm border-t'
                    >
                        {!nextStep ?
                            <div
                                className='flex items-center space-x-4'
                            >
                                {!emailView &&
                                    <button
                                        onClick={(e) => setEmailView(!emailView)}
                                        className='flex items-center space-x-2  px-8 py-3 text-[#4863D4]  border rounded'

                                    >
                                        Add With Mobile Number
                                    </button>
                                }
                                <button
                                    onClick={handleVerify}
                                    className='flex items-center space-x-2  px-8 py-3 border bg-[#4863D4] text-white rounded'

                                >
                                    {loading ? 'Verifying' : 'Next'}
                                </button>
                            </div>
                            :
                            <div
                                className='flex items-center space-x-4'
                            >
                                <button
                                    onClick={(e) => setNextStep(!nextStep)}
                                    className='flex items-center space-x-2  px-8 py-3 border text-[#4863D4]  rounded'

                                >
                                    <span>Change Email</span>
                                </button>
                                <button
                                    onClick={addMemberConfirm}
                                    className='flex items-center space-x-2  px-8 py-3 border bg-[#4863D4] text-white rounded'

                                >
                                    {loading ?
                                        <span>Addeding...</span>
                                        :
                                        <span>{isUser ? 'Add as' : 'Invite as'} {active}</span>
                                    }
                                </button>
                            </div>
                        }
                    </div>
                    {success &&
                        <Business_AddMemberSuccess {...{
                            view: success,
                            setView: setSuccess
                        }} />
                    }
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default Business_AddTeamMember;