import React, { useState } from 'react';
import {UserLayout,Business_Update,BusinessLayout} from '../../../../components/Index';
import { MdOutlineEdit } from "react-icons/md";
import { BsBuildings } from "react-icons/bs";
import { TiInfo } from "react-icons/ti";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import {categories,types} from '../../../../public/image/bussiness/business_data'
import Head from 'next/head'

const profile = () => {
    const { currentBusiness } = useSelector(state => state.book)
    const router = useRouter()
    const {pathname} = router
    const path = pathname.split('/').pop()
    const [view,setView] = useState(false)
    const category = categories.find(cat => cat.id === currentBusiness?.category)
    const type = types.find(cat => cat.id === currentBusiness?.type)
    return (
        <UserLayout  {...{path}}>
            <BusinessLayout {...{path}}>
            <Head>
                    <title>Profile - {currentBusiness?.name} - CashBook</title>
                </Head>
                <div
                    className='w-8/12 space-y-5'
                >
                    <div
                        className='p-6 space-y-3 border rounded'
                    >
                        <div
                            className='flex justify-between items-center space-x-3'
                        >
                            <BsBuildings
                                size={40}
                                className='px-2 border-2 rounded'
                            />
                            <div
                                className='w-full'
                            >
                                <p
                                    className=''
                                >
                                    Loan
                                </p>
                                <p
                                    className='text-sm text-red-400'
                                >
                                    Incomplete business profile
                                </p>
                            </div>
                            <MdOutlineEdit 
                                size={28} 
                                onClick={()=>setView(!view)}
                                className='text-blue-500 cursor-pointer'
                            />
                        </div>
                        <div
                            className='h-2 bg-gray-100 rounded-full'
                        >
                            <div
                                className='h-full w-[20%] bg-red-500 rounded-full'
                            >

                            </div>
                        </div>
                        <div
                            className='my-2 p-4 flex items-center space-x-2 bg-gray-100 rounded'
                        >
                            <TiInfo size={30} className='text-[#4863D4]' />
                            <p
                                className='text-xs'
                            >7 out of 10 fields are incomplete. Fill these to complete your profile</p>
                        </div>
                    </div>
                    <Tabs>
                        <TabList>
                            <Tab>Basics</Tab>
                            <Tab>Business Info</Tab>
                            <Tab>Communication</Tab>
                        </TabList>

                        <TabPanels>
                            <TabPanel
                                className='space-y-3'
                            >
                                <p className='text-sm text-gray-500'>Business Name</p>
                                <p>{currentBusiness?.name ?  currentBusiness?.name : '-'}</p>
                                <p className='text-sm text-gray-500'>Business Address</p>
                                <p>{currentBusiness?.address ?  currentBusiness?.address : '-'}</p>
                                <p className='text-sm text-gray-500'>Staff Size</p>
                                <p>{currentBusiness?.stuffs ?  currentBusiness?.stuffs : '-'}</p>
                            </TabPanel>
                            <TabPanel
                                className='space-y-3'
                            >
                                <p className='text-sm text-gray-500'>Business Category</p>
                                <p>{currentBusiness?.category ?  category?.name : '-'}</p>
                                <p className='text-sm text-gray-500'>Business Subcategory</p>
                                <p>{currentBusiness?.type ?  type?.name : '-'}</p>
                            </TabPanel>
                            <TabPanel
                                className='space-y-3'
                            >
                                <p className='text-sm text-gray-500'>Business Mobile Number</p>
                                <p>{currentBusiness?.phone ?  currentBusiness?.phone : '-'}</p>
                                <p className='text-sm text-gray-500'>Business Email</p>
                                <p>{currentBusiness?.email ?  currentBusiness?.email : '-'}</p>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </div>
                {view &&
                    <Business_Update {...{
                        view,setView
                    }}/>
                }
            </BusinessLayout>
        </UserLayout>
    );
};

export default profile;