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

async function addCustomer(req, res){

    const customerInfos = req.body;
    if(!customerInfos) return res.sendStatus(StatusCodes.BAD_REQUEST);

    const { name, phone, cpf, birthday  } = req.body;

    try {
        const customer = connection.query(
            `INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4)`,
            [name, phone, cpf, birthday]
        );
        return res.sendStatus(StatusCodes.CREATED);

    } catch (error) {
        console.error(error.message);
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

export { listCustomers, addCustomer };
