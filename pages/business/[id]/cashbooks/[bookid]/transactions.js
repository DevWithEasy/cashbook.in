import React, { useState } from 'react';
import UserLayout from '../../../../../components/UserLayout';
import Balance from '../../../../../components/Balance';
import { AiOutlineCloudUpload, AiOutlinePlus } from "react-icons/ai";
import { IoMdArrowRoundBack } from 'react-icons/io';
import { TbPlusMinus } from "react-icons/tb";
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
} from '@chakra-ui/react'
import { IoSettingsOutline } from "react-icons/io5";
import { HiOutlineUsers } from "react-icons/hi2";
import { MdOutlineFileDownload, MdPictureAsPdf, MdOutlineGridOn, MdOutlineRadioButtonChecked, MdRadioButtonUnchecked, MdOutlineCheckBoxOutlineBlank, MdOutlineCheckBox, MdDeleteOutline, MdOutlineTurnRight, MdOutlineArrowDropDown, MdContentCopy, MdOutlineCategory, MdOutlinePayments } from "react-icons/md";
import { TiArrowSortedDown } from 'react-icons/ti';
import { CiSearch } from 'react-icons/ci';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FaExchangeAlt } from "react-icons/fa";
import { RiEdit2Line } from "react-icons/ri";
import AddEntry from '../../../../../components/entry/AddEntry';
import EntryDetails from '../../../../../components/entry/EntryDetails';
import DeleteEntry from '../../../../../components/entry/DeleteEntry';
import UpdateEntry from '../../../../../components/entry/UpdateEntry';
import { useRouter } from 'next/router';

