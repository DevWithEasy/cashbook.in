class BusinessManager{
    constructor(user,books,businesses,currentBusiness){
        this.user = user
        this.books = books
        this.businesses = businesses
        this.currentBusiness = currentBusiness
    }

    getRole(business){

        if(this.user?._id === business?.user){
            return 'Owner'
        }else{
            const findTeamMember = business?.teams?.find(member=>member?.user === this.user?._id)
            return findTeamMember?.role
        }
    }

    totalBook(business){
        const findBooks = this.books?.filter(book=>book?.business === business?._id)
        return findBooks?.length
    }
}

export default BusinessManager;