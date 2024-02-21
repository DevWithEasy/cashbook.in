import initDatabase from "../../../database/initDatabase"
import Book from "../../../database/model/Book"
import Entry from "../../../database/model/Entry"
import authentication from "../../../utils/authentication"

async function handler(req, res) {
    initDatabase()
    try {

        const books = await Book.find({ business: req.query.id })

        let entryCount = 0

        await Promise.all(books.map(async (book) => {
            const entries = await Entry.find({ book : book._id}).count()
            entryCount = entryCount + entries
        }))

        return res.status(200).json({
            success: true,
            status: 200,
            data: {
                books : books.length,
                entries : entryCount
            },
            message: "Successfully Changed"
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