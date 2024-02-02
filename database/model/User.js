import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    number:{
        type:String,
        unique:true,
        default : ''
    },
    image:{
        public_id :{
            type:String,
            default : ''
        },
        url :{
            type:String,
            default : ''
        }
    }
})

const User = mongoose.models.User || mongoose.model('User',userSchema)
export default User;