import { StatusCodes } from "http-status-codes";
import connection from "../database/database.js";

async function addRentals(req, res){

    const rentalsInfos = req.body;
    if(!rentalsInfos) return res.sendStatus(StatusCodes.BAD_REQUEST);

    const { customerId, gameId, daysRented } = rentalsInfos;

    try {

        const currentDate = new Date().toISOString().split("T", 1)[0];

        const customer = await connection.query(
            `SELECT * FROM customers WHERE id = $1;`, 
            [customerId]
        );

        const game = await connection.query(
            `SELECT * FROM games WHERE id = $1;`, 
            [gameId]
        );

        const conditionsForRent = [
            customer.rows.length === 0, 
            game.rows.length === 0, 
            daysRented  <= 0,
            game.rows[0].stockTotal <= 0
        ];

        if(conditionsForRent.includes(true)){
            return res.sendStatus(StatusCodes.BAD_REQUEST)
        };

        const gamePricePerDay = await connection.query(
            `SELECT games."pricePerDay" FROM games WHERE id = $1;`, 
            [gameId]
        );

        const { pricePerDay } = gamePricePerDay.rows[0];
     
        await connection.query(
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

async function listRentals(req, res){

    try {

        const rentals = await connection.query(
            `SELECT * FROM games JOIN customers ON customers.id = rentals."customerId" JOIN games ON games.id = rentals."gameId";`
        );

        const game = await connection.query(`SELECT games.*,  FROM games WHERE id = $1`, [rentals.gameId]);

        return res.status(StatusCodes.OK).send([rentals.rows[0], game.rows[0]]);

    } catch (error) {
        console.error(error.message);
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


export { addRentals, listRentals };