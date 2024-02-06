import React from 'react';
import UserLayout from '../../../../../../../components/UserLayout';
import BookSettingLayout from '../../../../../../../components/BookSettingLayout';
import { useRouter } from 'next/router';

const Payment = () => {
    const router = useRouter()
    const {pathname} = router
    const path = pathname.split('/').pop()
    return (
        <UserLayout>
            <BookSettingLayout {...{path}}>
                <div
                    className='w-8/12'
                >
                    payment
                </div>
            </BookSettingLayout>
        </UserLayout>
    );
};

export default Payment;