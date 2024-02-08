import bcrypt from "bcrypt";
import initDatabase from "../../../database/initDatabase";
import User from "../../../database/model/User";
import Verification from "../../../database/model/Veification";
import jwt from 'jsonwebtoken';
import Business from "../../../database/model/Business";

async function handler(req, res) {
    initDatabase()
    try {
        const { email, otp } = (req.query)
        const findOTP = await Verification.findOne({ email: email })

        const valid = await bcrypt.compare(otp, findOTP.code)

        if (!valid) {
            return res.status(404).json({
                success: false,
                status: 404,
                message: "Credentials not valid"
            })
        }
        const finduser = await User.findOne({email: email})
        if(!finduser){

            const newUser = new User({
                email : email,
                name : '',
                number : '',
                image : {
                    public_id : '',
                    url : ''
                }
            })

            const user = await newUser.save()

            const token = await jwt.sign({id : user._id},process.env.JWT_SECRET)

            await Verification.deleteOne({email: email})
        
            return res.status(200).json({
                success : true,
                status:200,
                data : user,
                business : null,
                message:"Successfully signin",
                token
            })
        }else{

            await Verification.deleteOne({email: email})

            const token = await jwt.sign({id : finduser._id},process.env.JWT_SECRET)

            const findBusiness = await Business.find({user: finduser._id})
        
            return res.status(200).json({
                success : true,
                status:200,
                data : finduser,
                businessId : findBusiness.length > 0 ? findBusiness[0]._id : null,
                message:"Successfully signin",
                token
            })
        }

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