import { createContact, deleteContact, getContacts, updateContact } from "../../../database/controllers/contactControllers";
import initDatabase from "../../../database/initDatabase";
import authentication from "../../../utils/authentication";

function handler(req, res) {
    initDatabase()
    switch (req.method) {
        case 'GET':
            getContacts(req, res)
            break;
        case 'POST':
            createContact(req, res)
            break;
        case 'DELETE':
            deleteContact(req, res)
            break;
        case 'PUT':
            updateContact(req, res)
            break;
            defaults:
            res.setHeader("Allow", ['GET', 'POST', 'PUT', 'DELETE'])
            res.status(405).end(`Method ${req.method} Not Allow`)
    }
}

export default authentication(handler);