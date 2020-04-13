//import module
const mongoose = require('mongoose')

//import models
const Project = require('../models/project')
const Task = require('../models/task')

//endpoint fo fetching all tasks
exports.gettasks = (req,res,next) => {
    //find all tasks
    Task.find()
        .then(tasks => {
            if(tasks.length > 0){
                //if there are tasks return them
                res.status(200).send(tasks)
            }else{
                //if not return 404
                res.status(404).send('Not Found')
            }
        })
        .catch(error => {
            //return error
            res.status(400).send(error)
        })
}

//endpoint for fetching specific task by id
exports.gettask = (req,res,next) => {
    //find task by id
    Task.findById(req.params.id)
        .then(task => {
            if(task){
                //if tasks exist return it
                res.status(200).send(task)
            }else{
                //if not return 404
                res.status(404).send('Not Found')
            }
        })
        .catch(error => {
            //return error
            res.status(400).send(error)
        })
}


exports.createtask = (req,res,next) => {
    //add id to json
    req.body._id = new mongoose.Types.ObjectId
    //find project ask belongs to
    Project.findById(req.body.project)
        .then(project => {
            if(project){
                try{
                    //if project exists add to tasks list
                    project.tasks.push(req.body._id)
                    project.save()
                }catch(error){
                    //if error return message
                    res.status(400).send(error)
                }
                //create task
                Task.create(req.body)
                .then(task => {
                    //return task
                    res.status(201).send(task)
                })
                .catch(error => {
                    //return error
                    res.status(400).send(error)
                })    
            }else{
                //return 404
                res.status(404).send('Not Found')
            }
        })
        .catch(error => {
            //return 400
            res.status(400).send(error)
        })
}

//endpoint to update task
exports.updatetask = (req,res,next) => {
    //update task
    Task.update({_id:req.params.id},req.body)
        .then(() => {
            //return message
            res.status(200).send('Task Updated')
        })
        .catch(error => {
            //return error
            res.status(400).send(error)
        })
}

//endpoint to delete task
exports.deletetask = (req,res,next) => {
    //delete task
    Task.deleteOne({_id:req.params.id})
        .then(() => {
            //return message
            res.status(200).send('Task Deleted')
        })
        .catch(error => {
            //return error
            res.status(400).send(error)
        })
}