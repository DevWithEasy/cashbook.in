import React, { useState } from "react";
import UserLayout from "../../../../components/UserLayout";
import BusinessLayout from "../../../../components/BusinessLayout";
import Image from "next/image";
import { IoPersonAddSharp } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import team_image from "../../../../public/image/AddTeamFirstTime.png";
import BusinessAddTeamMember from "../../../../components/business/BusinessAddTeamMember";
import BusinessRolePermission from "../../../../components/business/BusinessRolePermission";
import { useRouter } from "next/router";

const team = () => {
    const router = useRouter()
    const {pathname} = router
    const path = pathname.split('/').pop()
    const [view, setView] = useState(false)
    const [roleView,setRoleView] = useState(false)
    return (
        <UserLayout>
            <BusinessLayout {...{path}}>
                <div className="w-8/12 pb-10">
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
                    <div className="py-5 flex justify-between items-center">
                        <p className="font-semibold">Total Members (1)</p>
                        <button 
                        onClick={()=>setRoleView(!roleView)}
                        className="flex items-center space-x-2 text-[#4863D4]">
                            <span>View roles & permissions</span>
                            <IoIosArrowForward />
                        </button>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <div className="py-5 text-center">
                            <p className="">Add members & Assign Roles</p>
                            <p className="text-sm text-gray-500">
                                Give access to limited features & books
                            </p>
                        </div>
                        <Image alt="" src={team_image.src} height={250} width={300} />
                    </div>
                </div>
                {view &&
                    <BusinessAddTeamMember {...{
                        view, setView
                    }} />
                }
                {roleView &&
                    <BusinessRolePermission {...{
                        view : roleView,
                        setView : setRoleView
                    }}/>
                }
            </BusinessLayout>
        </UserLayout>
    );
};

export default team;
