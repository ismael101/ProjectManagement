const mongoose = require('mongoose')
const Project = require('../models/project')
const Task = require('../models/task')

exports.getprojects = (req,res,next) => {
    Project.find()
        .populate('tasks')
        .then(projects => {
            res.status(200).send(projects)
        })
        .catch(error => {
            res.status(400).send(error)
        })
}

exports.getproject = (req,res,next) => {
    Project.findById(req.params.id)
        .populate('tasks')
        .then(project => {
            res.status(200).send(project)
        })
        .catch(error => {
            res.status(400).send(error)
        })
}

exports.createproject = (req,res,next) => {
    req.body._id = new mongoose.Types.ObjectId
    Project.create(req.body)
        .then(project => {
            res.status(201).send(project)
        })
        .catch(error => {
            res.status(400).send(error)
        })
}

exports.updateproject = (req,res,next) => {
    Project.update({_id:req.params.id},req.body)
        .then(() => {
            res.status(200).send('Project Updated')
        })
        .catch(error => {
            res.status(400).send(error)
        })
}

exports.deleteproject = (req,res,next) => {
    Project.remove({_id:req.params.id})
        .then(() => {
            res.status(200).send('Project Deleted')
        })
        .catch(error => {
            res.status(400).send(error)
        })
}

exports.gettasks = (req,res,next) => {
    Task.find()
        .populate('assigned')
        .then(tasks => {
            res.status(200).send(tasks)
        })
        .catch(error => {
            res.status(400).send(error)
        })
}

exports.gettask = (req,res,next) => {
    Task.findById(req.params.id)
        .populate('assigned')
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
            Project.findById(req.params.id)
                .then(project => {
                  project.tasks.push(task._id)
                  project.save()
                  res.status(200).send(task)  
                })
                .catch(error => {
                    res.status(400).send(error)
                })
        })
        .catch(error => {
            res.status(400).send(error)
        })
}

exports.updatetask = (req,res,next) => {
    Task.update({_id:req.params.id}, req.body)
        .then(() => {
            res.status(200).send('Task Updated')
        })
        .catch(error => {
            res.status(400).send(error)
        })
}

exports.deletetask = (req,res,next) => {
    Task.remove({_id:req.params.id})
        .then(() => {
            res.status(200).send('Task Deleted')
        })
        .catch(error => {
            res.status(400).send(error)
        })
}