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
    let alreadyExists = undefined;

    const currentDateTime = new Date().toISOString();

    // Split the string into date and time
    const datePart = currentDateTime.slice(0, 10); // YYYY-MM-DD
    const timePart = currentDateTime.slice(11, 19); // HH:MM:SS
    // Validates if that showID already exists
    let showIDExists = (showID) => {
        return new Promise((resolve, reject) => {
            // SQL query to check if the showID exists
            pool.query("SELECT * FROM Shows WHERE showID=? AND (showDate>? or (showDate=? AND showTime>?)) AND isActive=1", [showID, datePart, datePart, timePart], (error, rows) => {
                if (error) {
                    return reject(error);
                }
                if ((rows) && (rows.length >= 1)) {
                    return resolve(true);
                } else {
                    errorMessage = "Show does not exist or show has already passed";
                    return resolve(false);
                }
            });
        });
    };
    alreadyExists = await showIDExists(event.showID);

    let response = undefined;

    if (alreadyExists) {
        let region = undefined
        let getSeatPrice = (showID, colNum, rowNum) => {
            return new Promise((resolve, reject) => {
                // SQL query to get the seat price
                pool.query("SELECT price,section FROM Seats WHERE showID=? AND rowNum=? AND colNum=? AND isSelected=1",
                    [showID, rowNum, colNum], (error, rows) => {
                        if (error) {
                            return reject(error);
                        }
                        if ((rows) && (rows.length >= 1)) {
                            if (rows[0].section == 0) {
                                region = "left"
                            } else if (rows[0].section == 1) {
                                region = "center"
                            } else {
                                region = "right"
                            }
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
                pool.query("UPDATE Seats SET isAvailable = 0, isSelected = 1 WHERE showID=? AND rowNum=? AND colNum=? AND isAvailable=1",
                    [showID, rowNum, colNum], (error, rows) => {
                        if (error) {
                            return reject(error);
                        }
                        if (rows.affectedRows > 0) {
                            return resolve(true);
                        } else {
                            return resolve(false);
                        }
                    });
            });
        };


        let updateSeatEnd = (showID, colNum, rowNum) => {
            return new Promise((resolve, reject) => {
                // SQL query to update the seat availability
                pool.query("UPDATE Seats SET isSelected = 0 WHERE showID=? AND rowNum=? AND colNum=? AND isSelected=1",
                    [showID, rowNum, colNum], (error, rows) => {
                        if (error) {
                            return reject(error);
                        }

                        return resolve(true);
                    });
            });
        };

        let updateShow = (showID) => {
            return new Promise((resolve, reject) => {
                // SQL query to update the seat availability
                pool.query("UPDATE Shows SET availableSeatsCounter = availableSeatsCounter - 1 WHERE showID=?",
                    [showID], (error, rows) => {
                        if (error) {
                            return reject(error);
                        }
                        return resolve(true);
                    });
            });
        };

        let updateBlock = (showID, row, section) => {
            return new Promise((resolve, reject) => {
                // SQL query to update the seat availability
                pool.query("UPDATE Blocks SET seatsAvailable = seatsAvailable - 1, seatsPurchased = seatsPurchased + 1 WHERE showID=? AND region=? AND rowStart <= ? AND rowEnd >= ?",
                    [showID, section, row, row], (error, rows) => {
                        if (error) {
                            return reject(error);
                        }
                        return resolve(true);
                    });
            });
        };

        let checkIfSoldOut = (showID) => {
            return new Promise((resolve, reject) => {
                // SQL query to update the seat availability
                pool.query("SELECT availableSeatsCounter FROM Shows WHERE showID=? AND availableSeatsCounter=0",
                    [showID], (error, rows) => {
                        if (error) {
                            return reject(error);
                        }
                        if (rows.length >= 1) {
                            pool.query("UPDATE Shows SET soldOut=1 WHERE showID=?",
                                [showID], (error, rows) => {
                                    if (error) {
                                        return reject(error);
                                    }
                                    if (rows.affectedRows >= 1) {
                                        return resolve(true);
                                    } else {
                                        return resolve(false);
                                    }
                                });
                        } else {
                            return resolve(false);
                        }
                    });
            });
        };

        let updateShowRevenue = (showID, totalPrice) => {
            return new Promise((resolve, reject) => {
                // SQL query to update the seat availability
                pool.query("UPDATE Shows SET revenue = revenue + ? WHERE showID=?",
                    [totalPrice, showID], (error, rows) => {
                        if (error) {
                            return reject(error);
                        }
                        return resolve(true);
                    });
            });
        };

        let totalPrice = 0;
        let seatString = ""
        // Loop through each seat in the event
        for (let i = 0; i < event.seats.length; i++) {
            if (await updateSeat(event.showID, event.seats[i].colNum, event.seats[i].rowNum)) {
                totalPrice = totalPrice + await getSeatPrice(event.showID, event.seats[i].colNum, event.seats[i].rowNum);
                let tempSeat = String.fromCharCode(event.seats[i].rowNum + 'A'.charCodeAt(0))
                seatString = seatString + (tempSeat + (event.seats[i].colNum + 1)) + ", "
                await updateShow(event.showID)
                await updateBlock(event.showID, event.seats[i].rowNum, region)
            }
            await updateSeatEnd(event.showID, event.seats[i].colNum, event.seats[i].rowNum);
        }
        await checkIfSoldOut(event.showID)
        await updateShowRevenue(event.showID, totalPrice)

        // Check the total price and generate the response
        if (totalPrice == 0) {
            response = {
                statusCode: 400,
                error: JSON.stringify("All seats selected have already been bought!")
            };
        } else {
            response = {
                statusCode: 200,
                price: totalPrice,
                seats: seatString
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