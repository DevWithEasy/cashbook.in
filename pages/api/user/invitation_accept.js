import bcrypt from "bcrypt";
import initDatabase from "../../../database/initDatabase";
import User from "../../../database/model/User";
import Verification from "../../../database/model/Veification";
import jwt from 'jsonwebtoken';
import Business from "../../../database/model/Business";

async function handler(req, res) {
    initDatabase()
    try {
        const { email, otp } = req.query
        const { token } = req.body

        const findOTP = await Verification.findOne({ email: email })

        const valid = await bcrypt.compare(otp, findOTP.code)

        if (!valid) {
            return res.status(404).json({
                success: false,
                status: 404,
                message: "OTP Not Found."
            })
        }

        jwt.verify(token, process.env.JWT_SECRET, async(err, data) => {
            if (err) return res.status(403).json({
                success: false,
                status: 403,
                message: "Token is not valid."
            })

            const newUser = new User({
                email: email,
                name: '',
                number: '',
                image: {
                    public_id: '',
                    url: ''
                }
            })

            const user = await newUser.save()

            const userRole = {
                user: user._id,
                role: data.role,
                createdAt : Date.now()
            }

            await Business.findByIdAndUpdate(data.business, {
                $push: {
                    teams: userRole
                }
            })

            const newToken = await jwt.sign({ id: user._id }, process.env.JWT_SECRET)

            await Verification.deleteOne({ email: email })

            return res.status(200).json({
                success: true,
                status: 200,
                data: user,
                message: "Successfully signin",
                token : newToken
            })

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