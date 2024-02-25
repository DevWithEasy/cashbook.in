import React from 'react';
import Image from 'next/image'

const Book_AddMember_Member = ({member,nextStep,setNextStep,setSelected}) => {
    return (
        <div
            className='flex items-center justify-between space-x-3 pr-5'
        >
            <Image
                alt=''
                src={member?.user?.image?.url ? member?.image?.url : '/image/profile.png'}
                width={50}
                height={50}
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
                <button
                    onClick={() => {
                        setNextStep(!nextStep)
                        setSelected(member)
                    }}
                    className='px-4 py-1 text-xs rounded bg-[#E7F2F9] text-[#137AC6]'
                >
                    ADD
                </button>
            </div>
        </div>

    );
};

export default Book_AddMember_Member;