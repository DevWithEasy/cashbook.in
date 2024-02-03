import React from 'react';
import UserLayout from '../../components/UserLayout';
import BussinesNames from '../../components/business/BussinesNames';
import BusinessLayout from '../../components/BusinessLayout';
import Team from '../../components/business/Team';

const Bussiness = () => {
    return (
        <UserLayout>
            <BussinesNames/>
            <BusinessLayout>
                <Team/>
            </BusinessLayout>
        </UserLayout>
    );
};

export default Bussiness;