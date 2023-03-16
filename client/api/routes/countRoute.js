var express = require('express');
var router = express.Router();

// var database = require('../searchle');
var mysql = require('mysql');


router.post('/*', function(req, res){
    console.log(req.body)
    var isbn = req.body.isbn;

    // Create the query
    var query = `
    SELECT COUNT(*) AS CheckedOut FROM Loans
    WHERE BookID=${isbn};
    `;

    // Create the database connection
    var con = mysql.createConnection({
        host: "localhost",
        user: "api",
        password: "bKCcknwuGKWR$1",
        database: "db"
    });

    con.connect(function(err) {
        if (err) throw err;

        // Query the database
        con.query(query, function(err, result) {
            if (err) throw err;

            res.json(JSON.parse(JSON.stringify(result)))
        });
        con.end()
    });


});

module.exports = router;