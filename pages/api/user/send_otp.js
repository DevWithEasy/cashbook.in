import bcrypt from "bcrypt";
import initDatabase from "../../../database/initDatabase";
import User from "../../../database/model/User";
import Verification from "../../../database/model/Veification";
import { sendOTP, sendSuccessful } from "../../../libs/varification";
import authentication from "../../../utils/authentication";
import generateOTP from "../../../utils/generateOTP";

async function handler(req, res){
    initDatabase()
    try {
        const {email} =(req.query)

        const otp_number = generateOTP()
        const otp_hash = await bcrypt.hash((otp_number).toString(),10)
        
        const verify = new Verification({
            email : email,
            code : otp_hash
        })

        await verify.save()

        sendOTP(process.env.EMAIL,email,otp_number)

        res.status(200).json({
            success : true,
            status : 200,
            message : "Account successfully verified"
        })
    } catch (error) {
        console.log(error.message)
    }
}
export default handler;