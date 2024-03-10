import { addBooks, addBusinesses, addCurrentBook, addCurrentBusiness, addEntries, removeBusiness, removeEntry, renameBook, updateBusiness, updatePrevEntry } from "../store/slice/bookSlice";
import api from "./api";
import socket from "./socket";
import axios from 'axios'

class SocketManager{
    constructor(dispatch,router,book,business){
        this.dispatch = dispatch
        this.router = router
        this.book = book
        this.business = business
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
    getTransections = async (id) =>{
        try {
            const res = await axios.get(`${api}/transection/all/${id}`, {
                headers: {
                    "cb-access-token": localStorage.getItem("cb_access_token")
                }
            })
            if (res.data.success) {
                this.dispatch(addEntries(res.data.data))
            }
        } catch (error) {
            console.log(error)
        }
    }
    //======================================
    businessUpdate(){
        socket.on('update_business_client', data => {
            this.dispatch(updateBusiness(data))
            if(this.business?._id === data?._id){
                this.dispatch(addCurrentBusiness(data))
            }
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
    //==============================================
    bookUpdate(){
        socket.on('update_book_client', data => {
            this.dispatch(renameBook(data))
            if (this.book?._id === data?._id) {
                this.dispatch(addCurrentBook(data))
            }
        })
    }

    bookMove(){
        socket.on('move_book_client', data => {
            this.dispatch(renameBook(data))
            if (this.router.asPath === `/business/${this.business}/cashbooks`) {
                this.handleChecking()
            }
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

    removeMemberFromBook(){
        socket.on('remove_team_client', data => {
            if (this.book?._id === data._id) {
                this.router.push('/checking')
            } else {
                this.dispatch(renameBook(data))
            }
        })
    }
    //=======================================
    addTransection(){
        socket.on('client_add_transection',data=>{
            const path = `/business/${data.business}/cashbooks/${data.book}/transactions`
            if(this.router.asPath === path){
                this.getTransections(data.book)
            }
        })
    }
    updateTransection(){
        socket.on('client_update_transection',data=>{
            const path = `/business/${data.business}/cashbooks/${data.book}/transactions`
            if(this.router.asPath === path){
                this.dispatch(updatePrevEntry(data.entry))
            }
        })
    }
    deleteTransection(){
        socket.on('client_delete_transection',data=>{
            const path = `/business/${data.business}/cashbooks/${data.book}/transactions`
            if(this.router.asPath === path){
                this.dispatch(removeEntry(data.entry))
            }
        })
    }

    deleteManyTransection(){
        socket.on('client_delete_many_transection',data=>{
            const path = `/business/${data.business_id}/cashbooks/${data.book_id}/transactions`
            if(this.router.asPath === path){
                data?.entries.forEach(entry =>{
                    this.dispatch(removeEntry(entry))
                })
            }
        })
    }

    importTransection(){
        socket.on('client_import_transecion',data=>{
            const path = `/business/${data.business}/cashbooks/${data.book}/transactions`
            if(this.router.asPath === path){
                this.getTransections(data.book)
            }
        })
    }
}

export default SocketManager