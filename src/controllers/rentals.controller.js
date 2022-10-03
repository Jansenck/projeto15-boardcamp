import { StatusCodes } from "http-status-codes";
import connection from "../database/database.js";

async function addRentals(req, res){

    const rentalsInfos = req.body;
    if(!rentalsInfos) return res.sendStatus(StatusCodes.BAD_REQUEST);

    const { customerId, gameId, daysRented } = rentalsInfos;

    try {

        const currentDate = new Date().toISOString().split("T", 1)[0];

        const gamePricePerDay = await connection.query(
            `SELECT games."pricePerDay" FROM games WHERE id = $1;`, 
            [gameId]
        );

        const { pricePerDay } = gamePricePerDay.rows[0];
     
        const rentals = await connection.query(
            `INSERT INTO rentals (
                "customerId", 
                "gameId", 
                "daysRented", 
                "rentDate", 
                "returnDate", 
                "originalPrice", 
                "delayFee"

            ) VALUES ($1, $2, $3, $4 ,$5 , $6, $7);`,

            [customerId, gameId, daysRented, currentDate, null, daysRented*pricePerDay, null ]
        );

        return res.sendStatus(StatusCodes.CREATED);

    } catch (error) {
        console.error(error.message);
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}



export { addRentals };