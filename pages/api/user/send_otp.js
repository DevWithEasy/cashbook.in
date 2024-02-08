import bcrypt from "bcrypt";
import initDatabase from "../../../database/initDatabase";
import Verification from "../../../database/model/Veification";
import { sendOTPCreateAccout, sendOTPLoginAccout } from "../../../libs/varification";

import generateOTP from "../../../utils/generateOTP";
import User from "../../../database/model/User";

async function handler(req, res) {
    initDatabase()
    try {
        const { email } = (req.query)
        const findUser = await User.findOne({ email: email })
        const findCode = await Verification.findOne({ email: email })
        const otp_number = generateOTP()
        const otp_hash = await bcrypt.hash((otp_number).toString(), 10)

        if (!findCode) {
            const verify = new Verification({
                email: email,
                code: otp_hash
            })

            await verify.save()

            if (findUser) {
                sendOTPLoginAccout(process.env.EMAIL, email, otp_number)
            } else {
                sendOTPCreateAccout(process.env.EMAIL, email, otp_number)
            }

            return res.status(200).json({
                success: true,
                status: 200,
                message: "OTP send successfully."
            })
        } else {
            await Verification.updateOne({ email: email }, {
                $set: {
                    code: otp_hash,
                    expired: Date.now() + 21600000
                }
            })

            if (findUser) {
                sendOTPLoginAccout(process.env.EMAIL, email, otp_number)
            } else {
                sendOTPCreateAccout(process.env.EMAIL, email, otp_number)
            }

            return res.status(200).json({
                success: true,
                status: 200,
                message: "OTP send successfully."
            })
        }


    } catch (error) {
        console.log(error.message)
    }
}
export default handler;