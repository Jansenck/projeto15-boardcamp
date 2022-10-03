import joi from "joi";
import { StatusCodes } from "http-status-codes";
import connection from "../database/database.js";

const customerSchema = joi.object({
    name: joi.string().empty().required(),
    phone: joi.string().min(10).max(11).pattern(new RegExp('^[0-9]+$')).required(),
    cpf: joi.string().length(11).pattern(new RegExp('^[0-9]+$')).required(),
    birthday: joi.date().max("now").required()
});

async function validateCustomers(req, res, next){

    const customersInfos = req.body;
    if(!customersInfos) return res.sendStatus(StatusCodes.BAD_REQUEST);

    const { name, phone, cpf, birthday } = req.body;
    const isValidCustomer = customerSchema.validate({name, phone, cpf, birthday});

    if(isValidCustomer.error){
        const customerError = isValidCustomer.error.details.map(detail => detail.message);
        return res.status(StatusCodes.BAD_REQUEST).send(customerError);
    }

    try {
        const customer = await connection.query(`SELECT * FROM customers WHERE cpf = $1;`, [cpf]);
        if(customer.rows.length !== 0) return res.sendStatus(StatusCodes.CONFLICT);

        next();
        
    } catch (error) {
        console.error(error.message);
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

export default validateCustomers;