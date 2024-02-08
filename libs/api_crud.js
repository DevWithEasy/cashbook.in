import axios from 'axios'
import { notificationNOT, notificationOK } from '../utils/toastNotification'

export const createData=async(data)=>{
    const {url,value,setView,setLoading,dispatch,action} = data
    try {
        const res = await axios.post(url,value,{
            headers : {
                "cb-access-token": localStorage.getItem("cb_access_token")
            }
        })
        if(res.data.success){
            notificationOK(res?.data?.message)
            if(setView){
                setView(false)
            }
            if(dispatch && action){
                dispatch(action(res.data.data))
            }
        }
    } catch (error) {
        console.log(error)
        notificationNOT(error.message)
    }
}

export const getData=async(data)=>{
    const {url,value,setView} = data
    try {
        const res = await axios.post(url,value,{
            headers : {
                "cb-access-token": localStorage.getItem("cb_access_token")
            }
        })
        if(res.data.success){
            if(setView){
                setView(false)
            }
        }
    } catch (error) {
        console.log(error)
    }
}

export const updateData=async(data)=>{
    const {url,value,setView} = data
    try {
        const res = await axios.post(url,value,{
            headers : {
                "cb-access-token": localStorage.getItem("cb_access_token")
            }
        })
        if(res.data.success){
            if(setView){
                setView(false)
            }
        }
    } catch (error) {
        console.log(error)
    }
}

export const deleteData=async(data)=>{
    const {url,value,setView} = data
    try {
        const res = await axios.post(url,value,{
            headers : {
                "cb-access-token": localStorage.getItem("cb_access_token")
            }
        })
        if(res.data.success){
            if(setView){
                setView(false)
            }
        }
    } catch (error) {
        console.log(error)
    }
}