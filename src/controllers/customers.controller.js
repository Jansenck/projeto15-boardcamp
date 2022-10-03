import { StatusCodes } from "http-status-codes";
import connection from "../database/database.js";

async function listCustomers(req, res){

    try {
        const customers = await connection.query(`
            SELECT * FROM customers;
        `);

        return res.send(customers.rows).status(StatusCodes.OK);

    } catch (error) {
        console.error(error.message);
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

export { listCustomers };
