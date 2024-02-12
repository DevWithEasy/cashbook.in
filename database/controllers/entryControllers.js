import Entry from "../model/Entry"

export const createEntry= async(req,res)=>{
    try {
        
        const newEntry = new Entry({
            user : req.user.id,
            book : req.query.id,
            amount: req.body.amount,
            remark : req.body.remark,
            entryType : req.body.type,
            contact : req.body.contact || null,
            category : req.body.category || null,
            payment : req.body.payment || null,
            createdAt : req.body.createdAt,
        })

        const entry = await newEntry.save()

        res.status(200).json({
            success: true,
            status: 200,
            data: entry,
            message: "Entry created successfully"
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success : false,
            status:500,
            message:err.message
        })
    }
}

export const getEntryDetails= async(req,res)=>{
    try {
        const entry = await  Entry.findOne({"_id" : req.query.id})
        res.status(200).json({
            success: true,
            status: 200,
            data: entry,
            message: "Entry updated successfully"
        })
    } catch (err) {
        res.status(500).json({
            success : false,
            status:500,
            message:err.message
        })
    }
}

export const updateEntry= async(req,res)=>{
    try {
        const entry = await  Entry.findOne({"_id" : req.query.id})
        const createHistory = {
            from : entry.amount,
            to : parseInt(req.body.amount),
            reason: req.body.reason
        }
        await Entry.updateOne({"_id" : req.query.id},{
            $set : {
                "amount" : req.body.amount,
                "entryType" : req.body.entryType,
                "remark" : req.body.remark
            },
            $push :{
                "history" : createHistory
            }
        })
        const newPost = await  Entry.findOne({"_id" : req.query.id})

        res.status(200).json({
            success: true,
            status: 200,
            data: newPost,
            message: "Entry updated successfully"
        })
    } catch (err) {
        res.status(500).json({
            success : false,
            status:500,
            message:err.message
        })
    }
}

export const deleteEntry= async(req,res)=>{
    try {
        await Entry.deleteOne({"_id" : req.query.id})
        res.status(200).json({
            success: true,
            status: 200,
            message: "Entry deleted successfully"
        })
    } catch (err) {
        res.status(500).json({
            success : false,
            status:500,
            message:err.message
        })
    }
}