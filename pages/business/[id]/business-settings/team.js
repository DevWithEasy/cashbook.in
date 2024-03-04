import React, { useState } from "react";
import { UserLayout, BusinessLayout, Business_AddTeamMember, Business_RolePermission } from "../../../../components/Index";
import Image from "next/image";
import { IoPersonAddSharp } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import team_image from "../../../../public/image/AddTeamFirstTime.png";
import { useSelector } from 'react-redux';
import { useRouter } from "next/router";
import BusinessManager from "../../../../utils/BusinessManager";
import Head from 'next/head'

const team = () => {
    const { businesses, currentBusiness, books } = useSelector(state => state.book)
    const { user } = useSelector(state => state.auth)
    const router = useRouter()
    const { pathname } = router
    const path = pathname.split('/').pop()
    const [view, setView] = useState(false)
    const [roleView, setRoleView] = useState(false)

    const businessManager = new BusinessManager(user, books, businesses, currentBusiness)
    const role = businessManager.getRole(currentBusiness)
    const totalMember = businessManager.getTotalMembers()

    const handleRoute = (id) => {
        if (role === 'Staff') {
            return
        } else {
            router.push(`/business/${currentBusiness?._id}/business-settings/team/${id}`)
        }
    }
    
    return (
        <UserLayout  {...{ path }}>
            <BusinessLayout {...{ path }}>
                <Head>
                    <title>Team - {currentBusiness?.name} - CashBook</title>
                </Head>
                <div className="w-full md:w-8/12 pb-10">
                    {role === 'Owner' || role === 'Partner' ?
                        <div className="p-4 flex justify-between items-center border rounded">
                            <div className="w-7/12">
                                <p className="text-lg">Business Team</p>
                                <p className="text-sm text-gray-500">
                                    Add your business partners or staffs to this business and manage
                                    cashflow together
                                </p>
                            </div>
                            <button
                                onClick={() => setView(!view)}
                                className="px-4 py-2 flex items-center space-x-2 bg-[#4863D4] text-white rounded active:ring-2">
                                <IoPersonAddSharp />
                                <span>Add team member</span>
                            </button>
                        </div>
                        :
                        <></>
                    }
                    <div className="py-5 flex justify-between items-center">
                        <p className="font-semibold">Total Members ({businessManager.getTotalMembers()})</p>
                        <button
                            onClick={() => setRoleView(!roleView)}
                            className="flex items-center space-x-2 text-[#4863D4]">
                            <span>View roles & permissions</span>
                            <IoIosArrowForward />
                        </button>
                    </div>
                    {totalMember === 1 ?
                        <div className="flex flex-col justify-center items-center">
                            <div className="py-5 text-center">
                                <p className="">Add members & Assign Roles</p>
                                <p className="text-sm text-gray-500">
                                    Give access to limited features & books
                                </p>
                            </div>
                            <Image alt="" src={team_image.src} height={250} width={300} />
                        </div>
                        :
                        <div
                            className="space-y-5"
                        >
                            {businessManager.getOwnerPartners().length > 0 &&
                                <div
                                    className="space-y-2"
                                >
                                    <p className="text-sm text-gray-500">Owner/Partners</p>
                                    <div
                                        className="space-y-3"
                                    >
                                        {businessManager.getOwnerPartners().map((member, i) =>
                                            <div
                                                key={i}
                                                onClick={() => handleRoute(member?.user?._id)}
                                                className={`flex items-center justify-between space-x-3 ${role !== 'Staff' && 'cursor-pointer'}`}
                                            >
                                                <Image
                                                    alt=''
                                                    src={member?.user?.image?.url ? member?.image?.url : '/image/profile.png'}
                                                    width={60}
                                                    height={60}
                                                    className='rounded-full'
                                                />
                                                <div
                                                    className='w-full flex items-center justify-between'
                                                >
                                                    <div>
                                                        <p>
                                                            {businessManager.getInfo(member?.user?._id)?.user?._id === user?._id ?
                                                                'You'
                                                                :
                                                                businessManager.getInfo(member?.user?._id)?.user?.name
                                                            }
                                                        </p>
                                                        <p className='text-sm text-gray-500'>{member?.user?.email}
                                                        </p>
                                                        <p className='text-sm text-gray-500'>{member?.user?.number}
                                                        </p>
                                                    </div>
                                                    <span
                                                        className={`px-4 py-1 text-xs rounded ${member?.role === 'Owner' ? 'bg-green-100 text-green-500' : 'bg-[#F8EFE7] text-[#BD610D]'}`}
                                                    >
                                                        {member?.role}
                                                    </span>
                                                </div>
                                            </div>
                                        )
                                        }
                                    </div>
                                </div>
                            }


                            {businessManager.getStaffs().length > 0 &&
                                <div>
                                    <div
                                        className="space-y-2"
                                    >
                                        <p className="text-sm text-gray-500">
                                            Staffs ({businessManager.getStaffs().length})
                                        </p>
                                        <div>
                                            {businessManager.getStaffs().map((member, i) =>
                                                <div
                                                    key={i}
                                                    onClick={() => handleRoute(member?.user?._id)}
                                                    className={`flex items-center justify-between space-x-3 ${role !== 'Staff' && 'cursor-pointer'}`}
                                                >
                                                    <Image
                                                        alt=''
                                                        src={member?.user?.image?.url ? member?.image?.url : '/image/profile.png'}
                                                        width={60}
                                                        height={60}
                                                        className='rounded-full'
                                                    />
                                                    <div
                                                        className='w-full flex items-center justify-between'
                                                    >
                                                        <div>
                                                            <p>
                                                                {member?.user?.name}
                                                            </p>
                                                            <p className='text-sm text-gray-500'>
                                                                {member?.user?.email}
                                                            </p>
                                                            <p className='text-sm text-gray-500'>
                                                                {member?.user?.number}
                                                            </p>
                                                        </div>
                                                        <span
                                                            className={`px-4 py-1 text-xs rounded bg-[#E7F2F9] text-[#137AC6]`}
                                                        >
                                                            {member?.role}
                                                        </span>
                                                    </div>
                                                </div>
                                            )
                                            }
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    }
                </div>
                {view &&
                    <Business_AddTeamMember {...{
                        view, setView
                    }} />
                }
                {roleView &&
                    <Business_RolePermission {...{
                        view: roleView,
                        setView: setRoleView
                    }} />
                }
            </BusinessLayout>
        </UserLayout>
    );
};

export default team;
