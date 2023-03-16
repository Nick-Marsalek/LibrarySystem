var mysql = require('mysql');

require('dotenv').config()
const jwt = require('jsonwebtoken')
var express = require("express");
var router=express.Router();



router.post("/",function(req,res){
    //const data = {
    //    message: "Test API is Working"
    //}
    //const jsonContent = JSON.stringify(data)
    var con = mysql.createConnection({
        host: "localhost",
        user: "api",
        password: "bKCcknwuGKWR$1",
        database: "db"
    });

    con.connect(function(err) {
        if (err) throw err;
        //console.log("Connected!");
        const map = new Map(Object.entries(JSON.parse(JSON.stringify(req.body))))
        //Adds the json file sent to a map to be accessed for the sql database
        //console.log(map.get("username"))

        if(req.body.username != "" && req.body.password != "")
        {
          var checkUsername = "SELECT * FROM Employees WHERE NAME="+"'"+map.get("username")+"'";

          try {
          con.query(checkUsername, function (err, result) {
            if (!err) 
            {
            //console.log(JSON.stringify(result));
            //https://www.pluralsight.com/guides/load-and-render-json-data-into-react-components
            if (result != "")
            {
              var checkPassword = "SELECT Password FROM Employees WHERE NAME="+"'"+req.body.username+"'";
              con.query(checkPassword, function (err2, result2)
                {
                  if (!err) 
                  {
                    const map2 = new Map(Object.entries(JSON.parse(JSON.stringify(result2))))
                    const map3 = new Map(Object.entries(JSON.parse(JSON.stringify(map2.get('0')))))
                    
                    if (req.body.password == map3.get('Password'))
                    {
                      const username = req.body.username
                      const user = { name: username }
                      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
                      console.log("Success")
                      res.json({ accessToken: accessToken, result: "success"})
                      //11 min into video
                      con.end()
                    }
                    else
                    {
                      con.end()
                      failedToAuthenticate(res)
                    }
                  }
                  else
                  {
                    con.end()
                    failedToAuthenticate(res)
                  }
                })

            }
            else
            {
              con.end()
              failedToAuthenticate(res)
            }
            

            }
            else 
            {
              con.end()
              failedToAuthenticate(res)
            }
            
          });
          }
          catch (err)
          {
            con.end()
            failedToAuthenticate(res)
          }
        }
        else
        {
          failedToAuthenticate(res)
          con.end()
        }
      });
      
    
    
})



function failedToAuthenticate(res) {
  const jsonresponse = {
    "result": "failure"
  }
  console.log("Failed to Authenticate")
  res.send(JSON.stringify(jsonresponse))
}


module.exports=router;

