var express = require('express');
var router = express.Router();

// var database = require('../searchle');
var mysql = require('mysql');


/* GET home page. */
// router.get('/', function(req, res, next) {
//     alert("Oh no! Wrong thing")
//     res.render('index', { title: 'AutoComplete Search in Node.js with MySQL' });
// });

router.post('/*', function(req, res){
    console.log(req.body)
    var search_query = req.body.search;
    var filter = req.body.filter;

    // Create the query
    var query = `
    SELECT * FROM Books 
    WHERE ${filter} LIKE '%${search_query}%' 
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

        // Make a map!
        // What's a map do? I don't know. I'll figure that out later
        //console.log(req.body)
        const map = new Map(Object.entries(JSON.parse(JSON.stringify(req.body))))
        //console.log(map)

        con.query(query, function(err, result) {
            if (err) throw err;
            // const resultMap = new Map(Object.entries(JSON.parse(JSON.stringify(result))))
            // const resultierMap = new Map(Object.entries(JSON.parse(JSON.stringify(resultMap))))
            // console.log(query)
            // console.log(resultMap)
            // console.log(resultierMap)
            res.json(JSON.parse(JSON.stringify(result)))
        });
        con.end()
    });

    // res.send(req.body)

});


function sendResponse(result, jsondata) {
    const map = new Map(Object.entries(JSON.parse(JSON.stringify(jsondata))))
    const data = JSON.stringify(result)
    //console.log(result)
    //fix this
    const map2 = new Map(Object.entries(JSON.parse(data)))
    const map3 = new Map(Object.entries(JSON.parse(JSON.stringify(map2.get("0")))))
    if(map.get("password") == map3.get("Password"))
    {
      const success = {
        "result": "success"
      }
      return (JSON.stringify(success));
    }
    else
     {
      const failure = {
        "result": "failure"
      }    
      return (JSON.stringify(failure))
    }
    //console.log(map.get("password"))
          
  }

module.exports = router;