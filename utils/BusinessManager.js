import moment from 'moment'
import { ownTopics, partnerTopics, stuffTopics } from '../public/data/rolePermissions'

class BusinessManager {
    constructor(user, books, businesses, currentBusiness) {
        this.user = user
        this.books = books
        this.businesses = businesses
        this.currentBusiness = currentBusiness
    }

    getRole(business) {
        if (this.user?._id === business?.user?._id) {
            return 'Owner'
        } else {
            const findTeamMember = business?.teams?.find(member => member?.user?._id === this.user?._id)
            return findTeamMember?.role
        }
    }

    getBooks(business) {
        const findBooks = this.books?.filter(book => book?.business === business?._id)
        return findBooks
    }

    getCurrenBooks(id) {
        const matchingBooks = [];
        for (const book of this.books) {
            if (book?.user?._id === this.user?._id) {
                matchingBooks.push(book);
                continue;
            }
            if(book?.members?.length > 0){
                for (const member of book?.members) {
                    if (member?.user?._id === this.user?._id) {
                        matchingBooks.push(book);
                        break;
                    }
                }
            }
        }

        const businessBooks = matchingBooks.filter(book => book?.business === id)

        return businessBooks
    }

    totalBook(id) {
        const matchingBooks = [];
        for (const book of this.books) {
            if (book?.user?._id === this.user?._id) {
                matchingBooks.push(book);
                continue;
            }
            if(book?.members?.length > 0){
                for (const member of book?.members) {
                    if (member?.user?._id === this.user?._id) {
                        matchingBooks.push(book);
                        break;
                    }
                }
            }
        }

        const businessBooks = matchingBooks.filter(book => book?.business === id)

        return businessBooks?.length
    }

    getTotalMembers() {
        return this.currentBusiness?.teams?.length + 1
    }

    getOwnerPartners() {
        const findTeamMember = this.currentBusiness?.teams?.filter(member => member?.role === 'Partner')

        return [{ role: 'Owner', user: this.currentBusiness.user }, ...findTeamMember]
    }

    getPartners() {
        const findTeamMember = this.currentBusiness?.teams?.filter(member => member?.role === 'Partner')

        return findTeamMember
    }

    getStaffs() {
        return this.currentBusiness?.teams?.filter(member => member?.role === 'Staff')
    }

    getInfo(memberId) {
        if (this.currentBusiness?.user?._id === memberId) {
            return {
                user: this.user,
                role: 'Owner',
                join: `Member since from ${moment(this.user?.createdAt).fromNow()}`
            }
            
        } else {
            const member = this.currentBusiness.teams.find(m => m?.user?._id === memberId)

            return {
                ...member,
                join: `Member since from ${moment(member?.createdAt).fromNow()}`
            }
        }
    }

    getBusinessInfo(){
        if(this.currentBusiness?.name?.length > 0 && this.currentBusiness?.address?.length > 0 && this.currentBusiness?.phone?.length > 0 && this.currentBusiness?.email?.length > 0){
            return {
                num : 6,
                width : 100,
                color : 'bg-blue-500'
            }
        }else if(this.currentBusiness?.name?.length > 0 && this.currentBusiness?.address?.length > 0 && this.currentBusiness?.phone?.length > 0){
            return {
                num : 5,
                width : 83.3,
                color : 'bg-red-500'
            }
        }else if(this.currentBusiness?.name?.length > 0 && this.currentBusiness?.address?.length > 0){
            return {
                num : 4,
                width : 66.64,
                color : 'bg-red-400'
            }
        }else if(this.currentBusiness?.name?.length > 0){
            return {
                num : 3,
                width : 49.98,
                color : 'bg-red-300'
            } 
        }
    }

    getPermissionInfo(role) {
        const data = role === 'Owner' ? ownTopics : role === 'Partner' ? partnerTopics : stuffTopics
        return data
    }
}

export default BusinessManager;