import React from 'react';
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
} from '@chakra-ui/react'
import { IoMdArrowRoundBack } from 'react-icons/io';
import { useRouter } from 'next/router';
import { IoSettingsOutline } from 'react-icons/io5';
import { HiOutlineUsers } from 'react-icons/hi2';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { MdOutlineFileDownload, MdOutlineGridOn, MdPictureAsPdf } from 'react-icons/md';
import { useSelector } from 'react-redux'

const Transections_Header = () => {
    const { currentBusiness, currentBook } = useSelector(state => state.book)
    const router = useRouter()
    return (
        <div
            className='py-4 flex items-center border-b'
        >
            <div
                className='w-1/2 flex items-center space-x-3'
            >
                <IoMdArrowRoundBack
                    onClick={() => router.push(`/business/${currentBusiness._id}/cashbooks/`)}
                    size={22}
                    className='mt-1 cursor-pointer'
                />
                <p
                    className='text-xl'
                >
                    Settings
                </p>
                <div
                    className='pl-5 flex items-center text-[#4863D4] space-x-5'
                >
                    <button
                        className='relative group'
                    >
                        <IoSettingsOutline
                            onClick={() => router.push(`/business/${currentBusiness._id}/cashbooks/${currentBook._id}/settings/fields`)}
                            size={22}
                            className='text-[#4863D4] cursor-pointer'
                        />
                        <span
                            className='absolute hidden group-hover:block w-28 px-4 py-1 pb-2 -translate-x-1/2 translate-y-3 bg-black text-xs text-white rounded'
                        >
                            Book settings
                        </span>
                    </button>
                    <span className='text-gray-200'>|</span>
                    <button
                        className='relative group'
                    >
                        <HiOutlineUsers
                            onClick={() => router.push(`/business/${currentBusiness._id}/cashbooks/${currentBook._id}/settings/members`)}
                            size={22}
                            className='text-[#4863D4] cursor-pointer'
                        />
                        <span
                            className='absolute hidden group-hover:block w-28 px-4 py-1 pb-2 -translate-x-1/2 translate-y-3 bg-black text-xs text-white rounded'
                        >
                            Add Member
                        </span>
                    </button>

                </div>
            </div>
            <div
                className='w-1/2 flex justify-end space-x-5'
            >
                <button
                    onClick={() => {
                    }}
                    className='px-6 py-2 flex items-center space-x-2 text-[#4863D4]'
                >
                    <AiOutlineCloudUpload size={20} />
                    <span>Add Bulk Entries</span>
                </button>
                <Menu>
                    <MenuButton

                    >
                        <button
                            className='px-6 py-2 flex items-center space-x-2 text-[#4863D4] border active:ring-2 rounded'
                        >
                            <MdOutlineFileDownload />
                            <span>Reports</span>
                        </button>

                    </MenuButton>
                    <MenuList>
                        <button
                            className='p-2 flex space-x-2'
                        >
                            <MdPictureAsPdf size={25} />
                            <span>PDF Report</span>
                        </button>
                        <button
                            className='p-2 flex space-x-2'
                        >
                            <MdOutlineGridOn size={25} />
                            <span>Excel Report</span>
                        </button>
                    </MenuList>
                </Menu>
            </div>
        </div>
    );
};

export default Transections_Header;