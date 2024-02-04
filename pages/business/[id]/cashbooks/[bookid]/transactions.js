import React from 'react';
import UserLayout from '../../../../../components/UserLayout';
import Balance from '../../../../../components/Balance';

const Transactions = () => {
    return (
        <UserLayout>
            <div
                className='px-8 space-y-5'
            >
                <div
                    className=''
                >
                    <div>

                    </div>
                    <div>

                    </div>
                </div>
                <Balance {...{}} />
            </div>

        </UserLayout>
    );
};

export default Transactions;