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
    books: {
        type: mongoose.Types.ObjectId,
        ref: 'Book'
    },
    category: {
        type: Number,
        required: true
    },
    type: {
        type: Number,
        required: true
    },
    teams: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }
    ],
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