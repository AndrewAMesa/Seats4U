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
  
    // validates if that token already exists
    let tokenExists = (token) => {
        return new Promise((resolve, reject) => {
            pool.query("SELECT * FROM Venues WHERE venueToken=?", [token], (error, rows) => {
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

    const validToken = await tokenExists(event.token);
    console.log("checking")
    
    // If the token is valid delete venue from database
    if (validToken) 
    {
        let listShowsVM = (token) => 
        {
            return new Promise((resolve, reject) => 
            {
                pool.query("SELECT Shows.* FROM Shows JOIN Venues ON Shows.venueName = Venues.venueName WHERE venueToken=?", [token], (error, rows) => 
                {
                    if (error) { return reject(error); }
                    return resolve(rows);
                })
            })
        }
        
        const allVenues = await listShowsVM(event.token)
        
        const response = {
            statusCode: 200,
            venues: allVenues
        }
         pool.end()
         return response;
         
    } else 
    {
        const response = {
            statusCode: 400,
            error: JSON.stringify( "YOU HAVE TRIED TO GO WHERE ONLY THE HOLY ONE CAN. SHAME.")
        }
         pool.end() 
         return response;
              
        
    }
    // close DB connections  

}