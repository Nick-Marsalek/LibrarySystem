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
        console.log(req.body.body)
        var sqlstatement = "DELETE FROM Loans WHERE ID="+req.body.body
        con.query(sqlstatement, function (err2, result) 
        {
            if (!err2)
            {
                res.send("success")
            }
        })
        con.end()
        
    })
    
})
module.exports=router;
