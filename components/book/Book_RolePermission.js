import {
    Drawer,
    DrawerContent,
    DrawerOverlay
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { IoMdCheckmarkCircle } from "react-icons/io";
import { MdCancel } from "react-icons/md";
import { IoMdInformationCircle } from "react-icons/io";
import { bookAdmin, bookDataOperator, bookOwner, bookParner, bookViewer} from '../../public/data/rolePermissions';

const Book_RolePermission = ({ view, setView }) => {
    const [active, setActive] = useState('Owner')
    const roles = [
        {
            active: 'Owner',
            title: 'Owner(You)'
        },
        {
            active: 'Partner',
            title: 'Partner'
        },
        {
            active: 'Admin',
            title: 'Admin'
        },
        {
            active: 'Viewer',
            title: 'Viewer'
        },
        {
            active: 'Data Operator',
            title: 'Data Operator',
        },
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
                        className='h-16 border-b'
                    >
                        <div
                            className='px-6 py-4 flex justify-between items-center'
                        >
                            <p className='text-xl'>
                                Business Roles & Permissions
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
                            className='p-4 space-y-5 border rounded'
                        >
                            <div
                                className='space-x-2'
                            >
                                <button
                                onClick={() => setActive('Owner')}
                                className={`m-2 px-4 py-1 bg-gray-100 border rounded-full ${active == 'Owner' && 'bg-[#dff4ed] text-[#01866c] border-[#01866c]'}`}
                            >
                                Owner(You)
                            </button>
                            <button
                                onClick={() => setActive('Partner')}
                                className={`m-2 px-4 py-1 bg-gray-100 border rounded-full ${active == 'Partner' && 'bg-[#f8efe7] text-[#bd610d] border-[#bd610d]'}`}
                            >
                                Partner
                            </button>
                            <button
                                onClick={() => setActive('Admin')}
                                className={`m-2 px-4 py-1 bg-gray-100 border rounded-full ${active == 'Admin' && 'bg-[#e7f2f9] text-[#137ac9] border-[#137ac9]'}`}
                            >
                                Admin
                            </button>
                            <button
                                onClick={() => setActive('Viewer')}
                                className={`m-2 px-4 py-1 bg-gray-100 border rounded-full ${active == 'Viewer' && 'bg-[#e7f2f9] text-[#137ac9] border-[#137ac9]'}`}
                            >
                                Viewer
                            </button>
                            <button
                                onClick={() => setActive('Data Operator')}
                                className={`m-2 px-4 py-1 bg-gray-100 border rounded-full ${active == 'Data Operator' && 'bg-[#e7f2f9] text-[#137ac9] border-[#137ac9]'}`}
                            >
                                Data Operator
                            </button>
                            </div>
                            <div>
                                {active === 'own' &&
                                    <div
                                        className='my-4 px-4 py-2 flex items-center space-x-2 rounded bg-gray-100'
                                    >
                                        <p>
                                            <IoMdInformationCircle size={25} className='text-[#534ecd]' />
                                        </p>
                                        <p className='text-sm'>Each Book can have only one owner</p>
                                    </div>
                                }
                                {
                                    (active == 'Owner' ? bookOwner : active == 'Partner' ? bookParner : active == 'Admin' ? bookAdmin : active == 'Data Operator' ? bookDataOperator : bookViewer)
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
                            onClick={(e) => setView(!view)}
                            className='flex items-center space-x-2  px-8 py-3 border bg-[#4863D4] text-white rounded'

                        >
                            <span>Ok, Got it.</span>
                        </button>
                    </div>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default Book_RolePermission;