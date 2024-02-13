import {
    Drawer,
    DrawerContent,
    DrawerOverlay
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { IoMdArrowRoundForward } from "react-icons/io";
import { useSelector } from 'react-redux'
import { Book_Add, Entry_Duplicate_Confirm } from '../Index';
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from 'react-icons/md';
import moment from 'moment';

const Entry_Duplicate = ({ id, view, setView }) => {
    const { entries, currentBook, books } = useSelector(state => state.book)
    const avialabeBook = books.filter(book => book._id !== currentBook._id)
    const entry = entries.find(entry => entry._id === id)
    const [book, setBook] = useState(avialabeBook.length > 0 ? avialabeBook[0] : {})
    const [addBookView, setAddBookView] = useState(false)
    const [confirmView, setConfirmView] = useState(false)

    console.log(avialabeBook, entry)

    return (
        <>
            <Drawer
                isOpen={view}
                placement='right'
                size='lg'
            >
                <DrawerOverlay />
                <DrawerContent>
                    <div
                        className='h-16 px-6 py-4 flex justify-between items-center border-b'
                    >
                        <p className='text-xl'>Move Book</p>
                        <button
                            onClick={() => setView(!view)}
                            className='px-4 py-1 border rounded'
                        >X</button>
                    </div>
                    <div
                        className='h-[calc(100vh-208px)] p-6 space-y-3 overflow-y-auto'
                    >
                        <div
                            className='space-y-2'
                        >
                            <p>Select a book where you want to move this entry

                            </p>
                            <input
                                placeholder='Enter New Book Name'
                                className='w-full p-2 border rounded focus:outline-[#4863D4]'
                            />
                        </div>
                        {avialabeBook?.length > 0 ?
                            <div
                                className='space-y-2'
                            >
                                {
                                    avialabeBook.map(b =>
                                        <div
                                            key={b._id}
                                            onClick={() => setBook(b)}
                                            className={`py-2 flex space-x-3 border-b ${book?._id === b._id ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                                        >
                                            {book?._id === b._id ?
                                                <MdRadioButtonChecked size={25} className='text-[#4863D4]' />
                                                :
                                                <MdRadioButtonUnchecked size={25} />
                                            }
                                            <div
                                                className='space-y-1'
                                            >
                                                <p className=''>{b?.name}</p>
                                                <p className='text-sm text-gray-500'>
                                                    <span>Created on : {moment(b?.createdAt).fromNow()}</span>
                                                    <span> | </span>
                                                    <span>{book?.members?.length + 1} Members</span>
                                                </p>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                            :
                            <div
                                className='pt-10 flex flex-col justify-center items-center space-y-3'
                            >
                                <p className='text-sm text-gray-500 text-center'>No books found for this action</p>
                                <button
                                    onClick={() => setAddBookView(!addBookView)}
                                    className='px-6 py-2 text-[#4863D4] hover:bg-gray-50 border rounded'
                                >
                                    Create New Book
                                </button>
                            </div>
                        }
                    </div>
                    <div
                        className='h-16 px-6 py-4 flex justify-between items-center text-sm bg-gray-100'
                    >
                        <div
                            className='w-full'
                        >
                            <p className='text-gray-500'>Moving From</p>
                            <p>{currentBook?.name}</p>
                        </div>
                        <IoMdArrowRoundForward size={40} />
                        <div
                            className='w-full pl-4'
                        >
                            <p className='text-gray-500'>Moving From</p>
                            <p>
                                {book?.name ? book?.name : 'Please select a valid book'}
                            </p>
                        </div>
                    </div>
                    <div
                        className='h-20 px-6 flex justify-end items-center space-x-5'
                    >
                        <button
                            onClick={() => setView(!view)}
                            className='px-6 py-3 text-[#4863D4] border rounded'
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => setConfirmView(!confirmView)}
                            className={`px-8 py-3 border rounded ${book?.name ? 'bg-[#4863D4] text-white' : 'bg-gray-100 text-gray-600 cursor-not-allowed'}`}
                            disabled={book?.name ? false : true}
                        >
                            Copy
                        </button>
                    </div>

                    {addBookView &&
                        <Book_Add {...{
                            view: addBookView,
                            setView: setAddBookView
                        }} />
                    }
                    {confirmView &&
                        <Entry_Duplicate_Confirm {...{
                            book,
                            view: confirmView,
                            setView: setConfirmView
                        }} />
                    }
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default Entry_Duplicate;