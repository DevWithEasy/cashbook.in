import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { BusinessLayout, Business_RoleChange, Business_RoleRemove, UserLayout } from '../../../../../components/Index';
import { IoArrowBackOutline } from 'react-icons/io5';
import BusinessManager from '../../../../../utils/BusinessManager';
import Image from 'next/image'
import { IoIosArrowDown, IoIosArrowUp, IoMdCheckmarkCircle } from 'react-icons/io';
import { MdCancel, MdInfo } from 'react-icons/md';
import { ImUsers } from 'react-icons/im';
import Head from 'next/head'
import { RiExchangeBoxLine } from "react-icons/ri";
import { HiUserRemove } from "react-icons/hi";

const BusinessMemberInfo = () => {
    const { businesses, currentBusiness, books } = useSelector(state => state.book)
    const { user } = useSelector(state => state.auth)
    const router = useRouter()

    const businessManager = new BusinessManager(user, books, businesses, currentBusiness)
    const role = businessManager.getRole(currentBusiness)
    const member = businessManager.getInfo(router.query.memberId)

    const [permissionView, setPermissionView] = useState(false)

    const permissions = businessManager.getPermissionInfo(member?.role)

    const [roleChangeView, setRoleChangeView] = useState(false)
    const [roleRemoveView, setRoleRemoveView] = useState(false)

    return (
        <UserLayout  {...{ path: 'team' }}>
            <BusinessLayout {...{ path: 'team' }}>
                <Head>
                    <title>Business Team - {currentBusiness?.name} - CashBook</title>
                </Head>
                <div
                    className='w-8/12 pb-10 space-y-5'
                >
                    <div
                        className='flex items-center space-x-1 text-sm text-gray-500'
                    >
                        <span>Business Team</span>
                        <span>|</span>
                        <span>Partner Info</span>
                    </div>
                    <div
                        onClick={() => router.push(`/business/${currentBusiness?._id}/business-settings/team`)}
                        className='flex items-center space-x-5'
                    >
                        <IoArrowBackOutline
                            size={20}
                            className='cursor-pointer'
                        />
                        <span>{member?.role} Info</span>
                    </div>
                    <div

                        className={`flex items-center justify-between space-x-3`}
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
                                    {user?._id === member?.user?._id ?
                                        'You'
                                        :
                                        member?.user?.name
                                    }
                                </p>
                                <p className='text-sm text-gray-500'>{member?.user?.email}
                                </p>
                                <p className='text-sm text-gray-500'>{member?.user?.number}
                                </p>
                                <p className='text-sm text-gray-500'>{member?.join}
                                </p>
                            </div>
                            <span
                                className={`px-4 py-1 text-xs rounded ${member?.role === 'Owner' ? 'bg-green-100 text-green-500' : 'bg-[#F8EFE7] text-[#BD610D]'}`}
                            >
                                {member?.role}
                            </span>
                        </div>
                    </div>

                    <div
                        className='space-y-5'
                    >
                        <button
                            onClick={() => setPermissionView(!permissionView)}
                            className='w-full p-2 flex justify-center items-center space-x-2 border rounded'
                        >
                            <span>{role} permissions</span>
                            {permissionView ?
                                <IoIosArrowDown />
                                :
                                <IoIosArrowUp />

                            }
                        </button>

                        {permissionView &&
                            <div
                                className='p-6 space-y-5 border rounded'
                            >
                                {member?.role === 'Owner' &&
                                    <div
                                        className='px-4 py-2 flex items-center space-x-3 text-sm bg-[#EEEDFA] rounded'
                                    >
                                        <MdInfo className='text-[#534ECD]' size={25} />
                                        <p>Each business can have only one owner</p>
                                    </div>
                                }
                                {
                                    permissions.map((cat, i) =>
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
                        }
                    </div>

                    <div
                        className='space-y-5'
                    >
                        <p
                            className='text-gray-500'
                        >
                            Books({businessManager.totalBook(currentBusiness)})
                        </p>
                        <div
                            className='space-y-3'
                        >
                            {
                                businessManager.getBooks(currentBusiness).length > 0 &&
                                businessManager.getBooks(currentBusiness).map(book =>
                                    <div
                                        kety={book?._id}
                                        className='flex items-center space-x-4'
                                    >
                                        <ImUsers
                                            size={40}
                                            className='p-2 bg-[#EEEDFA] text-[#534ECD] rounded-full'
                                        />
                                        <div>
                                            <p
                                                className=''
                                            >
                                                {book?.name}
                                            </p>
                                            <p
                                                className='text-sm text-gray-500'
                                            >
                                                {member?.role === 'Owner' ?
                                                    'Full Access'
                                                    :
                                                    `Role - ${member?.role}`

                                                }
                                            </p>
                                        </div>
                                    </div>
                                )
                            }

                        </div>
                    </div>

                    {member?.role !== 'Owner' &&
                        <div
                            className='space-y-5'
                        >
                            <p
                                className='text-gray-500'
                            >
                                Actions
                            </p>
                            <div
                                className='space-y-3 font-semibold'
                            >
                                <div
                                    onClick={() => setRoleChangeView(!roleChangeView)}
                                    className='pb-3 flex items-center space-x-4 text-[#534ECD] border-b cursor-pointer'
                                >
                                    <RiExchangeBoxLine
                                        size={40}
                                        className='p-2 bg-[#EEEDFA]  rounded-full'
                                    />
                                    <p>
                                        Change role to {role === 'Partner' ? 'Partner' : 'Staff'}
                                    </p>
                                </div>
                                <div
                                    onClick={() => setRoleRemoveView(!roleRemoveView)}
                                    className='pb-3 flex items-center space-x-4 text-[#C93B3B] border-b cursor-pointer'
                                >
                                    <HiUserRemove
                                        size={40}
                                        className='p-2 bg-[#F7E1E1] rounded-full'
                                    />
                                    <p>
                                        Remove from business
                                    </p>
                                </div>
                            </div>
                        </div>
                    }
                </div>
                
                {roleChangeView &&
                    <Business_RoleChange {...{
                        member,
                        view: roleChangeView,
                        setView: setRoleChangeView
                    }} />
                }
                {roleRemoveView &&
                    <Business_RoleRemove {...{
                        member,
                        view: roleRemoveView,
                        setView: setRoleRemoveView
                    }} />
                }
            </BusinessLayout>
        </UserLayout>
    );
};

export default BusinessMemberInfo;