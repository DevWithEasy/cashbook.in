import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UserLayout, Cashbooks_Book, Cashbooks_Contact, Cashbooks_Header, Cashbooks_NoBook, Cashbooks_Search, Book_Add, Book_Duplicate, Book_Move, Book_Update } from '../../../components/Index'
import { addBooks, addBusinesses, addCurrentBusiness } from '../../../store/slice/bookSlice';
import { notificationNOT } from '../../../utils/toastNotification';
import Loading from '../../../components/Loading';

const Cashbooks = () => {
    const { currentBusiness, books } = useSelector(state => state.book)
    const dispatch = useDispatch()
    const router = useRouter()
    const [sortBy, setSortBy] = useState({
        title: 'Last Update',
        sort: 'last_update'
    })
    const [loading, setLoading] = useState(false)
    const [view, setView] = useState(false)
    const [updateView, setUpdateView] = useState(false)
    const [duplicateView, setDuplicateView] = useState(false)
    const [moveView, setMoveView] = useState(false)
    const [id, setId] = useState(null)

    const getBusiness = async () => {
        try {
            setLoading(true)
            const res = await axios.get(`/api/business/?q=${router.query.id}`, {
                headers: {
                    "cb-access-token": localStorage.getItem("cb_access_token")
                }
            })
            if (res.data.success) {
                const { data } = res.data
                setLoading(false)
                dispatch(addBusinesses(data.bussinesses))
                dispatch(addCurrentBusiness(data.bussinesses.find(business => business._id === router.query.id)))
                dispatch(addBooks(data.books))
            }
        } catch (err) {
            setLoading(false)
            notificationNOT(err.message)
        }
    }

    useEffect(() => {
        router.query.id && getBusiness()
    }, [currentBusiness?._id])

    return (
        <UserLayout>
            {!loading ?
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

                                {books?.length > 0 ?
                                    <div>
                                        {
                                            books.map(book =>
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
                        id,
                        view: updateView,
                        setView: setUpdateView
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
            :
            <Loading/>
            }
        </UserLayout>
    );
}

export default Cashbooks;