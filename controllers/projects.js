const Projects = require('../models/').Projects
const Sequelize = require('sequelize')

exports.getProjects = (req,res,next) => {
    Projects.findAll({where:{team_id:req.team_id}})
            .then(projects => {
                res.status(200).json(projects)
            })
            .catch(error => {
                res.status(401).json(error)
            })
}
exports.getProject = (req,res,next) => {
    Projects.findOne({where:{team_id:req.team_id, id:req.params.id}})
            .then(project => {
                res.status(200).json(project)
            })
            .catch(error => {
                console.log(error)
                res.status(200).json(error)
            })
}

exports.createProject = (req,res,next) => {
    if(req.team_id == req.body.team_id){
        Projects.create(req.body)
                .then(() => {
                    res.status(200).json({message:'Project Created'})
                })
                .catch(err => {
                    if (err instanceof Sequelize.ValidationError) {
                        let messages = err.errors.map( (e) => e.message)
                        return res.status(400).json(messages)
                    }else{
                        return next(err)
                    }
                })
    }else{
        res.status(401).json({error:'Not Authorized'})
    }
}

exports.updateProject = (req,res,next) => {
    if(req.team_id == req.body.team_id){
        Projects.update(req.body,{where:{id:req.params.id}})
                .then(() => {
                    res.status(200).json({message:'Project Updated'})
                })
                .catch(err => {
                    if (err instanceof Sequelize.ValidationError) {
                        let messages = err.errors.map( (e) => e.message)
                        return res.status(400).json(messages)
                    }else{
                        return next(err)
                    }
                })
    }else{
        res.status(401).json({error:'Not Authorized'})
    }
}

exports.deleteProject = (req,res,next) => {
    Projects.findOne({where:{id:req.params.id}})
            .then(project => {
                if(project.team_id == req.team_id){
                    Projects.destroy({where:{id:req.params.id}})
                            .then(() => {
                                res.status(200).json({message:'Project Deleted'})
                            })
                }
                else{
                    res.status(401).json({message:'Not Authorized'})
                }
            })
            .catch(error => {
                res.status(404).json(error)
            })
}