import React from 'react';
import Image from 'next/image'
import Link from 'next/link'

const Invite = () => {
    return (
        <div
            className='h-screen pt-10  bg-gray-100'
        >
            <div
                className='w-8/12 mx-auto bg-white rounded'
            >
                <div
                    className='p-6 flex justify-center items-center space-x-5 text-3xl'
                >
                    <Image
                        src='/logo.png'
                        alt=''
                        height={40}
                        width={40}
                    />
                    <span>
                        CashBook Invitation
                    </span>
                </div>
                <hr />
                <div
                    className='p-8 flex justify-between'
                >
                    <div
                        className='w-1/2'
                    >
                        <Image
                            src='/image/invite.png'
                            alt=''
                            height={350}
                            width={450}
                        />
                    </div>
                    <div
                        className='w-1/2 flex flex-col justify-center space-y-5'
                    >
                        <h2 className='text-3xl font-semibold'>Robiul Awal added you to a business.</h2>
                        <p>You will join “Hello” business once you login/register on CashBook using “devwitheasy@gmail.com” email address.</p>
                        <Link
                            href='/signin'
                            className='w-44 px-4 py-2 bg-[#4863D4] text-white rounded'
                        >
                            Login / Regitration
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Invite;