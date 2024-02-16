import initDatabase from "../../../database/initDatabase"
import Book from "../../../database/model/Book"
import Entry from "../../../database/model/Entry"
import authentication from "../../../utils/authentication"

async function handler(req, res) {
    initDatabase()
    try {
        const book = await Book.findByIdAndUpdate(req.query.id,{
            business : req.query.to
        },
        {new : true}
        )

        return res.status(200).json({
            success: true,
            status: 200,
            data: book,
            message: "Successfully moved."
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