const mongoose = require('mongoose')
const Project = require('../models/project')
const Task = require('../models/task')

exports.gettasks = (req,res,next) => {
    Task.find()
        .then(tasks => {
            if(tasks.length > 0){
                res.status(200).send(tasks)
            }else{
                res.status(404).send('Not Found')
            }
        })
        .catch(error => {
            res.status(400).send(error)
        })
}

exports.gettask = (req,res,next) => {
    Task.findById(req.params.id)
        .then(task => {
            if(task){
                res.status(200).send(task)
            }else{
                res.status(404).send('Not Found')
            }
        })
        .catch(error => {
            res.status(400).send(error)
        })
}


exports.createtask = (req,res,next) => {
    req.body._id = new mongoose.Types.ObjectId
    Project.findById(req.body.project)
        .then(project => {
            if(project){
                try{
                    project.tasks.push(req.body._id)
                    project.save()
                }catch(error){
                    res.status(400).send(error)
                }
                Task.create(req.body)
                .then(task => {
                    res.status(201).send(task)
                })
                .catch(error => {
                    console.log(error)
                    res.status(400).send(error)
                })    
            }else{
                res.status(404).send('Not Found')
            }
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