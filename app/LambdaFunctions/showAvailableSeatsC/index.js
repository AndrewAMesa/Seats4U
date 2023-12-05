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

    console.log(event.name);

    let alreadyExists = undefined;

    // Validates if that show already exists
    let showNameExists = (showID) => {
        return new Promise((resolve, reject) => {
            // SQL query to check if the show ID exists
            pool.query("SELECT * FROM Shows WHERE showID=?", [showID], (error, rows) => {
                if (error) {
                    return reject(error);
                }
                console.log(rows);
                if ((rows) && (rows.length >= 1)) {
                    return resolve(true);
                } else {
                    errorMessage = "Show does not exist";
                    return resolve(false);
                }
            });
        });
    };
    alreadyExists = await showNameExists(event.showID);

    let response = undefined;
    console.log("checking");
    let allSeats = undefined;

    if (alreadyExists) {
        // If the show already exists, retrieve available seats
        let listAvailableSeats = (showID) => {
            return new Promise((resolve, reject) => {
                pool.query("SELECT rowNum, colNum, isSelected, price FROM Seats WHERE showID=? AND isAvailable=1",
                    [showID], (error, rows) => {
                        if (error) {
                            return reject(error);
                        }
                        return resolve(rows);
                    });
            });
        };

        allSeats = await listAvailableSeats(event.showID);

        response = {
            statusCode: 200,
            shows: allSeats
        };
    } else {
        // If the show doesn't exist, return an error response
        response = {
            statusCode: 400,
            error: JSON.stringify(errorMessage)
        };
    }

    pool.end();   // Done with DB
    return response;
};