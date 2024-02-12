import axios from 'axios'
import { notificationNOT, notificationOK } from '../utils/toastNotification'

export const createData=async(data)=>{
    const {url,value,setView,setLoading,dispatch,action} = data
    setLoading(true)
    try {
        const res = await axios.post(url,value,{
            headers : {
                "cb-access-token": localStorage.getItem("cb_access_token")
            }
        })
        if(res.data.success){
            notificationOK(res?.data?.message)
            setLoading(false)
            dispatch(action(res.data.data))
            setView(false)
        }
    } catch (error) {
        console.log(error)
        notificationNOT(error.message)
        setLoading(false)
    }
}

export const getData=async(data)=>{
    const {url,dispatch,action} = data
    try {
        const res = await axios.get(url,{
            headers : {
                "cb-access-token": localStorage.getItem("cb_access_token")
            }
        })
        if(res.data.success){
            dispatch(action(res.data.data))
        }
    } catch (error) {
        console.log(error)
    }
}

export const updateData=async(data)=>{
    const {url,value,dispatch,action,refresh,setLoading,setView} = data
    setLoading(true)
    try {
        const res = await axios.put(url,value,{
            headers : {
                "cb-access-token": localStorage.getItem("cb_access_token")
            }
        })
        if(res.data.success){
            setLoading(false)
            notificationOK(res.data.message)
            dispatch(action(res.data.data))
            setView(false)
        }
    } catch (error) {
        console.log(error)
        setLoading(false)
    }
}

export const deleteData=async(data)=>{
    const {id,url,dispatch,action,setLoading,setView} = data
    setLoading(true)
    try {
        const res = await axios.delete(url,{
            headers : {
                "cb-access-token": localStorage.getItem("cb_access_token")
            }
        })
        if(res.data.success){
            setLoading(false)
            notificationOK(res.data.message)
            dispatch(action(id))
            setView(false)
        }
    } catch (error) {
        console.log(error)
        setLoading(false)
        
    }
}