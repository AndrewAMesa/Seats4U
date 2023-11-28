const mysql = require('mysql');
const db_access = require('/opt/nodejs/db_access');

exports.handler = async (event) => {

    // get credentials from the db_access layer (loaded separately via AWS console)
    var pool = mysql.createPool({
        host: db_access.config.host,
        user: db_access.config.user,
        password: db_access.config.password,
        database: db_access.config.database
    });

    let errorMessage = "";

    console.log(event.name)
    // validates if that venue name already exists
    let venueNameExists = (name) => {
        return new Promise((resolve, reject) => {
            pool.query("SELECT * FROM Venues WHERE venueName=?", [name], (error, rows) => {
                if (error) {
                    return reject(error);
                }
                console.log(rows)
                if ((rows) && (rows.length >= 1)) {
                    errorMessage = "Venue name already exists"
                    return resolve(true);
                } else {
                    return resolve(false);
                }
            });
        });
    };

    let response = undefined;
    const alreadyExists = await venueNameExists(event.name);
    console.log("checking")
    if (!alreadyExists) {
        let token = '';
        let isTokenUnique = false;

        while (!isTokenUnique) {
            // Generates a random token
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            token = '';

            for (let i = 0; i < 20; i++) {
                const randomIndex = Math.floor(Math.random() * characters.length);
                token += characters.charAt(randomIndex);
            }

            console.log(token)
            // validates if a token already exists
            let tokenExists = (token) => {
                return new Promise((resolve, reject) => {
                    pool.query("SELECT * FROM Venues WHERE venueToken=?", [token], (error, rows) => {
                        if (error) {
                            return reject(error);
                        }
                        console.log(token)
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

        // adds venue to database
        let createVenue = (token, name, location) => {
            return new Promise((resolve, reject) => {
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
        }

        let createSections = (rows, columns, region, venueName) => {
            return new Promise((resolve, reject) => {
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
        }

        let venueCreationResult = await createVenue(token, event.name, event.locations)
        await createSections("left", event.name, event.rows, event.leftColumns)
        await createSections("center", event.name, event.rows, event.centerColumns)
        await createSections("right", event.name, event.rows, event.rightColumns)
        response = {
            statusCode: 200,
            token: token
        }
    } else {
        response = {
            statusCode: 400,
            error: errorMessage
        };
    }

    pool.end();   // done with DB
    return response;
};
