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

    // Token validation: Check if the token exists and retrieve the associated venue name
    let venueName = undefined;
    let tokenAndVenueExists = (token) => {
        return new Promise((resolve, reject) => {
            pool.query("SELECT * FROM Venues WHERE venueToken=?", [token], (error, rows) => {
                if (error) {
                    return reject(error);
                }
                if ((rows) && (rows.length >= 1)) {
                    venueName = rows[0].venueName;
                    return resolve(true);
                } else {
                    errorMessage = "Token or venue name does not exist";
                    return resolve(false);
                }
            });
        });
    };

    // Show existence validation: Check if the show with the same details already exists at the venue
    let showExists = (showName, date, time, venueName) => {
        return new Promise((resolve, reject) => {
            pool.query("SELECT * FROM Shows WHERE showName=? AND showDate=? AND showTime=? AND venueName=?", [showName, date, time, venueName], (error, rows) => {
                if (error) {
                    return reject(error);
                }
                if ((rows) && (rows.length >= 1)) {
                    errorMessage = "Exact show already exists at the venue";
                    return resolve(true);
                } else {
                    return resolve(false);
                }
            });
        });
    };

    let response = undefined;
    const validToken = await tokenAndVenueExists(event.venueToken);
    const alreadyExists = await showExists(event.showName, event.showDate, event.showTime, venueName);

    let tempShowID = 0;

    // If the show doesn't exist and the token is valid, add the show to the database
    if (!alreadyExists && validToken) {
        // Venue size retrieval: Find the venue size based on sections
        let findVenueSize = (venueName) => {
            return new Promise((resolve, reject) => {
                pool.query("SELECT region, rowNum, colNum FROM Sections WHERE venueName=?", [venueName], (error, rows) => {
                    if (error) {
                        return reject(error);
                    }
                    if (rows) {
                        return resolve(rows);
                    } else {
                        return resolve(false);
                    }
                });
            });
        };

        // Retrieve venue size
        let size = await findVenueSize(venueName);

        // Calculate total seats
        const columnCount = size.reduce((sum, row) => sum + row.colNum, 0);
        const rowCount = size[0].rowNum;
        const totalSeats = columnCount * rowCount;

        // Show creation: Add the show to the database
        let createShow = (showName, showDate, showTime, price, venueName) => {
            return new Promise((resolve, reject) => {
                pool.query("INSERT into Shows(showName, showDate, showTime, defaultPrice, availableSeatsCounter, venueName) VALUES(?,?,?,?,?,?);", [showName, showDate, showTime, price, totalSeats, venueName], (error, rows) => {
                    if (error) {
                        return reject(error);
                    }
                    if ((rows) && (rows.affectedRows >= 1)) {
                        tempShowID = rows.insertId;
                        return resolve(true);
                    } else {
                        return resolve(false);
                    }
                });
            });
        }

        // Execute the show creation function
        let venueCreationResult = await createShow(event.showName, event.showDate, event.showTime, event.defaultPrice, venueName);

        // Add seats to the database
        let addSeat = (showID, rowNum, columnNum, price, section) => {
            return new Promise((resolve, reject) => {
                pool.query("INSERT into Seats(showID, rowNum, colNum, price, section) VALUES(?,?,?,?,?);", [showID, rowNum, columnNum, price, section], (error, rows) => {
                    if (error) {
                        return reject(error);
                    }
                    if (rows) {
                        return resolve(true);
                    } else {
                        return resolve(false);
                    }
                });
            });
        }

        // Loop to add seats
        let section = 0;
        for (let i = 0; i < columnCount; i++) {
            if (i + 1 > size[0].colNum && i < size[0].colNum + 1) {
                section++;
            } else if (i + 1 > size[1].colNum + size[0].colNum && i < size[0].colNum + size[1].colNum + 1) {
                section++;
            }
            for (let j = 0; j < rowCount; j++) {
                await addSeat(tempShowID, j, i, event.defaultPrice, section);
            }
        }

        if (venueCreationResult == true) {
            response = {
                statusCode: 200,
                showID: tempShowID
            }
        }
    } else {
        // If the show already exists or the token is invalid, return an error response
        response = {
            statusCode: 400,
            error: JSON.stringify(errorMessage)
        };
    }

    pool.end();   // Done with DB
    return response;
};