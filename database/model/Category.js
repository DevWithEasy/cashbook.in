import mongoose from 'mongoose';

const categorySchema = mongoose.Schema({
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

const Category = mongoose.models.Category || mongoose.model('Category',categorySchema)
export default Category