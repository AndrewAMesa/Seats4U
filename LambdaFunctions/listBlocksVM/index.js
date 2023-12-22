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
    let tokenExists = (token) => {
        return new Promise((resolve, reject) => {
            // Check if the venue token exists in the Venues table
            pool.query("SELECT * FROM Venues WHERE venueToken=?", [token], (error, rows) => {
                if (error) {
                    return reject(error);
                }
                // If the token exists, return true; otherwise, set an error message and return false
                if ((rows) && (rows.length >= 1)) {
                    return resolve(true);
                } else {
                    errorMessage = "Token does not exist";
                    return resolve(false);
                }
            });
        });
    };

    // Validates if that show exists
    let showExists = (showID) => {
        return new Promise((resolve, reject) => {
            // Check if the showID exists and is not active in the Shows table
            pool.query("SELECT * FROM Shows WHERE showID=?", [showID], (error, rows) => {
                if (error) {
                    return reject(error);
                }
                // If the showID exists and is not active, return true; otherwise, set an error message and return false
                if ((rows) && (rows.length >= 1)) {
                    return resolve(true);
                } else {
                    errorMessage = "ShowID does not exist";
                    return resolve(false);
                }
            });
        });
    };

    // Check if the token and showID are valid
    const validToken = await tokenExists(event.venueToken);
    const validShowID = await showExists(event.showID);

    let response = undefined;

    // If the token is valid and showID exists, get all blocks
    if (validToken && validShowID) {
        let getBlocks = (showID) => {
            return new Promise((resolve, reject) => {
                // Retrieve all blocks for the specified showID
                pool.query("SELECT * FROM Blocks JOIN Shows ON Blocks.showID = Shows.showID WHERE Blocks.showID=?", [showID], (error, rows) => {
                    if (error) {
                        return reject(error);
                    }
                    // If there are blocks, return them; otherwise, return false
                    if ((rows) && (rows.length >= 1)) {
                        return resolve(rows);
                    } else {
                        return resolve(false);
                    }
                });
            });
        };

        // Get all blocks for the specified showID
        const allBlocks = await getBlocks(event.showID);

        // Prepare the response
        response = {
            statusCode: 200,
            blocks: allBlocks
        };

    } else {
        // If the token is invalid or showID does not exist, return an error response
        response = {
            statusCode: 400,
            error: JSON.stringify(errorMessage)
        };
    }

    // Close the database connection
    pool.end();

    // Return the response
    return response;
};