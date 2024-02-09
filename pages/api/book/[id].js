import { deleteBook, getBook, updateBook } from "../../../database/controllers/bookControllers";
import initDatabase from "../../../database/initDatabase";
import authentication from "../../../utils/authentication";

function handler(req, res) {
  initDatabase()
  switch (req.method) {
    case 'GET':
      getBook(req, res)
      break;
    case 'POST':
      getBook(req, res)
      break;
    case 'DELETE':
      deleteBook(req, res)
      break;
    case 'PUT':
      updateBook(req, res)
      break;
      defaults:
      res.setHeader("Allow", ['GET', 'POST', 'PUT', 'DELETE'])
      res.status(405).end(`Method ${req.method} Not Allow`)
  }
}
export default authentication(handler);