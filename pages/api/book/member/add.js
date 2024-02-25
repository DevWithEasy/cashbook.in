import initDatabase from "../../../../database/initDatabase"
import Book from "../../../../database/model/Book"
import authentication from "../../../../utils/authentication"

async function handler(req, res) {
    initDatabase()
    try {

        const userRole = {
            user: req.body.user,
            role: req.body.role,
            createdAt : Date.now()
        }

        await Book.findByIdAndUpdate(req.body.book, {
            $push: {
                teams: userRole
            }
        })

        const book = await Book.findById(req.body.book)

        return res.status(200).json({
            success: true,
            status: 200,
            invite : false, 
            data : book,
            message: "Team member added Successfully"
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            status: 500,
            message: err.message
        })
    }
}

export default authentication(handler)