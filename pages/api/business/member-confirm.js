import initDatabase from "../../../database/initDatabase"
import Business from "../../../database/model/Business"
import User from "../../../database/model/User"
import { sendInviteAccout } from "../../../libs/varification"
import authentication from "../../../utils/authentication"
import jwt from 'jsonwebtoken'

async function handler(req, res) {
    initDatabase()
    try {
        const findUser =  await User.findById(req.user.id)
        const user = await User.findOne({ email: req.query.email })

        if (user) {
            const userRole = {
                user: user._id,
                role: req.query.role,
                createdAt : Date.now()
            }

            await Business.findByIdAndUpdate(req.query.business, {
                $push: {
                    teams: userRole
                }
            })

            return res.status(200).json({
                success: true,
                status: 200,
                invite : false,
                data : {},
                message: "Team member added Successfully"
            })
        } else {
            const business = await Business.findById(req.query.business)

            const token = jwt.sign({ business: req.query.business, role: req.query.role }, process.env.JWT_SECRET)

            const url = `http://localhost:3000/invite?token=${token}&email=${req.query.email}&business=${business.name}&name=${findUser?.name}`

            sendInviteAccout(process.env.EMAIL, req.query.email, business.name, url)

            return res.status(200).json({
                success: true,
                invite : true,
                status: 200,
                data : {},
                message: "Invitation send Successfully."
            })
        }

    } catch (err) {
        res.status(500).json({
            success: false,
            status: 500,
            message: err.message
        })
    }
}

export default authentication(handler)