const Transactions = () => {
    const router = useRouter()
    const [menuId, setMenuId] = useState(null)
    const [check, setCheck] = useState(false)
    const [selected, setSelected] = useState([])
    const [view, setView] = useState(false)
    const [detailsView, setDetailsView] = useState(false)
    const [deleteView, setDeleteView] = useState(false)
    const [updateView, setUpdateView] = useState(false)
    const [entryType, setEntryType] = useState('cash_in')
    const [durationBy, setDurationBy] = useState({
        title: 'All Time',
        sort: 'all_time'
    })
    const [typeBy, setTypeBy] = useState({
        title: 'All',
        sort: 'all'
    })
    const durationsorts = [
        {
            title: 'All Time',
            sort: 'all_time'
        },
        {
            title: 'Today',
            sort: 'today'
        },
        {
            title: 'Yesterday',
            sort: 'hightolow'
        },
        {
            title: 'This Month',
            sort: 'this_month'
        },
        {
            title: 'Last Month',
            sort: 'last_month'
        },
        {
            title: 'Custom',
            sort: 'custom'
        }
    ]
    const typesorts = [
        {
            title: 'All',
            sort: 'all'
        },
        {
            title: 'Cash In',
            sort: 'cash_in'
        },
        {
            title: 'Cash Out',
            sort: 'cash_out'
        },
    ]

    const handleCheck = () => {
        setCheck(!check)
        setSelected([...selected, '123'])
    }

    const handleView = (type) => {
        setEntryType(type)
        setView(!view)
    }

    const handleDetails=()=>{
        setDetailsView(!deleteView)
    }

    return (
        <UserLayout>
            <div
                className='px-8 space-y-5'
            >
                <div
                    className='py-4 flex items-center border-b'
                >
                    <div
                        className='w-1/2 flex items-center space-x-3'
                    >
                        <IoMdArrowRoundBack
                            onClick={() => router.push(`/business/businessid/cashbooks/`)}
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
                                    onClick={() => router.push(`/business/businessId/cashbooks/bookId/settings/fields`)}
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
                                    onClick={() => router.push(`/business/businessId/cashbooks/bookId/settings/members`)}
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
                            <span>Add Buk Entries</span>
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
                                <MenuItem>
                                    <button
                                        className='p-2 flex space-x-2'
                                    >
                                        <MdPictureAsPdf size={25} />
                                        <span>PDF Report</span>
                                    </button>
                                </MenuItem>
                                <MenuItem>
                                    <button
                                        className='p-2 flex space-x-2'
                                    >
                                        <MdOutlineGridOn size={25} />
                                        <span>Excel Report</span>
                                    </button>
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    </div>
                </div>
                <div
                    className='py-2 space-x-5'
                >
                    <Menu>
                        <MenuButton
                            className='border rounded'
                        >
                            <button
                                className='w-full px-2 py-1 flex justify-between items-center space-x-2 text-sm'
                            >
                                <span>Duration : {durationBy?.title}</span>
                                <TiArrowSortedDown />
                            </button>
                        </MenuButton>
                        <MenuList>
                            {
                                durationsorts.map((sort, i) =>
                                    <MenuItem
                                        key={i}
                                        onClick={() => setDurationBy(sort)}
                                        className='space-x-2'
                                    >
                                        {sort.sort === durationBy.sort ?
                                            <MdOutlineRadioButtonChecked className='text-[#4863D4]' />
                                            :
                                            <MdRadioButtonUnchecked />
                                        }
                                        <span>
                                            {sort.title}
                                        </span>
                                    </MenuItem>
                                )
                            }
                            <div></div>
                        </MenuList>
                    </Menu>
                    <Menu>
                        <MenuButton
                            className='border rounded'
                        >
                            <button
                                className='w-full px-2 py-1 flex justify-between items-center space-x-2 text-sm'
                            >
                                <span>Types : {typeBy?.title}</span>
                                <TiArrowSortedDown />
                            </button>
                        </MenuButton>
                        <MenuList>
                            {
                                typesorts.map((sort, i) =>
                                    <MenuItem
                                        key={i}
                                        onClick={() => setTypeBy(sort)}
                                        className='space-x-2'
                                    >
                                        {sort.sort === typeBy.sort ?
                                            <MdOutlineRadioButtonChecked className='text-[#4863D4]' />
                                            :
                                            <MdRadioButtonUnchecked />
                                        }
                                        <span>
                                            {sort.title}
                                        </span>
                                    </MenuItem>
                                )
                            }
                            <div></div>
                        </MenuList>
                    </Menu>
                </div>
                <div
                    className='flex justify-between items-center'
                >
                    <div
                        className='relative w-6/12'
                    >
                        <input
                            placeholder='Search by book name...'
                            className='w-full px-4 py-2 border focus:outline-[#4863D4] rounded'
                        />
                        <CiSearch
                            size={30}
                            className='absolute right-2 top-1 p-1 cursor-pointer'
                        />
                    </div>
                    <div
                        className='flex justify-end text-white space-x-5'
                    >
                        <button
                            onClick={() => handleView('cash_in')}
                            className='px-8 py-2 flex items-center space-x-2 bg-[#01865F] active:ring-2 rounded'
                        >
                            <AiOutlinePlus />
                            <span>Cash In</span>
                        </button>
                        <button
                            onClick={() => handleView('cash_out')}
                            className='px-8 py-2 flex items-center space-x-2 bg-[#C93B3B] active:ring-2 rounded'
                        >
                            <AiOutlinePlus />
                            <span>Cash Out</span>
                        </button>
                    </div>
                </div>
                <Balance {...{}} />
                <div
                    className='flex justify-between '
                >
                    <p
                        className='text-sm space-x-3'
                    >
                        <span
                            className='text-gray-500'
                        >
                            Showing 1-2 of 2 Entries
                        </span>
                        {selected.length > 0 &&
                            <>
                                <span
                                    className='text-gray-200'
                                >
                                    |
                                </span>
                                <span>1 selected on this page.</span>
                            </>
                        }
                    </p>
                    <div
                        className='flex justify-end space-x-3'
                    >
                        <div
                            className='space-x-2'
                        >
                            <Menu>
                                <MenuButton
                                    className='border rounded'
                                >
                                    <button
                                        className='w-full px-2 py-1 flex justify-between items-center space-x-2 text-sm'
                                    >
                                        <span>Page 01</span>
                                        <TiArrowSortedDown />
                                    </button>
                                </MenuButton>
                                <MenuList>
                                    {
                                        durationsorts.map((sort, i) =>
                                            <MenuItem
                                                key={i}
                                                onClick={() => setDurationBy(sort)}
                                                className='space-x-2'
                                            >
                                                {sort.sort === durationBy.sort ?
                                                    <MdOutlineRadioButtonChecked className='text-[#4863D4]' />
                                                    :
                                                    <MdRadioButtonUnchecked />
                                                }
                                                <span>
                                                    {sort.title}
                                                </span>
                                            </MenuItem>
                                        )
                                    }
                                    <div>

                                    </div>
                                </MenuList>
                            </Menu>
                            <span className='text-sm'>of 01</span>
                        </div>
                        <div
                            className='flex items-center space-x-2'
                        >
                            <IoIosArrowBack
                                size={25}
                                className='p-1 bg-gray-200 rounded cursor-pointer'
                            />
                            <IoIosArrowForward
                                size={25}
                                className='p-1 bg-gray-200 rounded cursor-pointer'
                            />
                        </div>
                    </div>
                </div>
                <div
                    className='w-full overflow-y-auto'
                >
                    <table
                        className='w-full'
                    >
                        {selected.length > 0 ?
                            <thead
                                className='text-sm'
                            >
                                <tr
                                    className='bg-slate-100 border-b'
                                >
                                    <td
                                        colSpan={9}
                                        className='p-4'
                                    >
                                        <div
                                            className='flex items-center space-x-5'
                                        >
                                            <button
                                                className='flex items-center space-x-2'
                                            >
                                                {check ?
                                                    <MdOutlineCheckBox
                                                        size={20}
                                                        onClick={handleCheck}
                                                    />
                                                    :
                                                    <MdOutlineCheckBoxOutlineBlank
                                                        size={20}
                                                        onClick={handleCheck}
                                                    />
                                                }
                                                <span>Select all</span>
                                            </button>
                                            <span className='text-[#4863D4]'>|</span>
                                            <button
                                                className='px-2 py-0.5 flex items-center space-x-2 hover:bg-[#e7ebff] rounded'
                                            >
                                                <MdDeleteOutline
                                                    size={20}
                                                    className='text-red-500'
                                                />
                                                <span>Delete</span>
                                            </button>
                                            <span className='text-[#4863D4]'>|</span>
                                            <Menu>
                                                <MenuButton

                                                >
                                                    <button
                                                        className='flex items-center space-x-2 text-[#4863D4]'
                                                    >
                                                        <MdOutlineTurnRight
                                                            size={20}
                                                        />
                                                        <span>Move or Copy</span>
                                                        <MdOutlineArrowDropDown size={20} className='text-gray-500' />
                                                    </button>

                                                </MenuButton>
                                                <MenuList>
                                                    <MenuItem>
                                                        <button
                                                            className='p-2 flex space-x-2 text-gray-700'
                                                        >
                                                            <MdOutlineTurnRight size={20} />
                                                            <span>Move Entry</span>
                                                        </button>
                                                    </MenuItem>
                                                    <MenuItem>
                                                        <button
                                                            className='p-2 flex space-x-2'
                                                        >
                                                            <MdContentCopy size={20} />
                                                            <span>Copy Entry</span>
                                                        </button>
                                                    </MenuItem>
                                                    <MenuItem>
                                                        <button
                                                            className='p-2 flex space-x-2'
                                                        >
                                                            <TbPlusMinus size={20} />
                                                            <span>Copy Opposite Entry</span>
                                                        </button>
                                                    </MenuItem>
                                                </MenuList>
                                            </Menu>
                                            <span className='text-[#4863D4]'>|</span>
                                            <Menu>
                                                <MenuButton

                                                >
                                                    <button
                                                        className='flex items-center space-x-2 text-[#4863D4]'
                                                    >
                                                        <FaExchangeAlt
                                                            size={15}
                                                        />
                                                        <span>Change Field</span>
                                                        <MdOutlineArrowDropDown size={20} className='text-gray-500' />
                                                    </button>

                                                </MenuButton>
                                                <MenuList>
                                                    <MenuItem>
                                                        <button
                                                            className='p-2 flex space-x-2'
                                                        >
                                                            <MdOutlineCategory size={20} />
                                                            <span>Change Category</span>
                                                        </button>
                                                    </MenuItem>
                                                    <MenuItem>
                                                        <button
                                                            className='p-2 flex space-x-2'
                                                        >
                                                            <MdOutlinePayments size={20} />
                                                            <span>Change Payment Mode</span>
                                                        </button>
                                                    </MenuItem>
                                                    <MenuItem>
                                                        <button
                                                            className='p-2 flex space-x-2'
                                                        >
                                                            <HiOutlineUsers size={20} />
                                                            <span>Change Contact</span>
                                                        </button>
                                                    </MenuItem>
                                                </MenuList>
                                            </Menu>
                                        </div>
                                    </td>
                                </tr>
                            </thead>
                            :
                            <thead
                                className='text-sm'
                            >
                                <tr
                                    className='bg-slate-100 border-b'
                                >
                                    <td
                                        className='p-4'
                                    >

                                        {check ?
                                            <MdOutlineCheckBox
                                                size={20}
                                                onClick={handleCheck}
                                            />
                                            :
                                            <MdOutlineCheckBoxOutlineBlank
                                                size={20}
                                                onClick={handleCheck}
                                            />
                                        }
                                    </td>
                                    <td
                                        className='px-4 py-2'
                                    >
                                        Date & Time</td>
                                    <td
                                        className='px-4 py-2'
                                    >
                                        Details</td>
                                    <td
                                        className='px-4 py-2'
                                    >
                                        Category</td>
                                    <td
                                        className='px-4 py-2'
                                    >
                                        Mode</td>
                                    <td
                                        className='px-4 py-2'
                                    >
                                        Bill</td>
                                    <td
                                        className='px-4 py-2 text-right'
                                    >
                                        Amount</td>
                                    <td
                                        className='px-4 py-2 text-right'
                                    >
                                        Balance</td>
                                    <td
                                        className='px-4 py-2'
                                    >
                                    </td>
                                </tr>
                            </thead>
                        }

                        <tbody>
                            <tr
                            onMouseEnter={() => setMenuId(1)}
                                className='hover:bg-[#EBEEFD] cursor-pointer'
                                

                            >
                                <td
                                    className='px-4 py-2'
                                >

                                    {check ?
                                        <MdOutlineCheckBox
                                            size={20}
                                            onClick={handleCheck}
                                        />
                                        :
                                        <MdOutlineCheckBoxOutlineBlank
                                            size={20}
                                            onClick={handleCheck}
                                        />
                                    }
                                </td>
                                <td
                                onClick={handleDetails}
                                    className='px-4 py-2'
                                >
                                    <span>08 Jan 2024</span>
                                    <br />
                                    <span className='text-xs'>08:22pm</span>
                                </td>
                                <td
                                onClick={handleDetails}
                                    className='px-4 py-2'
                                >
                                    Robiul Awal
                                </td>
                                <td
                                onClick={handleDetails}
                                    className='px-4 py-2'
                                >

                                </td>
                                <td
                                onClick={handleDetails}
                                    className='px-4 py-2'
                                >

                                </td>
                                <td
                                onClick={handleDetails}
                                    className='px-4 py-2'
                                >

                                </td>
                                <td
                                onClick={handleDetails}
                                    className='px-4 py-2 text-right'
                                >
                                    1000
                                </td>
                                <td
                                onClick={handleDetails}
                                    className='px-4 py-2 text-right'
                                >
                                    1000
                                </td>
                                <td
                                    className='py-4 flex justify-center items-center'
                                >
                                    <div
                                        className={`flex space-x-3 ${menuId === 1 ? 'visible' : 'invisible'}`}
                                    >
                                        <RiEdit2Line
                                            size={22}
                                            onClick={()=>setUpdateView(!updateView)}
                                            className='text-[#4863D4] cursor-pointer'
                                        />
                                        <MdDeleteOutline
                                            size={22}
                                            onClick={()=>setDeleteView(!deleteView)}
                                            className='text-red-500 cursor-pointer'
                                        />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                {view &&
                    <AddEntry {...{
                        type : entryType,
                        setType : setEntryType,
                        view,setView
                    }}/>
                }
                {detailsView &&
                    <EntryDetails {...{
                        id : menuId,
                        view : detailsView,
                        setView : setDetailsView
                    }}/>
                }
                {updateView &&
                    <UpdateEntry {...{
                        id : menuId,
                        view : updateView,
                        setView : setUpdateView
                    }}/>
                }
                {deleteView &&
                    <DeleteEntry {...{
                        id : menuId,
                        view : deleteView,
                        setView : setDeleteView
                    }}/>
                }
            </div>

        </UserLayout>
    );
};

export default Transactions;