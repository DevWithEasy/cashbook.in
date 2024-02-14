import initDatabase from "../../../database/initDatabase"
import Entry from "../../../database/model/Entry"
import authentication from "../../../utils/authentication"

async function handler(req, res) {
    initDatabase()
    try {

        if(req.query.field === 'category'){
            await Entry.findByIdAndUpdate(req.query.e_id,{
                $set : {
                    category : req.query.f_id
                }
            })

            const entry = await Entry.findById(req.query.e_id)
            .populate('payment')
            .populate('category')
            .populate('contact')

            return res.status(200).json({
                success: true,
                status: 200,
                data: entry,
                message: "Successfully created"
            })
        }else if(req.query.field === 'contact'){
            await Entry.findByIdAndUpdate(req.query.e_id,{
                $set : {
                    contact : req.query.f_id
                }
            })

            const entry = await Entry.findById(req.query.e_id)
            .populate('payment')
            .populate('category')
            .populate('contact')

            return res.status(200).json({
                success: true,
                status: 200,
                data: entry,
                message: "Successfully created"
            })
        }else{
            await Entry.findByIdAndUpdate(req.query.e_id,{
                $set : {
                    payment : req.query.f_id
                }
            })

            const entry = await Entry.findById(req.query.e_id)
            .populate('payment')
            .populate('category')
            .populate('contact')

            return res.status(200).json({
                success: true,
                status: 200,
                data: entry,
                message: "Successfully created"
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