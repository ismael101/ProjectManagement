const jwt = require('jsonwebtoken')
const Teams = require('../models/').Teams
//i created this middleware to authenticate the json web token
module.exports = (req,res,next) => {
    try{
        //get the token from the header
        const token = req.headers.authorization.split(" ")[1]
        //decode the token
        const decoded = jwt.verify(token, process.env.KEY)
        //set the team id and user id here
        req.team = decoded.team
        req.id = decoded.id
        //allow the request to pass
        next()
    }
    catch(err){
        //raise error if their isn't any token or the token is expired on modified
        res.status(401).json({
            message:'Auth Failed'
        })
    }
}