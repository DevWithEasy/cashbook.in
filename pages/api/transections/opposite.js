import initDatabase from "../../../database/initDatabase"
import Book from "../../../database/model/Book"
import Entry from "../../../database/model/Entry"

export default async function handler(req, res){
    initDatabase()
    try{


        return res.status(200).json({
            success : true,
            status:200,
            data : {},
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