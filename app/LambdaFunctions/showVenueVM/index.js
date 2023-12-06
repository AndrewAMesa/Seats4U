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

    let errorMessage = "auuuuuuuuuuuuuughghghgh";

    console.log(event.venueToken)

    // validates if that token already exists
    let tokenExists = (venueToken) => {
        return new Promise((resolve, reject) => {
            pool.query("SELECT * FROM Venues WHERE venueToken=?", [venueToken], (error, rows) => {
                if (error) {
                    return reject(error);
                }
                console.log(rows)
                if ((rows) && (rows.length >= 1)) {
                    return resolve(true);
                } else {
                    errorMessage = "Token does not exist"
                    console.log(errorMessage)
                    return resolve(false);
                }
            });
        });
    };

    const validToken = await tokenExists(event.venueToken);
    console.log("checking")
    
    // If the token is valid delete venue from database
    if (validToken) {
        let selectVenue = (venueToken) => {
            return new Promise((resolve, reject) => {
                  pool.query("SELECT * FROM Venues WHERE venueToken=?", [venueToken], (error, rows) => {
                      if (error) { return reject(error); }
                      if ((rows) && (rows.length >= 1)) {
                          return resolve(rows);
                      } else {
                          errorMessage = "Not deleted"
                          console.log(errorMessage)
                          return resolve(false);
                      }
                  });
            });
        }
        
          const result = await selectVenue(event.venueToken)
      
          const response = {
            statusCode: 200,
            show: result
          }
         
        
          pool.end()   // disconnect from database to avoid "too many connections" problem that can occur
        return response;
    } else {
             
         const  response = {
            statusCode: 400,
            error:JSON.stringify("venue does not exist")
          }
        pool.end()   // disconnect from database to avoid "too many connections" problem that can occur
        return response;
        
    }
}
      
