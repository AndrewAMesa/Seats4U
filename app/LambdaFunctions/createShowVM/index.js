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

    // Log the token from the event
    // console.log(event.token)

    // Validates if that token already exists
    let tokenAndVenueExists = (token, name) => {
        return new Promise((resolve, reject) => {
            pool.query("SELECT * FROM Venues WHERE venueToken=? && venueName=?", [token, name], (error, rows) => {
                if (error) {
                    return reject(error);
                }
                // console.log(rows)
                if ((rows) && (rows.length >= 1)) {
                    return resolve(true);
                } else {
                    errorMessage = "Token or venue name does not exist"
                    return resolve(false);
                }
            });
        });
    };

    // Validates if that show already exists
    let showExists = (showName, date, time, venueName) => {
        return new Promise((resolve, reject) => {
            pool.query("SELECT * FROM Shows WHERE showName=? AND showDate=? AND showTime=? AND venueName=?", [showName, date, time, venueName], (error, rows) => {
                if (error) {
                    return reject(error);
                }
                // console.log(rows)
                if ((rows) && (rows.length >= 1)) {
                    errorMessage = "Exact show already exists at venue"
                    return resolve(true);
                } else {
                    return resolve(false);
                }
            });
        });
    };

    let response = undefined;
    const validToken = await tokenAndVenueExists(event.venueToken, event.venueName);
    const alreadyExists = await showExists(event.showName, event.showDate, event.showTime, event.venueName);
    // console.log("checking")

    let tempShowID = 0;

    // If the show doesn't exist and the token is valid, add the show to the database
    if (!alreadyExists && validToken) {
        // console.log("in loop")

                // Finds the venue 
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
        }

        let size = await findVenueSize(event.venueName);
        console.log(size)
        const columnCount = size.reduce((sum, row) => sum + row.colNum, 0);
        const rowCount = size[0].rowNum;
        const totalSeats = columnCount * rowCount

        // Adds show to the database
        let createShow = (showName, showDate, showTime, price, venueName) => {
            return new Promise((resolve, reject) => {
                pool.query("INSERT into Shows(showName, showDate, showTime, defaultPrice, availableSeatsCounter, venueName) VALUES(?,?,?,?,?,?);", [showName, showDate, showTime, price, totalSeats, venueName], (error, rows) => {
                    if (error) {
                        return reject(error);
                    }
                    if ((rows) && (rows.affectedRows >= 1)) {
                        // console.log(rows)
                        tempShowID = rows.insertId;
                        // console.log(rows)
                        return resolve(true);

                    } else {
                        return resolve(false);
                    }
                });
            });
        }

        // Execute the show creation function
        let venueCreationResult = await createShow(event.showName, event.showDate, event.showTime, event.defaultPrice, event.venueName);

        // Adds seats to the database
        let addSeat = (showID, rowNum, columnNum, price, section) => {
            return new Promise((resolve, reject) => {
                pool.query("INSERT into Seats(showID, rowNum, colNum, price, section) VALUES(?,?,?,?,?);", [showID, rowNum, columnNum,price, section], (error, rows) => {
                    if (error) {
                        return reject(error);
                    }
                    if (rows) {
                        // console.log("did it")
                        return resolve(true);

                    } else {
                        return resolve(false);
                    }
                });
            });
        }

        // console.log(columnCount)
        // Loop to add seats
        let section = 0
        for (let i = 0; i < columnCount; i++) {
            if (i + 1 > size[0].colNum && i < size[0].colNum + 1){
                section++;
            } else if (i + 1 > size[1].colNum + size[0].colNum && i < size[0].colNum + size[1].colNum + 1){
                section++;
            }
            for (let j = 0; j < rowCount; j++) {
                await addSeat(tempShowID, j, i, event.defaultPrice, section);
            }
        }

        if (venueCreationResult == true) {
            response = {
                statusCode: 200
            }
        }
    } else {
        // If the show already exists or the token is invalid, return an error response
        response = {
            statusCode: 400,
            error: JSON.stringify(errorMessage)
        };
    }

    pool.end();   // done with DB
    return response;
};