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

    console.log(event.name);

    let alreadyExists = undefined;

   
    // Validates if that venue name already exists
    let showNameExists = (showID) => {
        return new Promise((resolve, reject) => {
            // SQL query to check if the venue name exists (partial match)
            pool.query("SELECT * FROM Shows WHERE showID=?", [showID], (error, rows) => {
                if (error) {
                    return reject(error);
                }
                console.log(rows);
                if ((rows) && (rows.length >= 1)) {
                    return resolve(true);
                } else {
                    errorMessage = "Show does not exist";
                    return resolve(false);
                }
            });
        });
    };
    alreadyExists = await showNameExists(event.showID);
    

    let response = undefined;
    console.log("checking");
    let allSeats = undefined;
    
    let queryString = undefined
    if (event.type == "section"){
        queryString = "SELECT rowNum, colNum, isSelected, price, section FROM Seats WHERE showID=? AND isAvailable=1 ORDER BY section, rowNum, colNum ASC"
    } else if (event.type == "price"){
        queryString = "SELECT rowNum, colNum, isSelected, price, section FROM Seats WHERE showID=? AND isAvailable=1 ORDER BY price, rowNum, colNum ASC"
    } else {
        queryString = "SELECT rowNum, colNum, isSelected, price, section FROM Seats WHERE showID=? AND isAvailable=1 ORDER BY rowNum, colNum ASC"
    }
    if (alreadyExists) {
        
        let listAvailableSeats = (showID) => {
            return new Promise((resolve, reject) => {
                pool.query(queryString,
                    [showID], (error, rows) => {
                        if (error) {
                            return reject(error);
                        }
                        return resolve(rows);
                    })
            })
        }

        allSeats = await listAvailableSeats(event.showID)
        
        response = {
            statusCode: 200,
            shows: allSeats
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