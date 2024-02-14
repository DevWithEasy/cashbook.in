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
                const findEntry = await Entry.findById(id)

                const newEntry = new Entry({
                    book: req.query.to,
                    user: req.user.id,
                    amount: findEntry.amount,
                    remark: findEntry.remark,
                    category: findEntry.category,
                    payment: findEntry.payment,
                    contact: findEntry.contact,
                    entryType: findEntry.entryType
                })

                await newEntry.save()

                const findHistories = await History.find({ entry: id })

                if (findHistories.length === 0) {
                    return
                } else {
                    findHistories.forEach(async (history) => {
                        const newHistory = new History({
                            entry: newEntry._id,
                            from: history.from,
                            to: history.to,
                            remark: history.remark,
                            createdAt: history.createdAt,
                            updatedAt: history.updatedAt,
                        })
                        await newHistory.save()
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