import React from 'react';
import UserLayout from '../../../../../../../components/UserLayout';
import BookSettingLayout from '../../../../../../../components/BookSettingLayout';
import { useRouter } from 'next/router';

const Category = () => {
    const router = useRouter()
    const {pathname} = router
    const path = pathname.split('/')[(pathname.split('/').length-2)]
    
    return (
        <UserLayout>
            <BookSettingLayout {...{path}}>
                <div
                    className='w-8/12'
                >
                    category
                </div>
            </BookSettingLayout>
        </UserLayout>
    );
};

export default Category;