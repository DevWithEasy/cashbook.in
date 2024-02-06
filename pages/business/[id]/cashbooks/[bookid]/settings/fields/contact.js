import React from 'react';
import UserLayout from '../../../../../../../components/UserLayout';
import BookSettingLayout from '../../../../../../../components/BookSettingLayout';
import { useRouter } from 'next/router';

const Contact = () => {
    const router = useRouter()
    const {pathname} = router
    const path = pathname.split('/').pop()
    return (
        <UserLayout>
            <BookSettingLayout {...{path}}>
                <div
                    className='w-8/12'
                >
                    contact
                </div>
            </BookSettingLayout>
        </UserLayout>
    );
};

export default Contact;