import initDatabase from "../../../../database/initDatabase";
import Category from "../../../../database/model/Category";
import Contact from "../../../../database/model/Contact";
import Entry from "../../../../database/model/Entry";
import Payment from "../../../../database/model/Payment";

export default async function handler(req, res){
    initDatabase()
    try{
        const entries = await Entry.find({"book" : req.query.id})

        const data = []

        await Promise.all(
            entries.map(async(entry)=>{
                const category = await Category.findById(entry._doc.category).select('name')
                const contact = await Contact.findById(entry._doc.contact).select('name type')
                const payment = await Payment.findById(entry._doc.payment).select('name')
                data.push({
                    ...entry._doc,
                    contact,
                    category,
                    payment
                })
            })
        )
        
        return res.status(200).json({
            success : true,
            status:200,
            data : data,
            message:"Successfully created"
        })
    }catch(err){
        res.status(500).json({
            success : false,
            status:500,
            message:err.message
        })
    }
}