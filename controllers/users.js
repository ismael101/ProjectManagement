const Users = require('../models').Users
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
var Sequelize = require('sequelize')

//created this controller to allow users login
exports.login = (req,res,next) => {
    //see if the user exists
    Users.findOne({where:{username:req.body.username}})
        .then(user => {
            //if the user exists compare to the hashed password in the database
            let auth = bcrypt.compareSync(req.body.password,user.password)
            if(auth){
                //if the password is correct return a json web token
                const token = jwt.sign({id:user.id,teamid:user.teamid},process.env.KEY,{expiresIn:'2h'})    
                res.status(200).json({token:token})
            }
            else{
                // if the password isnt correct raise a 401 unauthorized error
                res.status(401).json({error:'Not Authorized'})
            }
            })
        //if the user doesnt exist raise a 404 error
        .catch(err => {
            console.log(err)
            res.status(404).json({message:'User Not Found'})
        })
}

//created this controller to register new users
exports.register = (req,res,next) => {
    Users.create(req.body)
        .then(() => {
            res.status(200).json({message:'User Created'})   
        })
        .catch(error => {
            console.log(error)
            if (error instanceof Sequelize.ValidationError) {
                let messages = error.errors.map( (e) => e.message)
                return res.status(400).json(messages)
            }else if(error instanceof Sequelize.UniqueConstraintError){
                let messages = error.errors.map((e) => e.message)
                return res.status(400).json(messages)
            }
            else{
                //if the error isn't a validation error than i pass it to the server js file
                return next(error)
            }
        })
    
}


//created this controller to fetch team members
exports.getMembers = (req,res,next) => {
    //find all the users with the tokens team id and return only their i and name
    Users.findAll({where:{teamid:req.teamid},attributes: ['id', 'username', 'role','profilepic']})
    .then(users => {
        //return the users
       res.status(200).json(users)
    })
    //if there are no users with that team id
    .catch(error => {
        console.log(error)
       res.status(404).json({error:'No Members Found'})
    })
}

//created this controller to delete users
exports.deleteUser = (req,res,next) => {
    Users.destroy({where:{id:req.userid}})
        .then(() => {
            res.status(200).json({message:'User Deleted'})
        })
        .catch(error => {
            res.status(400).json({error:error})
        })
}