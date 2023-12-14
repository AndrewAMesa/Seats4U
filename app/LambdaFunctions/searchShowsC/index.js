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

    // Log the event name to the console

    let alreadyExists = undefined;

    // Check the type of event (0 for venue, 1 for show)
    if (event.type == 0) {
        // Validates if that venue name already exists
        let venueNameExists = (name) => {
            return new Promise((resolve, reject) => {
                // SQL query to check if the venue name exists (partial match)
                pool.query("SELECT * FROM Venues WHERE venueName LIKE CONCAT('%', ?, '%')", [name], (error, rows) => {
                    if (error) {
                        return reject(error);
                    }
                    if ((rows) && (rows.length >= 1)) {
                        return resolve(true);
                    } else {
                        errorMessage = "Venue name does not exist";
                        return resolve(false);
                    }
                });
            });
        };
        alreadyExists = await venueNameExists(event.name);
    } else {
        // Validates if that show name already exists
        let showNameExists = (name) => {
            return new Promise((resolve, reject) => {
                // SQL query to check if the show name exists (partial match)
                pool.query("SELECT * FROM Shows WHERE showName LIKE CONCAT('%', ?, '%')", [name], (error, rows) => {
                    if (error) {
                        return reject(error);
                    }
                    if ((rows) && (rows.length >= 1)) {
                        return resolve(true);
                    } else {
                        errorMessage = "Show name does not exist";
                        return resolve(false);
                    }
                });
            });
        };
        alreadyExists = await showNameExists(event.name);
    }

    let response = undefined;
    let allShows = undefined;

    if (alreadyExists) {
        if (event.type == 0) {
            // Retrieve all shows for a specific venue
            let ListShowsVenue = (name) => {
                return new Promise((resolve, reject) => {
                    // SQL query to retrieve shows for a venue (partial match on venueName, ordered by showDate)
                    pool.query("SELECT showName, showDate, showTime, defaultPrice, soldOut, showID, venueName FROM Shows WHERE venueName LIKE CONCAT('%', ?, '%') AND isActive = 1 ORDER BY showDate ASC",
                        [name], (error, rows) => {
                            if (error) {
                                return reject(error);
                            }
                            return resolve(rows);
                        })
                })
            }

            allShows = await ListShowsVenue(event.name)
        } else {
            // Retrieve all shows for a specific show name
            let ListShowsShow = (name) => {
                return new Promise((resolve, reject) => {
                    // SQL query to retrieve shows for a show name (partial match on showName, ordered by showDate)
                    pool.query("SELECT showName, showDate, showTime, defaultPrice, soldOut, showID, venueName FROM Shows WHERE showName LIKE CONCAT('%', ?, '%') AND isActive=1 ORDER BY showDate ASC",
                        [name], (error, rows) => {
                            if (error) {
                                return reject(error);
                            }
                            return resolve(rows);
                        })
                })
            }

            allShows = await ListShowsShow(event.name)
        }
        response = {
            statusCode: 200,
            shows: allShows
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