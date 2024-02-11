import Book from "../model/Book"
import Entry from "../model/Entry"

export const getBooks = async(req,res)=>{
    try {
        const books = await Book.find({"business" : req.query.id})
        res.status(200).json({
            success : true,
            status:200,
            data : books
        })
    } catch (err) {
        res.status(500).json({
            success : false,
            status:500,
            message:err.message
        })
    }
}

export const createBook = async(req,res)=>{
    try {
        const book = await Book.findOne({"_id" : req.query.id})
        const entries = await Post.find({book: book._id}).sort({createdAt: -1})
        res.status(200).json({
            success : "success",
            status:200,
            data : {...book._doc,entries}
        })
    } catch (err) {
        res.status(500).json({
            success : false,
            status:500,
            message:err.message
        })
    }
}

export const updateBook = async(req,res)=>{
    try {
        const book = await Book.findByIdAndUpdate(req.query.id,
        {
            name : req.body.name
        },
        {
            new : true
        }
        )
        return res.status(200).json({
            success : "success",
            status:200,
            data : book,
            message : "Successfully updated."
        })
    } catch (error) {
        return res.status(500).json({
            success : false,
            status:500,
            message:error.message
        })
    }
}

export const deleteBook = async(req,res)=>{
    try {
        await Entry.deleteMany({"book" : (req.query.id)})
        await Book.deleteOne({"_id" : req.query.id})

        return res.status(200).json({
            success : "success",
            status:200,
            data: {},
            message : "Successfully deleted."
        })
    } catch (error) {
        res.status(500).json({
            success : false,
            status:500,
            message:err.message
        })
    }
}