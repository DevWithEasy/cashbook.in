import initDatabase from "../../../database/initDatabase"
import Business from "../../../database/model/Business"
import authentication from "../../../utils/authentication"

async function handler(req, res) {
    initDatabase()
    try {
        console.log(req.body)
        await Business.updateOne({
            _id: req.body.b_id,
            'teams._id': req.body.t_id
        },
            {
                $set: {
                    'user' : req.body.u_id,
                    'teams.$.user': req.user.id
                }
            }
        )

        const business = await Business.findById(req.body.b_id)
            .populate('user')
            .populate({
                path: 'teams',
                populate: {
                    path: 'user',
                    model: 'User'
                }
            })

        return res.status(200).json({
            success: true,
            status: 200,
            data: business,
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