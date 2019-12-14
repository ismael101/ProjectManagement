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
                const token = jwt.sign({id:user.id,team_id:user.team_id},process.env.KEY,{expiresIn:'2h'})    
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
    //create the user here
    let body = {
        username:req.body.username,
        password:req.body.password,
        role:req.body.role,
        profilepic:`http://localhost:5000${req.file.path}`
    }
    Users.create(body)
        .then(() => {
            res.status(200).json({message:'User Created'})
        })
        .catch(err => {
            //if there is a validation error it is raised here
            if (err instanceof Sequelize.ValidationError) {
                let messages = err.errors.map( (e) => e.message)
                return res.status(400).json(messages)
            }else{
                //if it isnt a validation error pass the error to server file
                return next(err)
            }
        })
}

exports.updateUser = (req,res,next) => {
    Users.update(req.body,{where:{id:req.user_id}})
         .then(() => {
            res.status(200).json({message:'User Updated'})
         })
         .catch(error => {
            if (error instanceof Sequelize.ValidationError) {
                let messages = error.errors.map( (e) => e.message)
                return res.status(400).json(messages)
            }else{
                //if the error isn't a validation error than i pass it to the server js file
                return next(error)
            }
         })
}


//created this controller to fetch team members
exports.getMembers = (req,res,next) => {
    //find all the users with the tokens team id and return only their i and name
    Users.findAll({where:{team_id:req.team_id},attributes: ['id', 'username', 'role','profilepic']})
    .then(users => {
        //return the users
       res.status(200).json(users)
    })
    //if there are no users with that team id
    .catch(error => {
       res.status(404).json(error)
    })
}
