const mongoose = require('mongoose')
const Team = require('../models/team')
const User = require('../models/user')

exports.getteams = (req,res,next) => {
    Team.find()
        .populate('members')
        .then(teams => {
            res.status(200).send(teams)
        })
        .catch(error => {
            res.status(400).send(error)
        })
}

exports.getteam = (req,res,next) => {
    Team.findById(req.params.id)
        .populate('members')
        .then(team => {
            res.status(200).send(team)
        })
        .catch(error => {
            res.status(400).send(error)
        })
}

exports.createteam = (req,res,next) => {
    req.body._id = new mongoose.Types.ObjectId
    Team.create(req.body)
        .then(team => {
            res.status(200).send(team)
        })
        .catch(error => {
            res.status(400).send(error)
        })
}

exports.updateteam = (req,res,next) => {
    Team.update({_id:req.params.id},req.body)
        .then(() => {
            res.status(200).send('Team Updated')
        })
        .catch(error => {
            res.status(400).send(error)
        })
}

exports.deleteteam = (req,res,next) => {
    Team.remove({_id:req.params.id})
        .then(() => {
            res.status(200).send('Team Deleted')
        })
        .catch(error => {
            res.status(400).send(error)
        })
}

exports.getusers = (req,res,next) => {
    User.find()
        .populate('team')
        .then(users => {
            res.status(200).send(users)
        })
        .catch(error => {
            res.status(400).send(error)
        })
}

exports.getuser = (req,res,next) => {
    User.findById(req.params.id)
        .populate('team')
        .then(user => {
            res.status(200).send(user)
        })
        .catch(error => {
            res.status(400).send(error)
        })
}

exports.createuser = (req,res,next) => {
    req.body._id = new mongoose.Types.ObjectId
    req.body.team = req.params.id
    req.body.avatar = req.file.path
    User.create(req.body)
        .then(user => {
            Team.findById(req.params.id)
                .then(team => {
                    team.members.push(user._id)
                    team.save()
                    res.status(200).send(user)
                })
                .catch(error => {
                    res.status(400).send(error)
                })   
        })
        .catch(error => {
            res.status(400).send(error)
        })    
}

exports.updateuser = (req,res,next) => {
    User.update({_id:req.params.id},req.body)
        .then(() => {
            res.status(200).send('User Updated')
        })
        .catch(error => {
            res.status(400).send(error)
        })
}

exports.deleteuser = (req,res,next) => {
    User.remove({_id:req.params.id})
        .then(() => {
            res.status(200).send('User Deleted')
        })
        .catch(error => {
            res.status(400).send(error)
        })
}