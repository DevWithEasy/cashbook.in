import moment from 'moment'

class BusinessManager{
    constructor(user,books,businesses,currentBusiness){
        this.user = user
        this.books = books
        this.businesses = businesses
        this.currentBusiness = currentBusiness
    }

    getRole(business){
        if(this.user?._id === business?.user?._id){
            return 'Owner'
        }else{
            const findTeamMember = business?.teams?.find(member=>member?.user?._id === this.user?._id)
            return findTeamMember?.role
        }
    }

    totalBook(business){
        const findBooks = this.books?.filter(book=>book?.business === business?._id)
        return findBooks?.length
    }

    getTotalMembers(){
        return this.currentBusiness.teams.length + 1
    }

    getOwnerPartners(){
        const findTeamMember = this.currentBusiness?.teams?.filter(member=>member?.role === 'Partner')
        
        return [{role : 'Owner', user : this.currentBusiness.user},...findTeamMember]
    }

    getStaffs(){
        return this.currentBusiness?.teams?.filter(member=>member?.role === 'Staff')
    }

    getInfo(memberId){
        if(this.currentBusiness?.user?._id === memberId){
            return {
                user : this.user,
                role : 'Owner',
                join : `Member since from ${moment(this.user?.createdAt).fromNow()}`
            }
        }else{
            const member = this.currentBusiness.teams.find(m=>m?.user?._id === memberId)
            return {
                ...member,
                join : `Member since from ${moment(member?.createdAt).fromNow()}`
            }
        }
    }
}

export default BusinessManager;