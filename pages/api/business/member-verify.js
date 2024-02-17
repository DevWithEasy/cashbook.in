import initDatabase from "../../../database/initDatabase"
import User from "../../../database/model/User"
import authentication from "../../../utils/authentication"

async function handler(req, res) {
    initDatabase()
    try {
        const user = await User.findOne({email : req.query.email})
        
        return res.status(200).json({
            success: true,
            status: 200,
            find : user ? true : false,
            data: user,
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