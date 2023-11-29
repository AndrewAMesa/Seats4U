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

    let errorMessage = "";

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
        let ListVenues = () => {
            return new Promise((resolve, reject) => {
                pool.query("SELECT * FROM Venues", [], (error, rows) => {
                    if (error) { return reject(error); }
                    return resolve(rows);
                })
            })
        }
        
        const allVenues = await ListVenues()
        
        const response = {
          statusCode: 200,
          venues: allVenues
        }
        
        pool.end()     // close DB connections      
      
        return response;
      }
    }
      

   