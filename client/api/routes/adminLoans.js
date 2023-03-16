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
        var sqlstatement = "SELECT sub.ID, sub.UserID, sub.Name, sub.BookID, Books.Name AS BookName, sub.ReturnDate FROM (SELECT Loans.ID, Loans.UserID, Users.Name, Loans.BookID, Loans.ReturnDate From Loans INNER JOIN Users ON Loans.UserID = Users.ID)sub INNER JOIN Books ON sub.BookID = Books.ISBN;"
        //var sql2 = "SELECT Loans.ID, Loans.UserID, Users.Name, Loans.BookID"
        con.query(sqlstatement, function (err2, result) 
        {
            if (!err2)
            {
                res.json(result)
            }
        })
        con.end()
        
    })
    
})
module.exports=router;
