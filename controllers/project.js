//import module
const mongoose = require('mongoose')

//import models
const Task = require('../models/task')
const Project = require('../models/project')

//endpoint for fetching all projects
exports.getprojects = (req,res,next) => {
    //find all projects and populate with task
    Project.find()
        .populate({
            path:'tasks',
        })
        .then(projects => {
            if(projects.length > 0){
                //if there are projects return them
                res.status(200).send(projects)
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

//endpoint for fetching specific project by id
exports.getproject = (req,res,next) => {
    //find project by id and populate with tasks
    Project.findById(req.params.id)
        .populate({
            path:'tasks',
        })
        .then(project => {
            if(project){
                //if project exists return it
                res.status(200).send(project)
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

//endpoint to create project
exports.createproject = (req,res,next) => {
    //add id to json
    req.body._id = new mongoose.Types.ObjectId
    //create project
    Project.create(req.body)
        .then(project => {
            //return created project
            res.status(201).send(project)
        })
        .catch(error => {
            //return error
            res.status(400).send(error)
        })
}

//endpoint to update project
exports.updateproject = (req,res,next) => {
    //update project
    Project.update({_id:req.params.id},req.body)
        .then(() => {
            //return message 
            res.status(200).send('Project Updated')
        })
        .catch(error => {
            //return error
            res.status(400).send(error)
        })
}

//endpoint to delete project
exports.deleteproject = (req,res,next) => {
    //find the project by id
    Project.findById(req.params.id)
        .then(project => {
            //if project exists
            if(project){
                //delete each task in project
                project.tasks.forEach(task => {
                    try{
                        Task.remove({_id:task._id})
                    }
                    catch(err){
                        console.log(err)
                    }
                });
                //delete projject
                Project.remove({_id:req.params.id})
                    .then(() => {
                        //return message
                        res.status(200).send('Project Deleted')
                    })
                    .catch(error => {
                        //return error
                        res.status(400).send(error)
                    })
            }else{
                //if project doesn't
                res.status(404).send('Not Found')
            }
        })
        .catch(error => {
            //return error
            res.status(400).send(error)
        })
}