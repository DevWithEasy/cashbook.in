import { createCategory, deleteCategory, getCategory, updateCategory } from "../../../database/controllers/categoryControllers";
import initDatabase from "../../../database/initDatabase";
import authentication from "../../../utils/authentication";

function handler(req, res) {
    initDatabase()
    switch (req.method) {
        case 'GET':
            getCategory(req, res)
            break;
        case 'POST':
            createCategory(req, res)
            break;
        case 'DELETE':
            deleteCategory(req, res)
            break;
        case 'PUT':
            updateCategory(req, res)
            break;
            defaults:
            res.setHeader("Allow", ['GET', 'POST', 'PUT', 'DELETE'])
            res.status(405).end(`Method ${req.method} Not Allow`)
    }
}
export default authentication(handler);