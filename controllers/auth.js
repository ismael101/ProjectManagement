const mongoose = require('mongoose')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

exports.create = (req,res,next) => {
    User.find()
        .then(users => {
            if(users.length > 0){
                res.status(401).send('User Exists')
            }
            else{
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if(err){
                        return res.status(500).send(err.stack)
                    }
                    else{
                        const user = new User({
                            _id: new mongoose.Types.ObjectId,
                            username: req.body.username,
                            password: hash
                        })
                        user.save()
                            .then(user => {
                                res.status(201).send(user)
                            })
                            .catch(error => {
                                console.log(error)
                                res.status(400).send(error)
                            })
                    }
                })
            }
        })
        .catch(error => {
            res.status(400).send(error)
        })
}


exports.token = (req,res,next) => {
    User.find({username: req.body.username})
    .then(user => {
        bcrypt.compare(req.body.password,user[0].password)
        .then(result => {
            if(result){
                const token = jwt.sign({id: user[0]._id},process.env.KEY,{expiresIn:'1d'})
                res.status(200).send(token)
            }
            else{
                res.status(500).json({
                    message:'Auth Failed'
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                error:err
            })
        })
    })  
    .catch(err => {
        res.status(500).json({
            error:err
        })
    })
}