import React from 'react';
import UserLayout from '../../../../../../../components/UserLayout';
import BookSettingLayout from '../../../../../../../components/BookSettingLayout';

const Category = () => {
    return (
        <UserLayout>
            <BookSettingLayout>
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