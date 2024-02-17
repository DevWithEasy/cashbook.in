import React from 'react';
import Image from 'next/image'
import { Business_TeamMemberAccept } from '../components/Index';
import { useRouter } from 'next/router';
import { useState } from 'react';
import axios from 'axios'

const Invite = () => {
    const router = useRouter()
    const [view,setView] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleAccepting = async () => {
        setLoading(true)
        try {
            const res = await axios.post(`/api/user/send_otp?email=${router.query.email}`)
            if (res.data.success) {
                setView(true)
                setLoading(false)
            }
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    // console.log(router.query)
    return (
        <div
            className='h-screen pt-10  bg-gray-100 overflow-y-auto'
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
                        className='w-1/2 flex flex-col space-y-5'
                    >
                        <h2 className='text-3xl font-semibold'>{router?.query?.name} added you to a business.</h2>
                        
                        <p>You will join “{router?.query?.business}” business once you login/register on CashBook using “{router?.query?.email}” email address.</p>
                        <p
                            className='p-2 text-red-500 border border-red-500/50 rounded'
                        >
                            If accept invitation our system will create a new account automatically.
                        </p>
                        <button
                            onClick={handleAccepting}
                            className='w-44 px-4 py-2 bg-[#4863D4] text-white rounded shadow'
                        >
                            {loading ? 'Please wait...' : 'Accept Invitation'}
                        </button>
                    </div>
                    {view &&
                        <Business_TeamMemberAccept {...{
                            params : router.query,
                            view,
                            setView
                        }}/>
                    }
                </div>
            </div>
        </div>
    );
};

export default Invite;