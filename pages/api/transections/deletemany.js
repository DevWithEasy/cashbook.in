import initDatabase from "../../../database/initDatabase"
import Entry from "../../../database/model/Entry"
import History from "../../../database/model/History"
import authentication from "../../../utils/authentication"

async function handler(req, res) {
    initDatabase()
    try {
        console.log(req.body)
        await Promise.all(
            req.body.entries.map(async (id) => {

                await Entry.findByIdAndDelete(id)

                const findHistories = await History.find({ entry: id })

                if (findHistories.length === 0) {
                    return
                } else {
                    findHistories.forEach(async (history) => {
                        await History.findByIdAndDelete(history._id)
                    })
                }
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