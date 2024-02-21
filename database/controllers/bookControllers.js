import Book from "../model/Book"
import Business from "../model/Business"
import Contact from "../model/Contact"
import Entry from "../model/Entry"
import Payment from "../model/Payment"

export const getBooks = async(req,res)=>{
    try {
        const books = await Book.find({"business" : req.query.id})
        
        const booksWithTotals = await Promise.all(books.map(async (book) => {
            const cashIn = await Entry.aggregate([
                { $match: { book: book._id, entryType: "cash_in" } },
                { $group: { _id: null, total: { $sum: "$amount" } } }
            ]);

            const cashOut = await Entry.aggregate([
                { $match: { book: book._id, entryType: "cash_out" } },
                { $group: { _id: null, total: { $sum: "$amount" } } }
            ])

            const totalCashIn = cashIn.length > 0 ? cashIn[0].total : 0
            const totalCashOut = cashOut.length > 0 ? cashOut[0].total : 0

            return {
                ...book.toJSON(),
                stock : totalCashIn-totalCashOut
            };
        }))

        res.status(200).json({
            success : true,
            status:200,
            data : booksWithTotals
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
        const book = await Book.findById(req.query.id)
        
        await Contact.deleteMany({"book" : (req.query.id)})

        await Payment.deleteMany({"book" : (req.query.id)})

        await Entry.deleteMany({"book" : (req.query.id)})

        await Book.deleteOne({"_id" : req.query.id})

        await Business.findByIdAndUpdate(book.business,{
            $pull : {
                books : req.query.id
            }
        })

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