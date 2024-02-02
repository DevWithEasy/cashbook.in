import mongoose from 'mongoose';

const organigationSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    }
},{
    timestamps:true
})

const Organigation = mongoose.models.Organigation || mongoose.model('Organigation',organigationSchema)
export default Organigation