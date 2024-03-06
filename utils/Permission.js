
class Permission {
    constructor(user, book, business) {
        this.user = user
        this.book = book,
        this.business = business
    }

    findBusinessRole(){
        if (this.user?._id === this.business?.user?._id) {
            return 'Owner'
        } else {
            const findMember = this.business?.teams.find(member=>member?.user?._id === this.user?._id)
            return findMember?.role
        }
    }
    findBookRole(){
        if (this.user?._id === this.book?.user?._id) {
            return 'Owner'
        } else {
            const findTeamMember = this.book?.members?.find(member => member?.user?._id === this.user?._id)
            return findTeamMember?.role
        }
    }

    members(){
        if(this.book?.members.length > 0){
            return this.book?.members?.length
        }else{
            return 0
        }
    }

    businessDelete(){
        const role = this.findBusinessRole()
        if (role == 'Owner') {
            return true
        }else{
            return false
        }
    }

    bookUpdate() {
        const role = this.findBusinessRole()
        if (role === 'Owner' || role === 'Partner') {
            return true
        }else{
            return false
        }
    }

    bookMemberAdd() {
        const role = this.findBusinessRole()
        const bookRole = this.findBookRole()
        if (role === 'Owner' || role === 'Partner' || (role === 'Stuff' && bookRole === 'Admin')) {
            return true
        }else{
            return false
        }
    }

    transectionAction() {
        const role = this.findBookRole()
        if (role == 'Data Operator' || role == 'Viewer') {
            return false
        }else{
            return true
        }
    }
    transectionAdd() {
        const role = this.findBookRole()
        if (role == 'Data Operator' || role == 'Admin') {
            return true
        }else{
            return false
        }
    }
}

export default Permission