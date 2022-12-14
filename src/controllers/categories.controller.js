import { StatusCodes } from "http-status-codes";
import connection from "../database/database.js";

async function listCategories(req, res){

    try {
        const categories = await connection.query(`
            SELECT * FROM categories;
        `);

        return res.send(categories.rows).status(StatusCodes.OK);

    } catch (error) {
        console.error(error.message);
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function addCategory(req, res){

    const { name } = req.body;
    if(!name) return res.sendStatus(StatusCodes.BAD_REQUEST);

    try {
        connection.query(`INSERT INTO categories (name) VALUES ($1);`, [name]);
        return res.sendStatus(StatusCodes.CREATED);
        
    } catch (error) {
        console.error(error.message);
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }   
}

export { 
    listCategories,
    addCategory
}