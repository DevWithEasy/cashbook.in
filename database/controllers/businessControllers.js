import Book from "../model/Book"
import Business from "../model/Business"
import User from "../model/User"

export const getBusiness = async (req, res) => {
    try {
        const bussinesses = await Business.find({ user: req.user.id })
            .populate({
                path: 'teams',
                populate: {
                    path: 'user',
                    model: 'User'
                }
            })

        const books = await Book.find({ business: req.query.id })

        res.status(200).json({
            success: true,
            status: 200,
            data: {
                bussinesses,
                books
            }
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            status: 500,
            message: err.message
        })
    }
}

export const createBusiness = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user.id })
        const newBusiness = new Business({
            name: req.body.name,
            user: req.user.id,
            books: [],
            category: req.body.category,
            type: req.body.type,
            teams: [],
            address: '',
            stuffs: 0,
            phone: '',
            email: user.email
        })

        const business = await newBusiness.save()


        res.status(200).json({
            success: true,
            status: 200,
            data: business,
            message: 'Business created successfully'
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            status: 500,
            message: err.message
        })
    }
}

export const updateBusiness = async (req, res) => {
    try {

        await Business.findByIdAndUpdate(req.query.id, {
            $set: {
                name: req.body.name,
                address: req.body.address,
                stuffs: req.body.stuffs,
                phone: req.body.phone,
                email: req.body.email,
                category: req.body.category,
                type: req.body.type,
            }
        }
        )
        const business = await Business.findById(req.query.id)
            .populate({
                path: 'teams',
                populate: {
                    path: 'user',
                    model: 'User'
                }
            })

        res.status(200).json({
            success: "success",
            status: 200,
            data: business,
            message : 'Successfully Updated.'
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            status: 500,
            message: err.message
        })
    }
}

export const deleteBusiness = async (req, res) => {
    try {
        await Business.findByIdAndDelete(req.query.id)
        res.status(200).json({
            success: "success",
            status: 200,
            data: {}
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            status: 500,
            message: err.message
        })
    }
}