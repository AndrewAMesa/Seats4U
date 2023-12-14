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
    let tokenExists = (token) => {
        return new Promise((resolve, reject) => {
            pool.query("SELECT * FROM Venues WHERE venueToken=?", [token], (error, rows) => {
                if (error) {
                    return reject(error);
                }
                // If token exists, return true, else set an error message and return false
                if ((rows) && (rows.length >= 1)) {
                    console.log(rows);
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
            pool.query("SELECT * FROM Shows WHERE showID=? AND isActive=0", [showID], (error, rows) => {
                if (error) {
                    return reject(error);
                }
                // If showID exists and is not active, return true, else set an error message and return false
                if ((rows) && (rows.length >= 1)) {
                    return resolve(true);
                } else {
                    errorMessage = "ShowID does not exist or show is active";
                    return resolve(false);
                }
            });
        });
    };

    // Validates if that block overlaps with another one
    let blockIntersects = (showID, region, rowStart, rowEnd) => {
        return new Promise((resolve, reject) => {
            // Check if the new block overlaps with existing blocks
            pool.query("SELECT * FROM Blocks WHERE showID=? AND region=? AND ((?>=rowStart AND ?<= rowEnd) OR (?>= rowStart AND ?<= rowEnd))",
                [showID, region, rowEnd, rowEnd, rowStart, rowStart], (error, rows) => {
                    if (error) {
                        return reject(error);
                    }
                    // If there are overlapping blocks, set an error message and return true, else return false
                    if ((rows) && (rows.length >= 1)) {
                        errorMessage = "Block intersects with another block";
                        return resolve(true);
                    } else {
                        return resolve(false);
                    }
                });
        });
    };

    // Convert row letters to numbers (A=0, B=1, etc.)
    const startRowNumber = event.rowStart.charCodeAt(0) - 'A'.charCodeAt(0);
    const endRowNumber = event.rowEnd.charCodeAt(0) - 'A'.charCodeAt(0);

    let response = undefined;
    const validToken = await tokenExists(event.venueToken);
    const showIDExists = await showExists(event.showID);
    const blockInvalid = await blockIntersects(event.showID, event.region, startRowNumber, endRowNumber);
    let totalSeats = 0
    let blockID = undefined
    // If the show does exist and the token is valid, add the block to the database
    if (showIDExists && validToken && !blockInvalid) {
        // Finds the venue

        // Create a new block in the database
        let createBlock = (showID, price, region, rowStart, rowEnd, totalSeats) => {
            return new Promise((resolve, reject) => {
                pool.query("INSERT into Blocks(price, showID, region, rowStart, rowEnd, seatsAvailable) VALUES(?,?,?,?,?,?);", [price, showID, region, rowStart, rowEnd, totalSeats], (error, rows) => {
                    if (error) {
                        return reject(error);
                    }
                    // If the block is created successfully, return true, else return false
                    if ((rows) && (rows.affectedRows >= 1)) {
                        console.log("Block successfully created");
                        blockID = rows.insertId;
                        return resolve(true);
                    } else {
                        return resolve(false);
                    }
                });
            });
        }

        // Update seat prices for each row in the new block
        let updateSeatPrice = (showID, price, region, row) => {
            return new Promise((resolve, reject) => {
                pool.query("UPDATE Seats SET price=? WHERE section=? AND rowNum=? AND showID=?", [price, region, row, showID], (error, rows) => {
                    if (error) {
                        return reject(error);
                    }
                    // If seat price is updated successfully, return true, else return false
                    if ((rows) && (rows.affectedRows >= 1)) {
                        totalSeats += rows.affectedRows
                        return resolve(true);
                    } else {
                        return resolve(false);
                    }
                });
            });
        }

        // Map region string to a numerical value
        let tempRegion = -1
        if (event.region == "left") {
            tempRegion = 0
        } else if (event.region == "center") {
            tempRegion = 1
        } else {
            tempRegion = 2
        }

        
        // Update seat prices for each row in the new block
        for (let i = startRowNumber; i < endRowNumber + 1; i++) {
            await updateSeatPrice(event.showID, event.price, tempRegion, i)
        }


        // Create a new block in the database
        let createdBlock = await createBlock(event.showID, event.price, event.region, startRowNumber, endRowNumber, totalSeats);

   
        if (createdBlock) {
            response = {
                statusCode: 200,
                blockID: JSON.stringify(blockID)
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