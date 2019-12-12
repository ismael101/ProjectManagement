const Users = require('../models').Users
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
var Sequelize = require('sequelize')

exports.login = (req,res,next) => {
    Users.findOne({where:{username:req.body.username}})
        .then(user => {
            let auth = bcrypt.compareSync(req.body.password,user.password)
            if(auth){
                const token = jwt.sign({id:user.id,team_id:user.team_id},process.env.KEY,{expiresIn:'2h'})    
                res.status(200).json({token:token})
            }
            else{
                res.status(401).json({error:'Not Authorized'})
            }
            })
        .catch(err => {
            console.log(err)
            res.status(404).json({message:'User Not Found'})
        })
}

exports.register = (req,res,next) => {
    Users.create(req.body)
        .then(res => {
            res.status(200).json({message:'User Created'})
        })
        .catch(err => {
            if (err instanceof Sequelize.ValidationError) {
                let messages = err.errors.map( (e) => e.message)
                return res.status(400).json(messages)
            }else{
                return next(err)
            }
        })
}
