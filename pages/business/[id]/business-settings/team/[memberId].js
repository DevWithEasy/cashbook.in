import React from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { BusinessLayout, UserLayout } from '../../../../../components/Index';
import { IoArrowBackOutline } from 'react-icons/io5';

const BusinessMemberInfo = () => {
    const { businesses, currentBusiness, books } = useSelector(state => state.book)
    const { user } = useSelector(state => state.auth)
    const router = useRouter()
    const { pathname } = router
    const path = pathname.split('/').pop()
    console.log(user)
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
                        <span>Partner Info</span>
                    </div>
                </div>
            </BusinessLayout>
        </UserLayout>
    );
};

export default BusinessMemberInfo;