import initDatabase from "../../../database/initDatabase";
import User from "../../../database/model/User";
import Business from "../../../database/model/Business";
import Book from "../../../database/model/Book";

async function handler(req, res) {
    initDatabase()
    try {
        const { id } = (req.query)
        const user = await User.findOne({_id : id})
        const businesses = await Business.find({ user: id })
        const books = await Book.find({ user: id })

        return res.status(200).json({
            success : true,
            status:200,
            data : {
                user,
                businesses,
                books
            },
            businessId : businesses.length > 0 ? businesses[0]._id : null,
            message:"Successfully signin"
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            status: 500,
            message: "Internal server error"
        })
    }
}
export default handler;