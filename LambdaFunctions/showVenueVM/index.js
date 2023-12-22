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

    // Validates if that token already exists
    let tokenExists = (venueToken) => {
        return new Promise((resolve, reject) => {
            // SQL query to check if the venue token exists
            pool.query("SELECT * FROM Venues WHERE venueToken=?", [venueToken], (error, rows) => {
                if (error) {
                    return reject(error);
                }
                if ((rows) && (rows.length >= 1)) {
                    return resolve(true);
                } else {
                    errorMessage = "Token does not exist";
                    return resolve(false);
                }
            });
        });
    };

    // Check if the token is valid
    const validToken = await tokenExists(event.venueToken);

    // If the token is valid, select the venue from the database
    if (validToken) {
        let selectVenue = (venueToken) => {
            return new Promise((resolve, reject) => {
                // SQL query to select venue information with sections based on venueToken
                pool.query("SELECT * FROM Venues JOIN Sections ON Venues.venueName = Sections.venueName WHERE venueToken=?", [venueToken], (error, rows) => {
                    if (error) {
                        return reject(error);
                    }
                    if ((rows) && (rows.length >= 1)) {
                        return resolve(rows);
                    } else {
                        errorMessage = "Not deleted";
                        return resolve(false);
                    }
                });
            });
        }

        // Execute the selectVenue function
        const result = await selectVenue(event.venueToken);

        const response = {
            statusCode: 200,
            show: result
        };

        // Disconnect from the database to avoid "too many connections" problem
        pool.end();
        return response;
    } else {
        // If the token is not valid, return an error response
        const response = {
            statusCode: 400,
            error: JSON.stringify("Venue does not exist")
        };

        // Disconnect from the database to avoid "too many connections" problem
        pool.end();
        return response;
    }
};