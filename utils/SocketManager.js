import { addBooks, addBusinesses, addCurrentBusiness, removeBusiness, renameBook, updateBusiness } from "../store/slice/bookSlice";
import api from "./api";
import socket from "./socket";
import axios from 'axios'

class SocketManager{
    constructor(dispatch,router){
        this.dispatch = dispatch
        this.router = router
    }

    handleChecking = async () => {
        try {
            const res = await axios.get(`${api}/user/checking`, {
                headers: {
                    "cb-access-token": localStorage.getItem("cb_access_token")
                }
            })

            if (res.data.success) {

                const { businesses, books } = res.data.data

                this.dispatch(addBusinesses(businesses))
                this.dispatch(addBooks(books))
            }
        } catch (error) {
            console.log(error)
        }
    }

    businessUpdate(){
        socket.on('update_business_client', data => {
            this.dispatch(updateBusiness(data))
            this.dispatch(addCurrentBusiness(data))
        })
    }

    removeBusiness(){
        socket.on('remove_business_client', data => {
            this.dispatch(removeBusiness(data.id))
            this.router.push('/checking')
        })
    }

    addBusiness(){
        socket.on('add_business_client', async (data) => {
            this.handleChecking()
        })
    }

    bookUpdate(){
        socket.on('update_book_client', data => {
            this.dispatch(renameBook(data))
        })
    }

    addMemberInBook(){
        socket.on('add_team_client', data => {
            this.handleChecking()
            if (this.router.asPath === `/business/${data?.business}/cashbooks`) {
                this.router.reload()
            }
        })
    }
/**
 * 
 * @param {object} currentBook 
 */
    removeMemberFromBook(currentBook){
        socket.on('remove_team_client', data => {
            if (currentBook._id === data._id) {
                this.router.push('/checking')
            } else {
                this.dispatch(renameBook(data))
            }
        })
    }
}

export default SocketManager