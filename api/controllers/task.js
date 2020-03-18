const mongoose = require('mongoose')
const Task = require('../models/task')

exports.gettasks = (req,res,next) => {
    Task.find()
        .then(tasks => {
            res.status(200).send(tasks)
        })
        .catch(error => {
            res.status(400).send(error)
        })
}

exports.gettask = (req,res,next) => {
    Task.findById(req.params.id)
        .then(task => {
            res.status(200).send(task)
        })
        .catch(error => {
            res.status(400).send(error)
        })
}


exports.createtask = (req,res,next) => {
    req.body._id = new mongoose.Types.ObjectId
    Task.create(req.body)
        .then(task => {
            res.status(201).send(task)
        })
        .catch(error => {
            res.status(400).send(error)
        })
}

exports.updatetask = (req,res,next) => {
    Task.update({_id:req.params.id},req.body)
        .then(() => {
            res.status(200).send('Task Updated')
        })
        .catch(error => {
            res.status(400).send(error)
        })
}

exports.deletetask = (req,res,next) => {
    Task.deleteOne({_id:req.params.id})
        .then(() => {
            res.status(200).send('Task Deleted')
        })
        .catch(error => {
            res.status(400).send(error)
        })
}

