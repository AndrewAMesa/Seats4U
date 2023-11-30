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

    let errorMessage = "error";

    console.log(event.token)

    // validates if that token already exists
    let tokenAndVenueExists = (token, name) => {
        return new Promise((resolve, reject) => {
            pool.query("SELECT * FROM Venues WHERE venueToken=? && venueName=?", [token, name], (error, rows) => {
                if (error) {
                    return reject(error);
                }
                console.log(rows)
                if ((rows) && (rows.length >= 1)) {
                    return resolve(true);
                } else {
                    errorMessage = "Token or venue name does not exist"
                    return resolve(false);
                }
            });
        });
    };

    // validates if that show already exists
    let showExists = (showName, date, time) => {
        return new Promise((resolve, reject) => {
            pool.query("SELECT * FROM Shows WHERE showName=? AND showDate=? AND showTime=?", [showName, date, time], (error, rows) => {
                if (error) {
                    return reject(error);
                }
                console.log(rows)
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
    const alreadyExists = await showExists(event.showName, event.showDate, event.showTime);
    console.log("checking")
    
    // If the show doesn't exist and the token is valid, add the show to the database
    if (!alreadyExists && validToken) {

        // adds show to database
        let createShow = (showName, showDate, showTime, price, venueName) => {
            return new Promise((resolve, reject) => {
                pool.query("INSERT into Shows(showName, showDate, showTime, defaultPrice, venueName) VALUES(?,?,?,?,?);", [showName, showDate, showTime, price, venueName], (error, rows) => {
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

        // Execute the show creation function
        let venueCreationResult = await createShow(event.showName, event.showDate, event.showTime, event.defaultPrice, event.venueName)
        if (venueCreationResult == true){
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