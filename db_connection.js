var mysql = require('mysql');

var con = mysql.createPool({
    connectionLimit: 1000,
    host: "localhost",
    user: "root",
    password: "",
    database: "smartstore"
});




module.exports = con;