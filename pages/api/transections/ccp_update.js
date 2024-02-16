import { data } from "autoprefixer"
import initDatabase from "../../../database/initDatabase"
import Entry from "../../../database/model/Entry"
import authentication from "../../../utils/authentication"

async function handler(req, res) {
    initDatabase()
    try {
        const updateObj = {}
        updateObj[req.query.field] = req.query.f_id

        const entries = []

        await Promise.all(
            req.body.entries.map(async (id) => {
                await Entry.findByIdAndUpdate(
                    id,
                    updateObj,
                    { new: true }
                )

                const entry = await Entry.findById(id)
                    .populate('payment', 'name')
                    .populate('category', 'name')
                    .populate('contact', 'name')

                entries.push(entry)
            })
        )

        return res.status(200).json({
            success: true,
            status: 200,
            data: entries,
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