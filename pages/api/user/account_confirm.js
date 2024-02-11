import initDatabase from "../../../database/initDatabase";
import User from "../../../database/model/User";
import Business from "../../../database/model/Business";
import authentication from "../../../utils/authentication";
import Book from "../../../database/model/Book";
import Payment from "../../../database/model/Payment";

async function handler(req, res) {
    initDatabase()
    try {
        const user = await User.findByIdAndUpdate(req.user.id,{
            $set: {
                name  : req.body.name
            }
        },
        {new : true}
        )

        const newBusiness = new Business({
            name : req.body.check ? req.body.name : req.body.businessName,
            user : req.user.id,
            books : [],
            category : 13,
            type : 6,
            teams : [],
            address : '',
            stuffs : 0,
            phone : '',
            email : '',
            payment : ''
        })

        const business  = await newBusiness.save()

        const newBook = new Book({
            name : 'Business Book',
            user : req.user.id,
            business : business._id
        })

        const book = await newBook.save()

        const payments = ['Cash','Online']
        payments.forEach(async(payment)=>{
            const newPayment = new Payment({
                name : payment,
                book : book._id,
                user : req.user.id
            })
            await newPayment.save()
        })

        return res.status(200).json({
                success : true,
                status:200,
                data : user,
                businessId : business._id,
                message:"Account setup successfully",
            })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            status: 500,
            message: "Internal server error"
        })
    }
}
export default authentication(handler);