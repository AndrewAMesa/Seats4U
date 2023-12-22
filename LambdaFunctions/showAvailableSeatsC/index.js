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

    let alreadyExists = undefined;

    // Validates if that show exists
    let showNameExists = (showID) => {
        return new Promise((resolve, reject) => {
            // SQL query to check if the show exists
            pool.query("SELECT * FROM Shows WHERE showID=?", [showID], (error, rows) => {
                if (error) {
                    return reject(error);
                }
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
    let allSeats = undefined;

    let queryString = undefined;
    // Determine the sorting order based on event type
    if (event.type == "section") {
        queryString = "SELECT rowNum, colNum, isSelected, price, section, isAvailable FROM Seats WHERE showID=? ORDER BY section ASC";
    } else if (event.type == "price") {
        queryString = "SELECT rowNum, colNum, isSelected, price, section, isAvailable FROM Seats WHERE showID=? ORDER BY price DESC";
    } else {
        queryString = "SELECT rowNum, colNum, isSelected, price, section, isAvailable FROM Seats WHERE showID=? ORDER BY rowNum ASC";
    }

    if (alreadyExists) {
        // Retrieve available seats based on the sorting order
        let listAvailableSeats = (showID) => {
            return new Promise((resolve, reject) => {
                pool.query(queryString, [showID], (error, rows) => {
                    if (error) {
                        return reject(error);
                    }
                    return resolve(rows);
                });
            });
        };

        allSeats = await listAvailableSeats(event.showID);

        // Retrieve all seats (unsorted)
        let listSeats = (showID) => {
            return new Promise((resolve, reject) => {
                pool.query("SELECT rowNum, colNum, isSelected, price, section, isAvailable FROM Seats WHERE showID=? ORDER BY rowNum, colNum ASC", [showID], (error, rows) => {
                    if (error) {
                        return reject(error);
                    }
                    return resolve(rows);
                });
            });
        };

        let allSeats2 = await listSeats(event.showID);

        response = {
            statusCode: 200,
            shows: allSeats,
            shows2: allSeats2
        };
    } else {
        // If the show does not exist, return an error response
        response = {
            statusCode: 400,
            error: JSON.stringify(errorMessage)
        };
    }

    pool.end();   // Done with DB
    return response;
};