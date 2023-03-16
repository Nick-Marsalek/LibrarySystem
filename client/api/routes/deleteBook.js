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
        var sqlstatement = "DELETE FROM Books WHERE ISBN="+req.body.body
        con.query(sqlstatement, function (err2, result) 
        {
            if (!err2)
            {
                //console.log(result)
                res.sendStatus(200)
            }
            con.end()
        })
        
        
    })
    
})
module.exports=router;
