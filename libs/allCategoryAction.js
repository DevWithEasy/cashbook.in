import axios from "axios"
import { notificationNOT, notificationOK } from "../utils/toastNotification"

export const createCategory =async(id,name,setLoading,dispatch,action,refresh,setView)=>{
    try{
        setLoading(true)
        const res = await axios.post(`/api/category?id=${id}`,{name},{
            headers: {
                "cb-access-token": localStorage.getItem("cb_access_token")
            }
        })
        if(res.data.status === 200){
            setLoading(false)
            notificationOK(res.data.message)
            dispatch(action(res.data.data))
            dispatch(refresh())
            setView(false)
        }
    }catch(err){
        setLoading(false)
        notificationNOT(err.message)
    }
}

export const updateCategory =async(id,name,setLoading,dispatch,action,refresh,setView)=>{
    try{
        setLoading(true)
        const res = await axios.put(`/api/category/?id=${id}`,{name},{
            headers: {
                "cb-access-token": localStorage.getItem("cb_access_token")
            }
        })
        if(res.data.status === 200){
            console.log(res.data.data)
            setLoading(false)
            notificationOK(res.data.message)
            dispatch(action(res.data.data))
            dispatch(refresh())
            setView(false)
        }
    }catch(error){
        setLoading(false)
        notificationNOT(error.message)
        console.log(error)
    }
}

export const deleteCategory =async(id,router,setLoading,dispatch,action)=>{
    try{
        setLoading(true)
        const res = await axios.delete(`/api/category/?id=${id}`)
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