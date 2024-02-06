import React, { useState } from 'react';
import UserLayout from '../../../../components/UserLayout';
import BusinessLayout from '../../../../components/BusinessLayout';
import { FaExchangeAlt } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import BusinessDelete from '../../../../components/business/BusinessDelete';
import BusinessOwnerChange from '../../../../components/business/BusinessOwnerChange';
import { useRouter } from 'next/router';

const settings = () => {
    const router = useRouter()
    const {pathname} = router
    const path = pathname.split('/').pop()
    const [deleteView,setDeleteView] = useState(false)
    const [ownerChangeView,setOwnerChangeView] = useState(false)
    return (
        <UserLayout>
            <BusinessLayout {...{path}}>
                <div
                    className='w-8/12 space-y-5'
                >
                    <div
                        className='p-6 flex justify-between items-center border rounded'
                    >
                        <div>
                            <p
                                className=''
                            >
                                Change Owner
                            </p>
                            <p
                                className='text-sm text-gray-500'
                            >
                                Current owner: You
                            </p>
                        </div>
                        <button
                            onClick={()=>setOwnerChangeView(!ownerChangeView)}
                            className='px-6 py-2 flex items-center space-x-2 text-yellow-600 active:ring-2'
                        >
                            <FaExchangeAlt />
                            <span>Change Owner</span>
                        </button>
                    </div>
                    <div
                        className='p-6 flex justify-between items-center border rounded'
                    >
                        <div>
                            <p
                                className=''
                            >
                                Delete Business
                            </p>
                            <p
                                className='text-sm text-gray-500'
                            >
                                This will delete your business permanently
                            </p>
                        </div>
                        <button
                            onClick={()=>setDeleteView(!deleteView)}
                            className='px-6 py-2 flex items-center space-x-2 text-red-600 active:ring-2'
                        >
                            <MdOutlineDelete />
                            <span>Delete Business</span>
                        </button>
                    </div>
                </div>
                {deleteView &&
                    <BusinessDelete {...{
                        view : deleteView,
                        setView : setDeleteView
                    }}/>
                }
                {ownerChangeView &&
                    <BusinessOwnerChange {...{
                        view : ownerChangeView,
                        setView : setOwnerChangeView
                    }}/>
                }
            </BusinessLayout>
        </UserLayout>
    );
};

export default settings;