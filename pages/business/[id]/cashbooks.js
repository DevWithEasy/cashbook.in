import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Book_Add, Book_Duplicate, Book_Move, Book_Update, Cashbooks_Book, Cashbooks_Contact, Cashbooks_Header, Cashbooks_NoBook, Cashbooks_Search, UserLayout } from '../../../components/Index';
import { getBooks } from '../../../libs/allBookAction';
import { addCurrentBooks, addCurrentBusiness, reAddCurrentBooks } from '../../../store/slice/bookSlice';

const Cashbooks = () => {
    const { businesses,currentBusiness,currentBooks, books,random } = useSelector(state => state.book)
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

    const getBusinessBooks = async() => {
        const findBusiness = businesses.find(business => business._id === router.query.id)
        dispatch(addCurrentBusiness(findBusiness))

        const findbooks = books.filter(book => book.business == router.query.id)
        dispatch(addCurrentBooks(findbooks))

        getBooks(router.query.id,dispatch,reAddCurrentBooks)
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
                                        <Cashbooks_NoBook {...{ view, setView }} />
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
                            view: duplicateView,
                            setView: setDuplicateView
                        }} />
                    }
                    {moveView &&
                        <Book_Move {...{
                            view: moveView,
                            setView: setMoveView
                        }} />
                    }
                </div>
        </UserLayout>
    );
}

export default Cashbooks;