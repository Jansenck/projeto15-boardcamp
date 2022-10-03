import { StatusCodes } from "http-status-codes";
import connection from "../database/database.js";

async function listGames(req, res){

    try {
        const games = await connection.query(`SELECT * FROM games`);
        return res.send(games.rows).status(StatusCodes.OK);

    } catch (error) {
        console.error(error.message);
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function addGame(req, res){
    const gameInfos = req.body;
    if(!gameInfos) return res.sendStatus(StatusCodes.BAD_REQUEST);

    const { name, image, stockTotal, categoryId, pricePerDay } = req.body;

    try {
        connection.query(
            `INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5);`,
             [name, image, stockTotal, categoryId, pricePerDay]
        );

        return res.sendStatus(StatusCodes.CREATED);
        
    } catch (error) {
        console.error(error.message);
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

export { addGame, listGames };


  
  
  
