/* import joi from "joi";
import { StatusCodes } from "http-status-codes";
import connection from "../database/database.js";

const = customerSchema = joi.object({
    name: joi.string().empty().required(),
    phone: joi.string().pattern(new RegExp('\d{11}')).required(),
    cpf: joi.string().pattern(new RegExp('[0-9]').min(10).max(11).required()),
    birthday: joi.string().pattern(new RegExp('^[1-31]\d{2}\-[1-12]\d{2}\-[1850-2022]\d{4}')).required()
});

async function validateCustomers(req, res, next){

    const customersInfos = req.body;
    if(!customersInfos) return res.sendStatus(StatusCodes.BAD_REQUEST);

    const { name, phone, cpf, birthday } = req.body;

    const isValidCustomer = customerSchema.validate({name, phone, cpf, birthday});

    try {
        
    } catch (error) {
        console.error(error.message);
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

export default validateCustomers; */