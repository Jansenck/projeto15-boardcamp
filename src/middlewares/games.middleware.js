import joi from "joi";
import { StatusCodes } from "http-status-codes";
import connection from "../database/database.js";

const gamesSchema = joi.object({
    name: joi.string().empty().required(), 
    image: joi.string().uri().empty().required(), 
    stockTotal: joi.number().integer().min(1).required(), 
    categoryId: joi.number().integer().required(),
    pricePerDay: joi.number().greater(0).required()
});

async function gamesValidation(req, res, next){

    const gameName = req.body?.name;
    if(!gameName) return res.sendStatus(StatusCodes.BAD_REQUEST);

    const { name, image, stockTotal, categoryId, pricePerDay } = req.body;

    const isValidGame = gamesSchema.validate(
        { name, image, stockTotal, categoryId, pricePerDay }, 
        {abortEarly: false}
    );

    
    if(isValidGame.error){
        const gameError = isValidGame.error.details.map(detail => detail.message);
        return res.status(StatusCodes.BAD_REQUEST).send(gameError); 
    }

    try {
        const game = await connection.query(`SELECT * FROM games WHERE name = $1`, [gameName]);
        if(game.rows.length !== 0) return res.sendStatus(StatusCodes.CONFLICT);
        next();

    } catch (error) {
        console.error(error.message);
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }

}

export default gamesValidation;