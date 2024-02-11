import mongoose from 'mongoose';

const entrySchema = mongoose.Schema({
    book:{
        type:mongoose.Types.ObjectId,
        required:"Book"
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    },
    amount :{
        type : Number,
        required :true
    },
    remark : {
        type : String
    },
    category :{
        type:mongoose.Types.ObjectId,
        ref:'Category',
        default : ''
    },
    payment :{
        type:mongoose.Types.ObjectId,
        ref:'Payment',
        default : ''
    },
    entryType :{
        type : String,
        enum : ["CashIn","CashOut"]
    },
    history : [
        {
            from : {
                type : Number,
                required :true
            },
            to : {
                type : Number,
                required : true
            },
            reason : {
                type : String,
            },
            date : {
                type : Date,
                default : Date.now()
            }

        }
    ]

},{
    timestamps:true
})

const Entry = mongoose.models.Entry || mongoose.model('Entry',entrySchema)
export default Entry