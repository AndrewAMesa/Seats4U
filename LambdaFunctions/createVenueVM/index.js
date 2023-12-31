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

    // Validates if that venue name already exists
    let venueNameExists = (name) => {
        return new Promise((resolve, reject) => {
            // Query to check if the venue name exists
            pool.query("SELECT * FROM Venues WHERE venueName=?", [name], (error, rows) => {
                if (error) {
                    return reject(error);
                }
                if ((rows) && (rows.length >= 1)) {
                    errorMessage = "Venue name already exists";
                    return resolve(true);
                } else {
                    return resolve(false);
                }
            });
        });
    };

    let response = undefined;
    const alreadyExists = await venueNameExists(event.venueName);

    if (!alreadyExists) {
        let token = '';
        let isTokenUnique = false;

        // Generate a unique token
        while (!isTokenUnique) {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            token = '';

            // Generate a random token
            for (let i = 0; i < 20; i++) {
                const randomIndex = Math.floor(Math.random() * characters.length);
                token += characters.charAt(randomIndex);
            }

            // Validates if a token already exists
            let tokenExists = (token) => {
                return new Promise((resolve, reject) => {
                    // Query to check if the token exists
                    pool.query("SELECT * FROM Venues WHERE venueToken=?", [token], (error, rows) => {
                        if (error) {
                            return reject(error);
                        }
                        if ((rows) && (rows.length >= 1)) {
                            return resolve(true);
                        } else {
                            return resolve(false);
                        }
                    });
                });
            };

            // Check if the generated token already exists
            try {
                const exists = await tokenExists(token);
                isTokenUnique = !exists;
            } catch (error) {
                throw error;
            }
        }

        // Adds venue to the database
        let createVenue = (token, name, location) => {
            return new Promise((resolve, reject) => {
                // Query to insert venue details into the database
                pool.query("INSERT into Venues(venueToken, venueName, location) VALUES(?,?,?);", [token, name, location], (error, rows) => {
                    if (error) {
                        return reject(error);
                    }
                    if ((rows) && (rows.affectedRows >= 1)) {
                        return resolve(true);
                    } else {
                        return resolve(false);
                    }
                });
            });
        };

        // Creates sections for the venue
        let createSections = (region, venueName, rows, columns) => {
            return new Promise((resolve, reject) => {
                // Query to insert section details into the database
                pool.query("INSERT into Sections(region, venueName, rowNum, colNum) VALUES(?,?,?,?);", [region, venueName, rows, columns], (error, rows) => {
                    if (error) {
                        return reject(error);
                    }
                    if ((rows) && (rows.affectedRows >= 1)) {
                        return resolve(true);
                    } else {
                        return resolve(false);
                    }
                });
            });
        };

        // Execute venue creation and section creation functions
        let venueCreationResult = await createVenue(token, event.venueName, event.location);
        await createSections("left", event.venueName, event.rowNum, event.leftColumns);
        await createSections("center", event.venueName, event.rowNum, event.centerColumns);
        await createSections("right", event.venueName, event.rowNum, event.rightColumns);

        // Successful response
        response = {
            statusCode: 200,
            token: JSON.stringify(token),
        };
    } else {
        // If the venue name already exists, return an error response
        response = {
            statusCode: 400,
            error: JSON.stringify(errorMessage)
        };
    }

    pool.end();   // Done with DB
    return response;
};