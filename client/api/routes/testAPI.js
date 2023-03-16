var mysql = require('mysql');


const { response } = require("express");
var express = require("express");
var router=express.Router();

var con = mysql.createConnection({
    host: "localhost",
    user: "api",
    password: "bKCcknwuGKWR$1",
    database: "db"
  });

router.post("/",function(req,res,next){
    //const data = {
    //    message: "Test API is Working"
    //}
    //const jsonContent = JSON.stringify(data)
    const data2 = {username, password} = req.body

    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        var sql = "SELECT * FROM Users WHERE ID=1";
        con.query(sql, function (err, result) {
          if (err) throw err;
          //console.log(JSON.stringify(result));
          //https://www.pluralsight.com/guides/load-and-render-json-data-into-react-components
          const data = JSON.stringify(result)
          res.send(JSON.stringify(data));
        });
      });
    
})



module.exports=router;
