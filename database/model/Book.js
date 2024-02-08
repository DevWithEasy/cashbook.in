import mongoose from 'mongoose';

const bookSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    },
    business:{
        type:mongoose.Types.ObjectId,
        ref:'Business'
    }
},{
    timestamps:true
})

const Book = mongoose.models.Book || mongoose.model('Book',bookSchema)
export default Book