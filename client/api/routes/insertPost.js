var express = require('express');
var router = express.Router();

// var database = require('../searchle');
var mysql = require('mysql');


router.post('/*', function(req, res){
    console.log(req.body)
    var values = req.body.values;
    var table = req.body.table;

    // Create the query
    var query = `
    INSERT INTO ${table} ${values}
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
            console.log(res)
            res.json(JSON.parse(JSON.stringify(result)))
        });
        con.end()
    });


});

module.exports = router;