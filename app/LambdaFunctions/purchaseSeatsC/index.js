const mysql = require('mysql');
const db_access = require('/opt/nodejs/db_access');

exports.handler = async (event) => {
    // Get credentials from the db_access layer (loaded separately via AWS console)
    var pool = mysql.createPool({
        host: db_access.config.host,
        user: db_access.config.user,
        password: db_access.config.password,
        database: db_access.config.database
    });

    let errorMessage = "error";

    // Log the name from the event (for debugging purposes)
    // console.log(event.name);

    let alreadyExists = undefined;

    // Validates if that showID already exists
    let showIDExists = (showID) => {
        return new Promise((resolve, reject) => {
            // SQL query to check if the showID exists
            pool.query("SELECT * FROM Shows WHERE showID=?", [showID], (error, rows) => {
                if (error) {
                    return reject(error);
                }
                // console.log(rows);
                if ((rows) && (rows.length >= 1)) {
                    return resolve(true);
                } else {
                    errorMessage = "Show does not exist";
                    return resolve(false);
                }
            });
        });
    };
    alreadyExists = await showIDExists(event.showID);

    let response = undefined;

    if (alreadyExists) {
        let getSeatPrice = (showID, colNum, rowNum) => {
            return new Promise((resolve, reject) => {
                // SQL query to get the seat price
                pool.query("SELECT price FROM Seats WHERE showID=? AND rowNum=? AND colNum=? AND isAvailable=1",
                    [showID, rowNum, colNum], (error, rows) => {
                        if (error) {
                            return reject(error);
                        }
                        if ((rows) && (rows.length >= 1)) {
                            // console.log(rows[0].price);
                            return resolve(rows[0].price);
                        } else {
                            return resolve(0);
                        }
                    });
            });
        };

        let updateSeat = (showID, colNum, rowNum) => {
            return new Promise((resolve, reject) => {
                // SQL query to update the seat availability
                pool.query("UPDATE Seats SET isAvailable = 0 WHERE showID=? AND rowNum=? AND colNum=? AND isAvailable=1",
                    [showID, rowNum, colNum], (error, rows) => {
                        if (error) {
                            return reject(error);
                        }
                        return resolve(true);
                    });
            });
        };

        let totalprice = 0;

        // Loop through each seat in the event
        for (let i = 0; i < event.seats.length; i++) {
            totalprice = totalprice + await getSeatPrice(event.showID, event.seats[i].colNum, event.seats[i].rowNum);
            await updateSeat(event.showID, event.seats[i].colNum, event.seats[i].rowNum);
        }

        // Check the total price and generate the response
        if (totalprice == 0) {
            response = {
                statusCode: 400,
                error: JSON.stringify("All seats selected have already been bought!")
            };
        } else {
            response = {
                statusCode: 200,
                price: totalprice
            };
        }
    } else {
        // If the showID does not exist, return an error response
        response = {
            statusCode: 400,
            error: JSON.stringify(errorMessage)
        };
    }

    pool.end();   // Done with DB
    return response;
};