import React, { useEffect, useState } from 'react';
import { Balance, Entry_Add, Entry_Category, Entry_Contact, Entry_Delete, Entry_Details, Entry_Duplicate, Entry_Move, Entry_Opposite, Entry_Payment, Entry_Update, Transections_Header, Transections_NoFound, Transections_Pagination, Transections_Search, Transections_SortBy, Transections_Tbody, Transections_TheadAction, Transections_TheadMain, UserLayout } from '../../../../../components/Index';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux'
import Head from 'next/head'
import { addEntries } from '../../../../../store/slice/bookSlice';
import axios from 'axios'

const Transactions = () => {
    const { entries, currentBook } = useSelector(state => state.book)
    const router = useRouter()
    const {bookid} = router.query
    const dispatch = useDispatch()
    const [loading,setLoading] = useState(false)
    const [menuId, setMenuId] = useState(null)
    const [check, setCheck] = useState(false)
    const [selected, setSelected] = useState([])
    const [view, setView] = useState(false)
    const [detailsView, setDetailsView] = useState(false)
    const [deleteView, setDeleteView] = useState(false)
    const [updateView, setUpdateView] = useState(false)
    const [copyView, setCopyView] = useState(false)
    const [moveView, setMoveView] = useState(false)
    const [oppositeView, setOppositeView] = useState(false)
    const [categoryView, setCategoryView] = useState(false)
    const [paymentView, setPaymentView] = useState(false)
    const [contactView, setContactView] = useState(false)
    const [entryType, setEntryType] = useState('cash_in')
    const [durationBy, setDurationBy] = useState({
        title: 'All Time',
        sort: 'all_time'
    })
    const [typeBy, setTypeBy] = useState({
        title: 'All',
        sort: 'all'
    })

    const handleCheck = () => {
        setCheck(!check)
        setSelected([...selected, '123'])
    }

    const handleView = (type) => {
        setEntryType(type)
        setView(!view)
    }

    const handleDetails = () => {
        setDetailsView(!deleteView)
    }

    const getTransections = async (id) => {
        setLoading(!loading)
        try {
            const res = await axios.get(`/api/entry?id=${id}`, {
                headers: {
                    "cb-access-token": localStorage.getItem("cb_access_token")
                }
            })
            if(res.data.success) {
                console.log(res.data)
                setLoading(!loading)
                dispatch(addEntries(res.data.data))
            }
        } catch (error) {
            console.log(error)
            setLoading(!loading)
        }
    }

    useEffect(() => {
        bookid && getTransections(bookid)
    }, [bookid])

    return (
        <UserLayout>
            <div
                className='px-8 space-y-5'
            >
                <Head>
                    <title>{currentBook?.name}'s Transactions - CashBook</title>
                </Head>

                <Transections_Header />

                <Transections_SortBy {...{
                    typeBy, setTypeBy,
                    durationBy, setDurationBy
                }} />

                <Transections_Search {...{ handleView }} />


                {entries?.length > 0 &&
                    <Balance />
                }

                {entries?.length > 0 &&
                    <Transections_Pagination {...{ selected }} />
                }

                <div
                    className='w-full overflow-y-auto'
                >
                    {entries?.length > 0 ?
                        <table
                            className='w-full'
                        >
                            {selected.length > 0 ?
                                <Transections_TheadAction {...{
                                    check,
                                    handleCheck,
                                    copyView, setCopyView,
                                    moveView, setMoveView,
                                    oppositeView, setOppositeView,
                                    categoryView, setCategoryView,
                                    paymentView, setPaymentView,
                                    contactView, setContactView,

                                }} />
                                :
                                <Transections_TheadMain {...{
                                    check,
                                    handleCheck
                                }} />
                            }

                            <Transections_Tbody {...{
                                menuId, setMenuId,
                                check,
                                handleCheck,
                                handleDetails,
                                deleteView, setDeleteView,
                                updateView, setUpdateView
                            }} />
                        </table>
                        :
                        <Transections_NoFound />
                    }
                </div>

                {view &&
                    <Entry_Add {...{
                        type: entryType,
                        setType: setEntryType,
                        view, setView
                    }} />
                }

                {detailsView &&
                    <Entry_Details {...{
                        id: menuId,
                        view: detailsView,
                        setView: setDetailsView
                    }} />
                }

                {updateView &&
                    <Entry_Update {...{
                        id: menuId,
                        view: updateView,
                        setView: setUpdateView
                    }} />
                }

                {deleteView &&
                    <Entry_Delete {...{
                        id: menuId,
                        view: deleteView,
                        setView: setDeleteView
                    }} />
                }

                {moveView &&
                    <Entry_Move {...{
                        id: menuId,
                        view: moveView,
                        setView: setMoveView
                    }} />
                }

                {copyView &&
                    <Entry_Duplicate {...{
                        id: menuId,
                        view: copyView,
                        setView: setCopyView
                    }} />
                }

                {oppositeView &&
                    <Entry_Opposite {...{
                        id: menuId,
                        view: oppositeView,
                        setView: setOppositeView
                    }} />
                }

                {categoryView &&
                    <Entry_Category {...{
                        id: menuId,
                        view: categoryView,
                        setView: setCategoryView
                    }} />
                }

                {paymentView &&
                    <Entry_Payment {...{
                        id: menuId,
                        view: paymentView,
                        setView: setPaymentView
                    }} />
                }

                {contactView &&
                    <Entry_Contact {...{
                        id: menuId,
                        view: contactView,
                        setView: setContactView
                    }} />
                }
            </div>

        </UserLayout>
    );
};

export default Transactions;