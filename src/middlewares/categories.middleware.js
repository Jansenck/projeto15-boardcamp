import joi from "joi";
import { StatusCodes } from "http-status-codes";
import connection from "../database/database.js";

const categoriesSchema = joi.object({
    name: joi.string().empty().required()
});


async function categoriesValidation(req, res, next){

    const name = req.body?.name;
    if(!name) return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);

    const isValidCategory = categoriesSchema.validate(req.body, {abortEarly: false});

    if(isValidCategory.error){
        const categoryError = isValidCategory.error.details.map(detail => detail.message);
        return res.send(categoryError).status(StatusCodes.UNPROCESSABLE_ENTITY);
    }

    try {
        const categoryAlreadyExists = await connection.query(
            `SELECT * FROM categories WHERE name = $1;`, [name]
        );
        
        if(categoryAlreadyExists.rows.length !== 0) return res.sendStatus(StatusCodes.CONFLICT);

        connection.query(`INSERT INTO categories (name) VALUES ($1);`, [name]);
        return res.sendStatus(StatusCodes.CREATED);

    } catch (error) {
        console.error(error.message);
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

export default categoriesValidation;


