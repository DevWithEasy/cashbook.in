import initDatabase from "../../../database/initDatabase";
import User from "../../../database/model/User";
import Business from "../../../database/model/Business";

async function handler(req, res) {
    initDatabase()
    try {
        const { id } = (req.query)
        const user = await User.findOne({_id : id})
        const businesses = await Business.find({ user: id })

        return res.status(200).json({
            success : true,
            status:200,
            data : user,
            businessId : businesses.length > 0 ? businesses[0]._id : null,
            message:"Successfully signin",
            token
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