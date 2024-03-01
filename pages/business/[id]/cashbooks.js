import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Book_Add, Book_Duplicate, Book_Move, Book_Update, Cashbooks_Book, Cashbooks_Contact, Cashbooks_Header, Cashbooks_NoBook, Cashbooks_NoBook_Staff, Cashbooks_Search, UserLayout } from '../../../components/Index';
import { getBooks } from '../../../libs/allBookAction';
import { addCurrentBooks, addCurrentBusiness, reAddCurrentBooks } from '../../../store/slice/bookSlice';
import BusinessManager from '../../../utils/BusinessManager';

const Cashbooks = () => {
    const { businesses,currentBusiness,currentBooks, books,random } = useSelector(state => state.book)
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

    const businessManager = new BusinessManager(user,books, businesses, currentBusiness)
    const role = businessManager.getRole(currentBusiness)

    businessManager.getCurrenBooks(router.query.id)

    const getBusinessBooks = async() => {

        getBooks(router.query.id,dispatch,reAddCurrentBooks)

        const findBusiness = businesses.find(business => business._id === router.query.id)
        dispatch(addCurrentBusiness(findBusiness))

        const findbooks = books.filter(book => book.business == router.query.id)
        dispatch(addCurrentBooks(findbooks))

    }

    useEffect(() => {
        router.query.id && getBusinessBooks()
    }, [router.query.id,random])

    return (
        <UserLayout>
            <div>
                    <Head>
                        <title>{currentBusiness?.name} - CashBook</title>
                    </Head>

                    <Cashbooks_Header />

                    <div>
                        <div
                            className='p-6'
                        >
                            <div
                                className='flex justify-between space-x-5'
                            >
                                <div
                                    className='w-9/12 space-y-5'
                                >
                                    <Cashbooks_Search {...{ sortBy, setSortBy }} />

                                    {currentBooks?.length > 0 ?
                                        <div>
                                            {
                                                currentBooks.map(book =>
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
                                                <Cashbooks_NoBook_Staff/>
                                            }
                                        </>
                                    }
                                </div>
                                <div
                                    className='w-3/12 px-4 space-y-5'
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
                            view: updateView,
                            setView: setUpdateView,
                            isCurrent : false
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