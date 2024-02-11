import mongoose from 'mongoose';

const bookSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    business: {
        type: mongoose.Types.ObjectId,
        ref: 'Business'
    },
    members: {
        type: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'User'
            }
        ],
        default: []
    },
}, {
    timestamps: true
})

const Book = mongoose.models.Book || mongoose.model('Book', bookSchema)
export default Book