import axios from "axios"
import { notificationNOT, notificationOK } from "../utils/toastNotification"
import api from "../utils/api"
import socket from "../utils/socket"

export const getBooks = async (id,dispatch, action) => {
    try {
        const res = await axios.get(`${api}/book/${id}`, {
            headers: {
                "cb-access-token": localStorage.getItem("cb_access_token")
            }
        })
        if (res.data.status === 200) {
            dispatch(action({id : id, data : res.data.data}))
        }
    } catch (err) {
        console.log(err)
    }
}

export const createBook = async (data) => {
    const {id, name, setLoading, dispatch, addBook, refresh, setView} = data
    try {
        setLoading(true)
        const res = await axios.post(`${api}/book/${id}`, { name }, {
            headers: {
                "cb-access-token": localStorage.getItem("cb_access_token")
            }
        })
        if (res.data.status === 200) {
            setLoading(false)
            notificationOK(res.data.message)
            dispatch(addBook(res.data.data))
            dispatch(refresh())
            setView(false)
        }
    } catch (err) {
        console.log(err)
        setLoading(false)
        notificationNOT(err.message)
    }
}

export const updateBook = async (id, name, setLoading, dispatch, action, refresh, setView, isCurrent, addCurrentBook) => {
    try {
        setLoading(true)
        const res = await axios.put(`${api}/book/${id}`, { name }, {
            headers: {
                "cb-access-token": localStorage.getItem("cb_access_token")
            }
        })
        if (res.data.status === 200) {
            setLoading(false)
            notificationOK(res.data.message)
            dispatch(action(res.data.data))
            dispatch(refresh())
            setView(false)
            if (isCurrent) {
                dispatch(addCurrentBook(res.data.data))
            }
            socket.emit('update_book',{book : res.data.data})
        }
    } catch (error) {
        setLoading(false)
        notificationNOT(error.message)
        console.log(error)
    }
}

export const deleteBook = async (name, book, router, setLoading, dispatch, action, refresh, setView) => {
    if (name !== book?.name) {
        return notificationNOT('Correctly type the book name.')
    }
    try {
        setLoading(true)
        const res = await axios.delete(`${api}/book/${book._id}`, {
            headers: {
                "cb-access-token": localStorage.getItem("cb_access_token")
            }
        })
        if (res.data.status === 200) {
            setLoading(false)
            router.push("/")
            dispatch(action(book._id))
            dispatch(refresh())
            setView(false)
            router.push(`/business/${book?.business}/cashbooks`)
        }
    } catch (err) {
        console.log(err)
        setLoading(false)
        notificationNOT(err.message)
    }
}

export const moveBook = async (data) => {
    const {id, to, setLoading, dispatch, action,refresh, setView} = data
    try {
        setLoading(true)
        const res = await axios.put(`${api}/book/move?id=${id}&to=${to}`, {},{
            headers: {
                "cb-access-token": localStorage.getItem("cb_access_token")
            }
        })
        if (res.data.status === 200) {
            console.log(res.data.data)
            setLoading(false)
            dispatch(refresh())
            dispatch(action(res.data.data))
            setView(false)
            socket.emit('update_book', {book : res.data.data})
        }
    } catch (err) {
        console.log(err)
        setLoading(false)
        notificationNOT(err.message)
    }
}

export const copyBook = async (data) => {
    const {id, values, setLoading, dispatch, action,refresh, setView} = data
    try {
        setLoading(true)
        const res = await axios.put(`${api}/book/copy?id=${id}`, {values},{
            headers: {
                "cb-access-token": localStorage.getItem("cb_access_token")
            }
        })
        if (res.data.status === 200) {
            setLoading(false)
            // dispatch(refresh())
            // dispatch(action(res.data.data))
            // setView(false)
        }
    } catch (err) {
        console.log(err)
        setLoading(false)
        notificationNOT(err.message)
    }
}