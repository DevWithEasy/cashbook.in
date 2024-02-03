import React from 'react';

const BusinessLayout = ({children}) => {
    const sidebars = [
        {
            title : 'Business Team',
            desc : 'Add, remove or change role',
            path : 'team',
        },
        {
            title : 'Business Profile',
            desc : 'Edit business details',
            path : 'profile',
        },
        {
            title : 'Settings',
            desc : 'Change owner or delete business',
            path : 'settings',
        },
    ]
    return (
        <div
            className=''
        >
            <div
                className='h-[70px] px-6 border-b flex items-center'
            >
                <p
                    className='text-2xl'
                >
                    Business Settings
                </p>
                <p className='mx-2'>(Name)</p>
            </div>
            <div
                className='h-[calc(100vh-118px)] flex justify-between'
            >
                <div
                    className='w-3/12 pl-4 border-r'
                >
                    {
                        sidebars.map((topic,i)=>
                        <div
                            key={i}
                            className='py-3 pr-3 border-b'
                        >
                            <div
                                className='p-3 space-y-1 bg-[#EBEEFB] hover:bg-gray-100 rounded cursor-pointer'
                            >
                            <p>{topic.title}</p>
                            <p
                                className='text-sm text-gray-500'
                            >
                            {topic.desc}
                            </p>
                            </div>
                        </div>
                        )
                    }
                </div>
                <div
                    className='w-9/12 px-6 py-4'
                > 
                    {children}
                </div>
            </div>
        </div>
    );
};

export default BusinessLayout;