import { createBusiness, deleteBusiness, getBusiness, updateBusiness } from "../../../database/controllers/businessControllers";
import authentication from "../../../utils/authentication";

function handler(req, res) {
    switch (req.method) {
        case 'GET':
            getBusiness(req, res)
            break;
        case 'POST':
            createBusiness(req, res)
            break;
        case 'DELETE':
            deleteBusiness(req, res)
            break;
        case 'PUT':
            updateBusiness(req, res)
            break;
            defaults:
            res.setHeader("Allow", ['GET', 'POST', 'PUT', 'DELETE'])
            res.status(405).end(`Method ${req.method} Not Allow`)
    }
}

export default authentication(handler)