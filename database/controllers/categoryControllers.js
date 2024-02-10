import Book from "../model/Book"

export const getCategory = async(req,res)=>{
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

export const createCategory = async(req,res)=>{
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

export const updateCategory = async(req,res)=>{
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

export const deleteCategory = async(req,res)=>{
    try {
        await Post.deleteMany({"book" : (req.query.id)})
        await Book.deleteOne({"_id" : req.query.id})
        res.status(200).json({
            success : "success",
            status:200,
            data: {id : req.query.id},
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