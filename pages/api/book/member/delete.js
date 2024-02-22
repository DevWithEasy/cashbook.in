import Book from "../../../../database/model/Book"
import authentication from "../../../../utils/authentication"

async function handler(req, res) {
    initDatabase()
    try {
        
        console.log(req.query.id,req.body)

        return res.status(200).json({
            success: true,
            status: 200,
            data: {},
            message: "Successfully copied."
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