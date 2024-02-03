import axios from 'axios'

export const createData=async(data)=>{
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