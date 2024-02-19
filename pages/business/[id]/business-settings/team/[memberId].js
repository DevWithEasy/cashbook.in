import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { BusinessLayout, UserLayout } from '../../../../../components/Index';
import { IoArrowBackOutline } from 'react-icons/io5';
import BusinessManager from '../../../../../utils/BusinessManager';
import Image from 'next/image'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

const BusinessMemberInfo = () => {
    const { businesses, currentBusiness, books } = useSelector(state => state.book)
    const { user } = useSelector(state => state.auth)
    const router = useRouter()

    const businessManager = new BusinessManager(user, books, businesses, currentBusiness)
    const role = businessManager.getRole(currentBusiness)
    const member = businessManager.getInfo(router.query.memberId)

    const [permissionView,setPermissionView] = useState(false)
    return (
        <UserLayout  {...{ path: 'team' }}>
            <BusinessLayout {...{ path: 'team' }}>
                <div
                    className='w-8/12 space-y-5'
                >
                    <div
                        className='flex items-center space-x-1 text-sm text-gray-500'
                    >
                        <span>Business Team</span>
                        <span>|</span>
                        <span>Partner Info</span>
                    </div>
                    <div
                        className='flex items-center space-x-5'
                    >
                        <IoArrowBackOutline size={20} />
                        <span>{role} Info</span>
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
                                <p>{member?.user?.name}</p>
                                <p className='text-sm text-gray-500'>{member?.user?.email}
                                </p>
                                <p className='text-sm text-gray-500'>{member?.user?.number}
                                </p>
                                <p className='text-sm text-gray-500'>{member?.role}
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
                        className=''
                    >
                        <button
                            onClick={()=>setPermissionView(!permissionView)}
                            className='w-full p-2 flex justify-center items-center space-x-2 border rounded'
                        >
                            <span>{role} permissions</span>
                            {!permissionView ?
                            <IoIosArrowDown />
                            :
                            <IoIosArrowUp />

                            }
                        </button>
                    </div>
                </div>
            </BusinessLayout>
        </UserLayout>
    );
};

export default BusinessMemberInfo;