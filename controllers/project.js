const mongoose = require('mongoose')
const Task = require('../models/task')
const Project = require('../models/project')

exports.getprojects = (req,res,next) => {
    Project.find()
        .populate({
            path:'tasks',
        })
        .then(projects => {
            if(projects.length > 0){
                res.status(200).send(projects)
            }else{
                res.status(404).send('Not Found')
            }
        })
        .catch(error => {
            res.status(400).send(error)
        })
}

exports.getproject = (req,res,next) => {
    Project.findById(req.params.id)
        .populate({
            path:'tasks',
        })
        .then(project => {
            if(project){
                res.status(200).send(project)
            }else{
                res.status(404).send('Not Found')
            }
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
            console.log(error)
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
    Project.findById(req.params.id)
        .then(project => {
            if(project){
                project.tasks.forEach(task => {
                    try{
                        Task.remove({_id:task._id})
                    }
                    catch(err){
                        console.log(err)
                    }
                });
                Project.remove({_id:req.params.id})
                    .then(() => {
                        res.status(200).send('Project Deleted')
                    })
                    .catch(error => {
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