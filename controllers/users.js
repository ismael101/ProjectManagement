const Users = require('../models').Users
const Teams = require('../models').Teams
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
var Sequelize = require('sequelize')

//created this controller to allow users login
exports.login = (req,res,next) => {
    //see if the user exists
    Users.findOne({where:{username:req.body.username}})
        .then(user => {
            //if the user exists compare to the hashed password in the database
            if(user){
                let auth = bcrypt.compareSync(req.body.password,user.password)
            if(auth){
                //if the password is correct return a json web token
                const token = jwt.sign({id:user.id,team:user.team},process.env.KEY,{expiresIn:'2h'})    
                res.status(200).json({token:token})
            }
            else{
                // if the password isnt correct raise a 401 unauthorized error
                res.status(401).send('Not Authorized')
            }
            }else{
                res.status(404).send('User Not Found')
            }
        })
        //if the user doesnt exist raise a 404 error
        .catch(err => {
            next(err)
        })
}
//created this controller to register new users
exports.register = (req,res,next) => {
            let body = {
                username:req.body.username,
                password:req.body.password,
                role:req.body.role,
                team:req.body.team,
                pic:`http://localhost:5000/${req.file.path}`
            }
            Users.create(body)
                .then(() => {
                    res.status(200).json({message:'User Created'})   
                })
                .catch(err => {
                    if (err instanceof Sequelize.ValidationError) {
                        let messages = err.errors.map( (e) => e.message)
                        return res.status(400).send(messages)
                    }else if(err instanceof Sequelize.UniqueConstraintError){
                        let messages = err.errors.map((e) => e.message)
                        return res.status(400).send(messages)
                    }else if(err instanceof Sequelize.ForeignKeyConstraintError){
                        return res.status(400).send(err.message)
                    }
                    else{
                        //if the error isn't a validation error than i pass it to the server js file
                        return next(err)
                    }
                })
}


//created this controller to fetch team members
exports.getMembers = (req,res,next) => {
    //find all the users with the tokens team id and return only their i and name
    Users.findAll({where:{team:req.team},attributes: ['id', 'username', 'role','pic']})
    .then(users => {
        //return the users
        res.status(200).send(users)
    })
    //if there are no users with that team id
    .catch(err => {
        next(err)
    })
}

//created this controller to delete users
exports.deleteUser = (req,res,next) => {
    Users.destroy({where:{id:req.userid}})
        .then(() => {
            res.status(200).send('User Deleted')
        })
        .catch(err => {
            next(err)
        })
}