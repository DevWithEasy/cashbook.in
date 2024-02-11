import initDatabase from "../../../../database/initDatabase";
import Book from "../../../../database/model/Book";
import Business from "../../../../database/model/Business";
import Payment from "../../../../database/model/Payment";
import authentication from "../../../../utils/authentication";

async function handler(req, res){
    initDatabase()
    try{
        const newBook = new Book({
            ...req.body,
            user : req.user.id,
            business : req.query.id
        })
        const book = await newBook.save()

        await Business.findByIdAndUpdate(req.query.id,{$push : {books : book._id}})

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
            success : "success",
            status:200,
            data : book,
            message:"Successfully Created"
        })
    }catch(err){
        return res.status(500).json({
            success : false,
            status:500,
            message:err.message
        })
    }
}
export default authentication(handler);