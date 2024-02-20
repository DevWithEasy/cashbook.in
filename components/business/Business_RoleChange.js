import {
    Drawer,
    DrawerContent,
    DrawerOverlay
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { IoMdCheckmarkCircle } from "react-icons/io";
import { MdCancel } from "react-icons/md";
import { partnerTopics, stuffTopics } from '../../public/data/rolePermissions';
import Business_RoleChange_Confirm from './Business_RoleChange_Confirm';
import Image from 'next/image'

const Business_RoleChange = ({ member, view, setView }) => {
    const [confirmView, setConfirmView] = useState(false)

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
                            <p className='text-xl'>
                                Change Role to {member?.role}
                            </p>
                            <button
                                onClick={() => setView(!view)}
                                className='px-4 py-1 border rounded'
                            >X</button>
                        </div>
                    </div>
                    <div
                        className={`h-[calc(100vh-144px)] p-6 space-y-5 overflow-y-auto`}
                    >
                        <div

                            className={`p-4 flex items-center justify-between space-x-3 border rounded`}
                        >
                            <Image
                                alt=''
                                src={member?.user?.image?.url ? member?.user?.image?.url : '/image/profile.png'}
                                width={60}
                                height={60}
                                className='rounded-full'
                            />
                            <div
                                className='w-full flex items-center justify-between'
                            >
                                <div>
                                    <p>
                                    {member?.user?.name}
                                    </p>
                                    <p className='text-sm text-gray-500'>{member?.user?.email}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div
                            className='p-4 space-y-5 border rounded'
                        >
                            <div>
                                {
                                    (member?.role == 'Partner' ? partnerTopics : stuffTopics)
                                        .map((cat, i) =>
                                            <>
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
                                            </>
                                        )
                                }
                            </div>
                        </div>
                    </div>
                    <div
                        className='h-20 p-6 flex justify-end items-center space-x-5 border-t'
                    >
                        <button
                            onClick={(e) => setConfirmView(!confirmView)}
                            className='flex items-center space-x-2  px-8 py-3 border bg-[#4863D4] text-white rounded'

                        >
                            <span>Change Role to  {member?.role}</span>
                        </button>
                    </div>
                    {confirmView &&
                        <Business_RoleChange_Confirm {...{
                            member,
                            view: confirmView,
                            setView: setConfirmView,
                            setFirstView: setView
                        }} />
                    }
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default Business_RoleChange;