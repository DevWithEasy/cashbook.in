import Business from "../model/Business"
import User from "../model/User"

export const getBusiness = async(req,res)=>{
    try {
        const book = await Business.findOne({"_id" : req.query.id})
        res.status(200).json({
            success : "success",
            status:200,
            data : {}
        })
    } catch (err) {
        res.status(500).json({
            success : false,
            status:500,
            message:err.message
        })
    }
}

export const createBusiness = async(req,res)=>{
    try {
        const user = await User.findOne({_id : req.user.id})
        const newBusiness = new Business({
            name : req.body.name,
            user : req.user.id,
            books : [],
            category : req.body.category,
            type : req.body.type,
            teams : [],
            address : '',
            stuffs : 0,
            phone : '',
            email : user.email
        })

        const business = await newBusiness.save()
        
        // await Business.findOne({"_id" : req.query.id})
        res.status(200).json({
            success : true,
            status:200,
            data : business
        })
    } catch (err) {
        res.status(500).json({
            success : false,
            status:500,
            message:err.message
        })
    }
}

export const updateBusiness = async(req,res)=>{
    try {
        const book = await Business.findOne({"_id" : req.query.id})
        res.status(200).json({
            success : "success",
            status:200,
            data : {}
        })
    } catch (err) {
        res.status(500).json({
            success : false,
            status:500,
            message:err.message
        })
    }
}

export const deleteBusiness = async(req,res)=>{
    try {
        const book = await Business.findOne({"_id" : req.query.id})
        res.status(200).json({
            success : "success",
            status:200,
            data : {}
        })
    } catch (err) {
        res.status(500).json({
            success : false,
            status:500,
            message:err.message
        })
    }
}