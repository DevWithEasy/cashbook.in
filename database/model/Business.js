import mongoose from 'mongoose';

const businessSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    books:{
        type : [
            {
                type: mongoose.Types.ObjectId,
                ref: 'Book'
            }
        ],
        default : []
    },
    category: {
        type: Number,
        required: true
    },
    type: {
        type: Number,
        required: true
    },
    teams: {
        type : [
            {
                type: mongoose.Types.ObjectId,
                ref: 'User'
            }
        ],
        default : []
    },
    address : {
        type: String
    },
    stuffs : {
        type: Number,
        required: true,
        default : 0
    },
    phone : {
        type: String
    },
    email : {
        type: String
    },
    payment : {
        type: String
    },
}, {
    timestamps: true
})

const Business = mongoose.models.Business || mongoose.model('Business', businessSchema)
export default Business