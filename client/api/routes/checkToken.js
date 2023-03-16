require('dotenv').config()
const jwt = require('jsonwebtoken')
var express = require("express");
var router=express.Router();
var name = ''

const posts = [
    {
        username: 'Test',
        title: 'Post 1'
    }
]

router.get("/", authenticateToken, (req, res) =>
{
    //res.json(posts.filter(post => post.username === req.user.name))
    const response = {
        username: req.user,
        title: 'Post Returned'
    }
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
