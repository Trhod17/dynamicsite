const mysql = require("mysql");

module.exports.connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "W3terh0rse",
	database: "nodelogin",
});