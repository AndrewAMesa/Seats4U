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
            // SQL query to check if the venue token exists
            pool.query("SELECT * FROM Venues WHERE venueToken=?", [token], (error, rows) => {
                if (error) {
                    return reject(error);
                }
                // If token exists, return true, else set an error message and return false
                if ((rows) && (rows.length >= 1)) {
                    return resolve(true);
                } else {
                    errorMessage = "Token does not exist";
                    return resolve(false);
                }
            });
        });
    };

    // Validates if that show exists and is not active
    let showExists = (showID) => {
        return new Promise((resolve, reject) => {
            // SQL query to check if the showID exists and is not active
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
    
    
        // Validates if that show exists and is not active
    let blockExists = (blockID) => {
        return new Promise((resolve, reject) => {
            // SQL query to check if the showID exists and is not active
            pool.query("SELECT * FROM Blocks WHERE blockID=?", [blockID], (error, rows) => {
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


    let response = undefined;

    // Check if the token is valid, the show exists, and the block does not overlap with another one
    const validToken = await tokenExists(event.venueToken);
    const showIDExists = await showExists(event.showID);
    const blockIDExists = await blockExists(event.blockID);

    // If the show does exist and the token is valid, add the block to the database
    if (showIDExists && validToken) {
        // Create a new block in the database
        let deleteBlock = (blockID) => {
            return new Promise((resolve, reject) => {
                // SQL query to delete block
                pool.query("DELETE FROM Blocks WHERE blockID =?", [blockID], (error, rows) => {
                    if (error) {
                        return reject(error);
                    }
                    // If the block is created successfully, return true, else return false
                    if ((rows) && (rows.affectedRows == 1)) {
                        return resolve(true);
                    } else {
                        return resolve(false);
                    }
                });
            });
        }
        
        let getBlockRows = (blockID) => {
            return new Promise((resolve, reject) => {
                // Retrieve rowStart and rowEnd before deleting the block
                pool.query("SELECT rowStart, rowEnd, region FROM Blocks WHERE blockID=?", [blockID], (error, rows) => {
                    if (error) 
                    {
                        return reject(error);
                    }
                    
                    if (rows && rows.length > 0) 
                    {
                        const firstRow = rows[0];
                        const rowStart = firstRow.rowStart;
                       const rowEnd = firstRow.rowEnd;
                       const region = firstRow.region;
                        
                        return resolve({ rowStart, rowEnd, region});

                    } else 
                    {
                        // Handle the case where no rows were returned
                        console.error(`No rows found for blockID ${blockID}`);
                        return reject(new Error(`No rows for blockID ${blockID}`));
                        // ... handle error situation
                    }
                  

                });
            });
        }
        
        // Update seat prices for each row in the new block
        let updateSeatPrice = (showID, region, row) => {
            return new Promise((resolve, reject) => {
                // SQL query to update seat prices
                pool.query("UPDATE Seats SET price= (SELECT defaultPrice FROM Shows WHERE showID = ?) WHERE section=? AND rowNum=? AND showID=?", [showID, region, row, showID], (error, rows) => {
                    if (error) {
                        return reject(error);
                    }
                    // If seat price is updated successfully, return true, else return false
                    if ((rows) && (rows.affectedRows >= 1)) {
                        return resolve(true);
                    } else {
                        return resolve(false);
                    }
                });
            });
        }
        
       // await getBlockRows(event.blockID);
        
        if(blockIDExists)
        {
            const{rowStart, rowEnd,region} = await getBlockRows(event.blockID);
          
            // Map region string to a numerical value
            let tempRegion = -1;
            if (region == "left") {
                tempRegion = 0;
            } else if (region == "center") {
                tempRegion = 1;
            } else {
                tempRegion = 2;
            }
          
          
            // Update seat prices for each row in the new block
            for (let i = rowStart; i < rowEnd + 1; i++) {
                await updateSeatPrice(event.showID, tempRegion, i);
            }
            
        }
        
                 
        // Create a new block in the database
        let result = await deleteBlock(event.blockID);
     
 
        if (deleteBlock) {
            response = {
                statusCode: 200,
            };
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