import initDatabase from "../../../database/initDatabase"
import Book from "../../../database/model/Book"
import Entry from "../../../database/model/Entry"
import authentication from "../../../utils/authentication"

async function handler(req, res) {
    initDatabase()
    try {

        await Promise.all(
            req.body.entries.map(async (id) => {
                await Entry.findByIdAndUpdate(id, {
                    $set: {
                        book: req.query.to
                    }
                })
            })
        )

        return res.status(200).json({
            success: true,
            status: 200,
            data: {},
            message: "Successfully created"
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