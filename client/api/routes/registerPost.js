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
    var checkUser = "SELECT Name FROM Users WHERE Name="+"'"+req.body.username+"'"
    con.connect(function(err) {
        if(err) throw err;
        con.query(checkUser, function (err2, result) 
        {
            if(!err2)
            {
                if(result == "")
                {
                    //console.log("Name available")
                    var insertQuerery = "INSERT INTO Users VALUES (0, '"+req.body.username+"', '"+req.body.password+"')"
                    con.query(insertQuerery, function (err3, result2)
                    {
                        if(!err3)
                        console.log("Successfully Registered")
                    })
                    con.end()
                    res.send("Success")
                }
                else
                {   
                    //console.log("Name taken")
                    con.end()
                    res.send("Fail")
                }
            }
            
        })
        
    })
})
module.exports=router;
