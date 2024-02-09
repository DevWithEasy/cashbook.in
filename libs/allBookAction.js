import axios from "axios"
import { notificationNOT, notificationOK } from "../utils/toastNotification"

export const createBook =async(id,name,setLoading,dispatch,action,setView)=>{
    try{
        setLoading(true)
        const res = await axios.post(`/api/book/add?id=${id}`,{name},{
            headers: {
                "cb-access-token": localStorage.getItem("cb_access_token")
            }
        })
        if(res.data.status === 200){
            setLoading(false)
            notificationOK(res.data.message)
            dispatch(action(res.data.data))
            setView(false)
        }
    }catch(err){
        setLoading(false)
        notificationNOT(err.message)
    }
}

export const updateBook =async(id,name,setLoading,dispatch,action,setView)=>{
    try{
        setLoading(true)
        const res = await axios.put(`/api/book/${id}`,{name},{
            headers: {
                "cb-access-token": localStorage.getItem("cb_access_token")
            }
        })
        if(res.data.status === 200){
            console.log(res.data.data)
            setLoading(false)
            notificationOK(res.data.message)
            dispatch(action(res.data.data))
            setView(false)
        }
    }catch(error){
        setLoading(false)
        notificationNOT(error.message)
        console.log(error)
    }
}

export const deleteBook =async(id,router,setLoading,dispatch,action)=>{
    try{
        setLoading(true)
        const res = await axios.delete(`/api/book/${id}`)
        if(res.data.status === 200){
            setLoading(false)
            router.push("/")
            dispatch(action(res.data.data.id))
        }
    }catch(err){
        setLoading(false)
        notificationNOT(err.message)
    }
}