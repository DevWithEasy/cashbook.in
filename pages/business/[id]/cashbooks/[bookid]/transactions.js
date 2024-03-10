"use client"
import React, { useEffect, useState } from 'react';
import { Balance, Entry_Add, Entry_Category, Entry_Contact, Entry_Delete, Entry_Delete_Many, Entry_Details, Entry_Duplicate, Entry_Move, Entry_Opposite, Entry_Payment, Entry_Update, Loading, Transections_Header, Transections_NoFound, Transections_Pagination, Transections_Search, Transections_SortBy, Transections_Tbody, Transections_TheadAction, Transections_TheadMain, UserLayout, Transections_List, Transection_Export } from '../../../../../components/Index';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux'
import Head from 'next/head'
import { addEntries } from '../../../../../store/slice/bookSlice';
import axios from 'axios'
import api from '../../../../../utils/api';
import Permission from '../../../../../utils/Permission';

const Transactions = () => {
    const { entries, currentBook, currentBusiness } = useSelector(state => state.book)
    const { user } = useSelector(state => state.auth)
    const permission = new Permission(user, currentBook, currentBusiness)
    const router = useRouter()
    const { bookid } = router.query
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [menuId, setMenuId] = useState(null)
    const [check, setCheck] = useState(false)
    const [selected, setSelected] = useState([])
    const [view, setView] = useState(false)
    const [detailsView, setDetailsView] = useState(false)
    const [deleteView, setDeleteView] = useState(false)
    const [deleteManyView, setDeleteManyView] = useState(false)
    const [updateView, setUpdateView] = useState(false)
    const [copyView, setCopyView] = useState(false)
    const [moveView, setMoveView] = useState(false)
    const [oppositeView, setOppositeView] = useState(false)
    const [categoryView, setCategoryView] = useState(false)
    const [paymentView, setPaymentView] = useState(false)
    const [contactView, setContactView] = useState(false)
    const [exportView, setExportView] = useState(false)
    const [exportType, setExportType] = useState('')
    const [entryType, setEntryType] = useState('cash_in')
    const [durationBy, setDurationBy] = useState({
        title: 'All Time',
        sort: 'all_time'
    })
    const [typeBy, setTypeBy] = useState({
        title: 'All',
        sort: 'all'
    })

    const handleSelectAll = () => {
        if (selected.length === 0) {
            setSelected(entries.map(e => e._id))
        } else {
            setSelected([])
        }
    }
    // const handleSelect=(id)=>{
    //     setCheck()
    // }

    const handleView = (type) => {
        setEntryType(type)
        setView(!view)
    }

    const handleDetails = () => {
        setDetailsView(!deleteView)
    }

    const getTransections = async (id) => {
        dispatch(addEntries([]))
        setLoading(true)
        try {
            const res = await axios.get(`${api}/transection/all/${id}`, {
                headers: {
                    "cb-access-token": localStorage.getItem("cb_access_token")
                }
            })
            if (res.data.success) {
                setLoading(false)
                dispatch(addEntries(res.data.data))
            }
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    useEffect(() => {
        bookid && getTransections(bookid)
    }, [bookid])

    return (
        <UserLayout>
            {!loading ?
                <div
                    className='h-[calc(100vh-48px)] bg-gray-100 md:bg-white space-y-2 md:space-y-5 overflow-y-auto'
                >
                    <Head>
                        <title>{currentBook?.name}s Transactions - CashBook</title>
                    </Head>

                    <Transections_Header {...{ permission,setExportType,setExportView }} />

                    <div
                        className='px-4 md:px-8 space-y-2 md:space-y-5'
                    >
                        <Transections_SortBy {...{
                            typeBy, setTypeBy,
                            durationBy, setDurationBy
                        }} />

                        <Transections_Search {...{ handleView, permission }} />


                        {entries?.length > 0 &&
                            <Balance />
                        }

                        {entries?.length > 0 &&
                            <Transections_Pagination {...{ selected }} />
                        }

                        <div
                            className='w-full'
                        >
                            {entries?.length > 0 ?
                                <>
                                    <Transections_List {...{
                                        detailsView, setDetailsView,
                                        setMenuId
                                    }} />
                                    <div
                                        className='hidden md:block w-full overflow-y-auto'
                                    >
                                        <table
                                            className='w-full sticky'
                                        >
                                            {selected.length > 0 ?
                                                <Transections_TheadAction {...{
                                                    selected,
                                                    handleSelectAll,
                                                    copyView, setCopyView,
                                                    moveView, setMoveView,
                                                    oppositeView, setOppositeView,
                                                    categoryView, setCategoryView,
                                                    paymentView, setPaymentView,
                                                    contactView, setContactView,
                                                    deleteManyView, setDeleteManyView
                                                }} />
                                                :
                                                <Transections_TheadMain {...{
                                                    selected,
                                                    handleSelectAll,
                                                }} />
                                            }

                                            <Transections_Tbody {...{
                                                menuId, setMenuId,
                                                selected,
                                                setSelected,
                                                handleSelectAll,
                                                handleDetails,
                                                deleteView, setDeleteView,
                                                updateView, setUpdateView,
                                                permission
                                            }} />
                                        </table>
                                    </div>

                                </>

                                :
                                <Transections_NoFound {...{ loading }} />
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
                                setView: setDetailsView,
                                permission
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

                        {deleteManyView &&
                            <Entry_Delete_Many {...{
                                items: selected,
                                view: deleteManyView,
                                setView: setDeleteManyView
                            }} />
                        }

                        {moveView &&
                            <Entry_Move {...{
                                items: selected,
                                view: moveView,
                                setView: setMoveView
                            }} />
                        }

                        {copyView &&
                            <Entry_Duplicate {...{
                                items: selected,
                                view: copyView,
                                setView: setCopyView
                            }} />
                        }

                        {oppositeView &&
                            <Entry_Opposite {...{
                                items: selected,
                                view: oppositeView,
                                setView: setOppositeView
                            }} />
                        }

                        {categoryView &&
                            <Entry_Category {...{
                                items: selected,
                                view: categoryView,
                                setView: setCategoryView
                            }} />
                        }

                        {paymentView &&
                            <Entry_Payment {...{
                                items: selected,
                                view: paymentView,
                                setView: setPaymentView
                            }} />
                        }

                        {contactView &&
                            <Entry_Contact {...{
                                items: selected,
                                view: contactView,
                                setView: setContactView
                            }} />
                        }
                        {exportView &&
                            <Transection_Export {...{
                                exportType,
                                view: exportView,
                                setView: setExportView
                            }} />
                        }
                    </div>
                </div>
                :
                <Loading />
            }

        </UserLayout>
    );
};

export default Transactions;