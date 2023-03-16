var express = require("express");
var router=express.Router();
var mysql = require('mysql');



router.post('/', function(req,res){
    var con = mysql.createConnection({
        host: "localhost",
        user: "api",
        password: "bKCcknwuGKWR$1",
        database: "db"
    });
    
    con.connect(function(err) {

        if(err) throw err;
        var sqlstatement = "SELECT * FROM Users"
        con.query(sqlstatement, function (err2, result) 
        {
            if (!err2)
            {
                //console.log(result)
                res.json(JSON.stringify(result))
                var fs = require('fs');
                fs.writeFile("../src/mock-data3.json", JSON.stringify(result), function(err) {
                 if (err) {
                    console.log(err);
                }
            });
            }
            con.end()
        })
        
        
    })
    
})
module.exports=router;
