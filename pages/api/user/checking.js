import initDatabase from "../../../database/initDatabase";
import User from "../../../database/model/User";
import Business from "../../../database/model/Business";
import Book from "../../../database/model/Book";
import Entry from "../../../database/model/Entry";

async function handler(req, res) {
    initDatabase()
    try {
        const { id } = (req.query)
        const user = await User.findOne({_id : id})
        const businesses = await Business.find({ user: id })
        const books = await Book.find({ user: id })

        const booksWithTotals = await Promise.all(books.map(async (book) => {
            const cashIn = await Entry.aggregate([
                { $match: { book: book._id, entryType: "cash_in" } },
                { $group: { _id: null, total: { $sum: "$amount" } } }
            ]);

            const cashOut = await Entry.aggregate([
                { $match: { book: book._id, entryType: "cash_out" } },
                { $group: { _id: null, total: { $sum: "$amount" } } }
            ])

            const totalCashIn = cashIn.length > 0 ? cashIn[0].total : 0
            const totalCashOut = cashOut.length > 0 ? cashOut[0].total : 0

            return {
                ...book.toJSON(),
                stock : totalCashIn-totalCashOut
            };
        }))

        return res.status(200).json({
            success : true,
            status:200,
            data : {
                user,
                businesses,
                books : booksWithTotals
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