require('dotenv').config()
const jwt = require('jsonwebtoken')
var express = require("express");
var router=express.Router();
var name = ''
var mysql = require('mysql');


const posts = [
    {
        username: 'Test',
        id: 0
    }
]

router.get("/", authenticateToken, (req, res) =>
{
    res.json(posts.filter(post => post.username === req.user.name))
    
    //sql code here
    // Create the query
    var query = `
    SELECT * FROM Users WHERE Name = ${req.user.name}
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
            console.log("Query results:")
            console.log(res)
            const response = {
                username: result.Name,
                id: result.ID
            }
            res.json(response)
            //res.json(JSON.parse(JSON.stringify(result)))
        });
        con.end()
    });

    
    res.json(response)
})


function authenticateToken(req, res, next)
{
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => 
    {
        if (err) return res.statusCode(403)
        req.user = user
        name = req.user
        console.log(req.user)
        next()
    })
}

module.exports=router;
