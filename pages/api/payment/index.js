import { createPayment, deletePayment, getPayments, updatePayment } from "../../../database/controllers/paymentControllers";
import initDatabase from "../../../database/initDatabase";

export default function handler(req, res) {
    initDatabase()
    switch (req.method) {
        case 'GET':
            getPayments(req, res)
            break;
        case 'POST':
            createPayment(req, res)
            break;
        case 'DELETE':
            deletePayment(req, res)
            break;
        case 'PUT':
            updatePayment(req, res)
            break;
            defaults:
            res.setHeader("Allow", ['GET', 'POST', 'PUT', 'DELETE'])
            res.status(405).end(`Method ${req.method} Not Allow`)
    }
}