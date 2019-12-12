const jwt = require('jsonwebtoken')
module.exports = (req,res,next) => {
    try{
        const token = req.headers.authorization.split(" ")[1]
        const decoded = jwt.verify(token, process.env.KEY)
        req.team_id = decoded.team_id
        next()
    }
    catch(err){
        res.status(401).json({
            message:'Auth Failed'
        })
    }
}