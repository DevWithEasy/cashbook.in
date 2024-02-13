import axios from "axios"
import { notificationNOT, notificationOK } from "../utils/toastNotification"

export const createEntry = async (data) => {
    const { id, value, setLoading, dispatch, action, setView } = data
    try {
        setLoading(true)
        const res = await axios.post(`/api/transections/${id}`, value, {
            headers: {
                "cb-access-token": localStorage.getItem("cb_access_token")
            }
        })
        if (res.data.success) {
            setLoading(false)
            notificationOK(res.data.message)
            dispatch(action(res.data.data))
            setView(false)
        }
    } catch (err) {
        console.log(err)
        setLoading(false)
        notificationNOT(err.message)
    }
}

export const createEntryOther = async (data) => {
    const { id, value, setValue, type, setLoading, dispatch, action } = data
    try {
        setLoading(true)
        const res = await axios.post(`/api/transections/add`, value, {
            headers: {
                "cb-access-token": localStorage.getItem("cb_access_token")
            }
        })
        if (res.data.data) {
            setLoading(false)
            notificationOK(res.data.message)
            dispatch(action(res.data.data))
            setValue({
                book: id,
                amount: '',
                entryType: type,
                remark: '',
                history: []
            })
        }
    } catch (err) {
        setLoading(false)
        notificationNOT(err.message)
    }
}

export const updateEntry = async (data) => {
    const { value, setLoading, dispatch, action, setView } = data

    try {
        setLoading(true)
        const res = await axios.put(`/api/transections/${value._id}`, value, {
            headers: {
                "cb-access-token": localStorage.getItem("cb_access_token")
            }
        })
        if (res.data.status === 200) {
            setLoading(false)
            notificationOK(res.data.message)
            dispatch(action(res.data.data))
            setView(false)
        }
    } catch (err) {
        setLoading(false)
        notificationNOT(err.message)
    }
}

export const deleteEntry = async (data) => {
    const { id, setLoading, dispatch, action, setView } = data
    try {
        setLoading(true)
        const res = await axios.delete(`/api/transections/${id}`, {
            headers: {
                "cb-access-token": localStorage.getItem("cb_access_token")
            }
        })
        if (res.data.status === 200) {
            setLoading(false)
            notificationOK(res.data.message)
            dispatch(action(id))
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
        const res = await axios.get(`/api/transections/${id}`, {
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