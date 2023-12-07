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

    console.log(event.adminToken)

    // validates if that token already exists
    let tokenExists = (token) => {
        return new Promise((resolve, reject) => {
            pool.query("SELECT * FROM Admins WHERE adminToken=?", [token], (error, rows) => {
                if (error) {
                    return reject(error);
                }
                console.log(rows)
                if ((rows) && (rows.length >= 1)) {
                    return resolve(true);
                } else {
                    errorMessage = "Token does not exist"
                    return resolve(false);
                    
                 
                }
            });
        });
    };

    const validToken = await tokenExists(event.adminToken);
    console.log("checking")
    
    // If the token is valid delete venue from database
    if (validToken) {
        let DeleteShow = (showID) => {
            return new Promise((resolve, reject) => {
                  pool.query("DELETE FROM Shows WHERE showID =?", [showID], (error, rows) => {
                      if (error) { return reject(error); }
                      if ((rows) && (rows.affectedRows == 1)) {
                          return resolve(true);
                      } else {
                          errorMessage = "Not deleted"
                           console.log(errorMessage)
                           console.log(showID)
                          return resolve(false);
                      }
                  });
            });
        }
   
        
          const result = await DeleteShow(event.showID)
      
          const response = {
            statusCode: 200,
            
            body: JSON.stringify(result)
          }
         
        
          pool.end()   // disconnect from database to avoid "too many connections" problem that can occur
        return response;
    } else {
             
         const  response = {
            statusCode: 400,
            error:JSON.stringify("grinding and gnashing of teeth: bunjil is angry")
          }
        pool.end()   // disconnect from database to avoid "too many connections" problem that can occur
        return response;
        
    }
}