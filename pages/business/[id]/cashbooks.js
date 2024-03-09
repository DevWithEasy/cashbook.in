"use client"
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Book_Add, Book_Duplicate, Book_Move, Book_Update, Cashbooks_Book, Cashbooks_Contact, Cashbooks_Header, Cashbooks_NoBook, Cashbooks_NoBook_Staff, Cashbooks_Search, UserLayout } from '../../../components/Index';
import { getBooks } from '../../../libs/allBookAction';
import { addCurrentBooks, addCurrentBusiness, reAddCurrentBooks } from '../../../store/slice/bookSlice';
import BusinessManager from '../../../utils/BusinessManager';
import { GoPlus } from 'react-icons/go';

const Cashbooks = () => {
    const { businesses, currentBusiness, books, random } = useSelector(state => state.book)
    const { user } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const router = useRouter()
    const [sortBy, setSortBy] = useState({
        title: 'Last Update',
        sort: 'last_update'
    })
    const [view, setView] = useState(false)
    const [updateView, setUpdateView] = useState(false)
    const [duplicateView, setDuplicateView] = useState(false)
    const [moveView, setMoveView] = useState(false)
    const [id, setId] = useState(null)

    const businessManager = new BusinessManager(user, books, businesses, currentBusiness)
    const role = businessManager.getRole(currentBusiness)

    const bi_Books = businessManager.getCurrenBooks(router.query.id)

    const getBusinessBooks = async () => {

        getBooks(router.query.id, dispatch, reAddCurrentBooks)

        const findBusiness = businesses.find(business => business._id === router.query.id)
        dispatch(addCurrentBusiness(findBusiness))

        const findbooks = books.filter(book => book.business == router.query.id)
        dispatch(addCurrentBooks(findbooks))

    }

    useEffect(() => {
        router.query.id && getBusinessBooks()
    }, [router.query.id, random])
    
    return (
        <UserLayout>
            <div
                className='h-[calc(100vh-48px)] bg-gray-100 md:bg-white'
            >
                <Head>
                    <title>{currentBusiness?.name} - CashBook</title>
                </Head>

                <Cashbooks_Header />

                <div>
                    <div
                        className='p-4 md:p-6'
                    >
                        <div
                            onClick={() => setView(!view)}
                            className='fixed bottom-7 right-3 md:hidden px-4 py-2 flex justify-center space-x-2 items-center bg-[#4863D4] text-white rounded-full cursor-pointer'
                        >
                            <GoPlus
                                size={20}
                                className='p-0.5 text-3xl rounded-md'
                            />
                            <span>Add New Book</span>
                        </div>
                        <div
                            className='flex justify-between space-x-5'
                        >
                            <div
                                className='w-full md:w-9/12 space-y-5'
                            >
                                <Cashbooks_Search {...{ sortBy, setSortBy }} />

                                {bi_Books?.length > 0 ?
                                    <div
                                        className='space-y-2 md:space-y-0'
                                    >
                                        {
                                            bi_Books.map(book =>
                                                <Cashbooks_Book key={book._id}
                                                    {...{
                                                        book,
                                                        setId, updateView, setUpdateView, duplicateView, setDuplicateView, moveView, setMoveView
                                                    }} />
                                            )
                                        }
                                    </div>
                                    :
                                    <>
                                        {role === 'Owner' || role === 'Partner' ?
                                            <Cashbooks_NoBook {...{ view, setView }} />
                                            :
                                            <Cashbooks_NoBook_Staff />
                                        }
                                    </>
                                }
                            </div>
                            <div
                                className='hidden md:block md:w-3/12 px-4 space-y-5'
                            >
                                <Cashbooks_Contact {...{ view, setView }} />
                            </div>
                        </div>
                    </div>
                </div>

                {view &&
                    <Book_Add {...{ view, setView }} />
                }
                {updateView &&
                    <Book_Update {...{
                        id,
                        view: updateView,
                        setView: setUpdateView,
                        isCurrent: false
                    }} />
                }
                {duplicateView &&
                    <Book_Duplicate {...{
                        id,
                        view: duplicateView,
                        setView: setDuplicateView
                    }} />
                }
                {moveView &&
                    <Book_Move {...{
                        id,
                        view: moveView,
                        setView: setMoveView
                    }} />
                }
            </div>
        </UserLayout>
    );
}

export default Cashbooks;