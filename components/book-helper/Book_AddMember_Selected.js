import React from 'react';

const Book_AddMember_Selected = ({ selected }) => {
    return (
        <div
            className='p-4 flex  items-center space-x-4 border rounded'
        >
            <div>
                <div
                    className='h-10 w-10 flex justify-center items-center text-xl bg-[#eee6ed] text-[#5a0f4c] rounded-full'
                >
                    <span>
                        {selected?.user?.email?.toLocaleUpperCase().split('')[0]}
                    </span>
                </div>
            </div>
            <div
                className='w-full flex justify-between items-center'
            >
                <div>
                    <p className=''>
                        {selected?.user?.name}
                    </p>
                    <p className='text-sm text-gray-500'>{selected?.user?.email}</p>
                </div>
                <span className='px-2 py-1 text-sm bg-[#EBEEFD] text-[#4863D4] rounded'>
                    {selected?.role}
                </span>
            </div>
        </div>

    );
};

export default Book_AddMember_Selected;