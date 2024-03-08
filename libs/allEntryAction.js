import axios from "axios"
import { notificationNOT, notificationOK } from "../utils/toastNotification"
import api from "../utils/api"
import moment from "moment"
import socket from "../utils/socket"

export const createEntry = async (data) => {
    const { id, value, setLoading, dispatch, action, setView } = data
    try {
        setLoading(true)
        const res = await axios.post(`${api}/transection/${id}`, value, {
            headers: {
                "cb-access-token": localStorage.getItem("cb_access_token")
            }
        })
        if (res.data.success) {
            setLoading(false)
            notificationOK(res.data.message)
            dispatch(action(res.data.data))
            setView(false)
            socket.emit('add_transection',id)
        }
    } catch (err) {
        console.log(err)
        setLoading(false)
        notificationNOT(err.message)
    }
}

export const createEntryOther = async (data) => {
    const { id, value, setLoading, dispatch, action, setDate, setHour, setMinute, setAmPm, setValue, setContact, setCategory, setPayment } = data
    try {
        setLoading(true)
        const res = await axios.post(`${api}/transection/${id}`, value, {
            headers: {
                "cb-access-token": localStorage.getItem("cb_access_token")
            }
        })
        if (res.data.success) {
            setLoading(false)
            notificationOK(res.data.message)
            dispatch(action(res.data.data))
            setDate(moment().format('YYYY-MM-DD'))
            setHour(moment().format('hh'))
            setMinute(moment().format('mm'))
            setAmPm(moment().format('A'))
            setValue({
                amount: '',
                remark: '',
            })
            setContact({})
            setCategory({})
            setPayment({})
            socket.emit('add_transection',id)
        }
    } catch (err) {
        console.log(err)
        setLoading(false)
        notificationNOT(err.message)
    }
}

export const updateEntry = async (data) => {
    const { value,book, setLoading, dispatch, action, refresh, setView } = data

    try {
        setLoading(true)
        const res = await axios.put(`${api}/transection/${value._id}`, value, {
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
            socket.emit('update_transection',{id : book,entry : res.data.data})
        }
    } catch (err) {
        setLoading(false)
        notificationNOT(err.message)
    }
}

export const deleteEntry = async (data) => {
    const {book, id, setLoading, dispatch, action, setView,setDetailsView } = data
    try {
        setLoading(true)
        const res = await axios.delete(`${api}/transection/${id}`, {
            headers: {
                "cb-access-token": localStorage.getItem("cb_access_token")
            }
        })
        if (res.data.status === 200) {
            setLoading(false)
            notificationOK(res.data.message)
            dispatch(action(id))
            setView(false)
            if(setDetailsView){
                setDetailsView(false)
            }
            socket.emit('delete_transection',{id : book,entry : id})
        }
    } catch (err) {
        setLoading(false)
        notificationNOT(err.message)
    }
}

export const deleteEntryMany = async (data) => {
    const { items, setLoading, dispatch, action, setView } = data
    try {
        setLoading(true)
        const res = await axios.put(`${api}/transection/deletemany`,
            { entries: items },
            {
                headers: {
                    "cb-access-token": localStorage.getItem("cb_access_token")
                }
            })
        if (res.data.status === 200) {
            setLoading(false)
            notificationOK(res.data.message)
            items.forEach(id => {
                dispatch(action(id))
            })
            setView(false)
        }
    } catch (err) {
        setLoading(false)
        notificationNOT(err.message)
    }
}

export const entryDetails = async (data) => {
    const { id, setEntry, setLoading } = data
    try {
        const res = await axios.get(`${api}/transection/${id}`, {
            headers: {
                "cb-access-token": localStorage.getItem("cb_access_token")
            }
        })
        if (res.data.success) {
            setEntry(res.data.data)
            setLoading(false)
        }
    } catch (err) {
        console.log(err)
        setLoading(false)
    };
}

export const moveEntry = async (data) => {
    const { to, value, setLoading, dispatch, action, setView, setFirstView, setConfirmView } = data

    try {
        setLoading(true)
        const res = await axios.put(`${api}/transection/move?to=${to}`, { entries: value }, {
            headers: {
                "cb-access-token": localStorage.getItem("cb_access_token")
            }
        })
        if (res.data.status === 200) {
            setLoading(false)
            notificationOK(res.data.message)
            setView(false)
            setFirstView(false)
            setConfirmView(false)
            value.forEach(id => {
                dispatch(action(id))
            })
        }
    } catch (err) {
        setLoading(false)
        notificationNOT(err.message)
    }
}

export const copyEntry = async (data) => {
    const { to, value, setLoading, setView, setFirstView, setConfirmView } = data

    try {
        setLoading(true)
        const res = await axios.put(`${api}/transection/copy?to=${to}`, { entries: value }, {
            headers: {
                "cb-access-token": localStorage.getItem("cb_access_token")
            }
        })
        if (res.data.status === 200) {
            setLoading(false)
            notificationOK(res.data.message)
            setView(false)
            setFirstView(false)
            setConfirmView(false)
        }
    } catch (err) {
        setLoading(false)
        notificationNOT(err.message)
    }
}

export const oppositeEntry = async (data) => {
    const { to, value, setLoading, setView, setFirstView, setConfirmView } = data

    try {
        setLoading(true)
        const res = await axios.put(`${api}/transection/opposite?to=${to}`, { entries: value }, {
            headers: {
                "cb-access-token": localStorage.getItem("cb_access_token")
            }
        })
        if (res.data.status === 200) {
            setLoading(false)
            notificationOK(res.data.message)
            setView(false)
            setFirstView(false)
            setConfirmView(false)
        }
    } catch (err) {
        setLoading(false)
        notificationNOT(err.message)
    }
}

export const importEntry = async (data) => {
    const { book, entries, setLoading, setView } = data

    try {
        setLoading(true)
        const res = await axios.post(`${api}/transection/import/${book}`, { entries }, {
            headers: {
                "cb-access-token": localStorage.getItem("cb_access_token")
            }
        })
        if (res.data.status === 200) {
            setLoading(false)
            notificationOK(res.data.message)
            setView(false)
            socket.emit('import_transecion', {id : book})
        }
    } catch (err) {
        setLoading(false)
        notificationNOT(err.message)
    }
}

export const ccpUpdateEntry = async (data) => {
    const { field, id, items, dispatch, action, setLoading, setView, setFirstView } = data

    try {
        setLoading(true)
        const res = await axios.put(`${api}/transection/ccp_update?field=${field}&f_id=${id}`, { entries: items }, {
            headers: {
                "cb-access-token": localStorage.getItem("cb_access_token")
            }
        })
        if (res.data.status === 200) {
            const { message, data } = res.data
            setLoading(false)
            notificationOK(res.data.message)
            data.forEach(entry => {
                dispatch(action(entry))
            })
            setView(false)
            setFirstView(false)
        }
    } catch (err) {
        console.log(err)
        setLoading(false)
        notificationNOT(err.message)
    }
}