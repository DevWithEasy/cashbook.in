import {
    Drawer,
    DrawerContent,
    DrawerOverlay
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { ImUsers } from 'react-icons/im';
import { IoIosArrowForward, IoMdCheckmarkCircle } from 'react-icons/io';
import { MdCancel, MdInfo, MdOutlineInfo } from "react-icons/md";
import { Business_AddTeamMember } from '../Index';
import { useSelector } from 'react-redux'
import BusinessManager from '../../utils/BusinessManager';
import Image from 'next/image'
import { AiOutlinePlus } from 'react-icons/ai';

const Book_AddMember = ({ view, setView }) => {
    const { books, businesses, currentBusiness, currentBook } = useSelector(state => state.book)
    const { user } = useSelector(state => state.auth)
    const [addView, setAddView] = useState(false)
    const [nextStep, setNextStep] = useState(false)
    const [active, setActive] = useState('Data Operator')
    const [selected, setSelected] = useState({})
    const [loading, setLoading] = useState(false)

    const businessManager = new BusinessManager(user, books, businesses, currentBusiness)

    const oparetorTopics = [
        {
            title: 'Permissions',
            roles: [
                'Add Cash In or Cash Out entries',
                'View entries by everyone',
                'View net balance & download PDF or Excel'
            ]
        },
        {
            title: 'Restrictions',
            roles: [
                'Cannot edit entries'
            ]
        }
    ]

    const viewerTopics = [
        {
            title: 'Permissions',
            roles: [
                'View entries by everyone',
                'View net balance & download PDF or Excel'
            ]
        },
        {
            title: 'Restrictions',
            roles: [
            ]
        }
    ]

    const adminTopics = [
        {
            title: 'Permissions',
            roles: [
                'Full access to book settings & activity log',
                'Customize data operator permissions',
                'Change roles of data operator or viewer',
            ]
        },
        {
            title: 'Restrictions',
            roles: [
                'Can’t remove owners or partners',
                'Can’t delete book'
            ]
        }
    ]
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
                            className='h-36'
                        >
                            <div
                                className='px-6 py-4 flex justify-between items-center'
                            >
                                <p className='text-xl'>Add from {currentBook?.name}</p>
                                <button
                                    onClick={() => setView(!view)}
                                    className='px-4 py-1 border rounded'
                                >X</button>
                            </div>
                            <div
                                className='p-4 flex items-center space-x-3 bg-[#EEEDFA]'
                            >
                                <p>
                                    <MdInfo
                                        size={25}
                                        className='text-[#4863D4]'
                                    />
                                </p>
                                <p
                                    className='text-sm'
                                >
                                    {nextStep ?
                                        'You can change operator permissions from book setting page after adding this operator.'
                                        :
                                        `You can add members to this book from the staff of “${currentBook?.name}”`
                                    }
                                </p>
                            </div>
                        </div>
                        <div
                            className='h-[calc(100vh-224px)] p-6 overflow-y-auto'
                        >
                            {!nextStep ?
                                <div
                                    className='space-y-5'
                                >
                                    <div
                                        className='space-y-2'
                                    >
                                        <input
                                            placeholder='Search by name or number...'
                                            className='w-full p-2 border rounded focus:outline-[#4863D4]'
                                        />
                                    </div>
                                    <div
                                        onClick={() => setAddView(!addView)}
                                        className='flex justify-between items-center cursor-pointer'
                                    >
                                        <div
                                            className='flex items-center space-x-4'
                                        >
                                            <ImUsers
                                                size={50}
                                                className='p-4 bg-[#ebeefb] text-[#4863D4] rounded-full'
                                            />
                                            <div
                                                className='text-sm space-y-1'
                                            >
                                                <p className='font-semibold'>Add New Member</p>
                                                <p className='text-gray-500 text-xs'>
                                                    Invite members who are not part of your business yet</p>
                                            </div>
                                        </div>
                                        <IoIosArrowForward />
                                    </div>
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
                                                                <div
                                                                    key={i}
                                                                    className='flex items-center justify-between space-x-3 pr-5'
                                                                >
                                                                    <Image
                                                                        alt=''
                                                                        src={member?.user?.image?.url ? member?.image?.url : '/image/profile.png'}
                                                                        width={50}
                                                                        height={50}
                                                                        className='rounded-full'
                                                                    />
                                                                    <div
                                                                        className='w-full flex items-center justify-between'
                                                                    >
                                                                        <div>
                                                                            <p>
                                                                                {member?.user?.name}
                                                                            </p>
                                                                            <p className='text-sm text-gray-500'>
                                                                                {member?.user?.email}
                                                                            </p>
                                                                            <p className='text-sm text-gray-500'>
                                                                                {member?.user?.number}
                                                                            </p>
                                                                        </div>
                                                                        <button
                                                                            onClick={() => {
                                                                                setNextStep(!nextStep)
                                                                                setSelected(member)
                                                                            }}
                                                                            className='px-4 py-1 text-xs rounded bg-[#E7F2F9] text-[#137AC6]'
                                                                        >
                                                                            ADD
                                                                        </button>
                                                                    </div>
                                                                </div>
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
                                    <div
                                        className='p-4 flex  items-center space-x-4 border rounded'
                                    >
                                        <div>
                                            <div
                                                className='h-10 w-10 flex justify-center items-center text-xl bg-[#eee6ed] text-[#5a0f4c] rounded-full'
                                            >
                                                <span>
                                                    {selected?.user?.email?.toLocaleUpperCase().split('')[0]}
                                                </span>
                                            </div>
                                        </div>
                                        <div
                                            className='w-full flex justify-between items-center'
                                        >
                                            <div>
                                                <p className=''>
                                                    {selected?.user?.name}
                                                </p>
                                                <p className='text-sm text-gray-500'>{selected?.user?.email}</p>
                                            </div>
                                            <span className='px-2 py-1 text-sm bg-[#EBEEFD] text-[#4863D4] rounded'>
                                                {selected?.role}
                                            </span>
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
                                                    onClick={() => setActive('Data Operator')}
                                                    className={`px-4 py-1 bg-gray-100 border rounded-full ${active == 'Data Operator' && 'bg-[#e7f2f9] text-[#137ac9] border-[#137ac9]'}`}
                                                >
                                                    Data Operator
                                                </button>
                                                <button
                                                    onClick={() => setActive('Viewer')}
                                                    className={`px-4 py-1 bg-gray-100 border rounded-full ${active == 'Viewer' && 'bg-[#e7f2f9] text-[#137ac9] border-[#137ac9]'}`}
                                                >
                                                    Viewer
                                                </button>
                                                <button
                                                    onClick={() => setActive('Admin')}
                                                    className={`px-4 py-1 bg-gray-100 border rounded-full ${active == 'Admin' && 'bg-[#e7f2f9] text-[#137ac9] border-[#137ac9]'}`}
                                                >
                                                    Admin
                                                </button>
                                            </div>
                                            <div
                                                className='pt-4'
                                            >
                                                {
                                                    (active == 'Data Operator' ? oparetorTopics : active == 'Viewer' ? viewerTopics : adminTopics)
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
                                    <p
                                        className='flex items-center space-x-3 text-sm text-gray-500'
                                    >
                                        <MdOutlineInfo/>
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
                                    onClick={() => { }}
                                    className='flex items-center space-x-2  px-8 py-3 border bg-[#4863D4] text-white rounded'

                                >
                                    <AiOutlinePlus/>
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