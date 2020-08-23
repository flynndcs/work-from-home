var mysql = require('mysql');
var connection = mysql.createConnection({
        host: 'db.ccctyzpxtafz.us-east-1.rds.amazonaws.com',
        user: 'dbadmin',
        password: 'electricboogaloo',
        port: "3306",
        database: 'ebdb'
    }
);

connection.connect(function(err) {
        if (err) throw err;
        console.log("connected to mysql");
    }
);

module.exports = connection;
