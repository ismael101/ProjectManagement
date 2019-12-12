const Projects = require('../models/').Projects
const Sequelize = require('sequelize')

exports.getProjects = (req,res,next) => {
    Projects.findAll({where:{team_id:req.team_id}})
            .then(projects => {
                res.status(200).json(projects)
            })
            .catch(error => {
                res.status(404).json(error)
            })
}
exports.getProject = (req,res,next) => {
    Projects.findOne({where:{team_id:req.team_id, id:req.params.id}})
            .then(project => {
                res.status(200).json(project)
            })
            .catch(error => {
                res.status(404).json(error)
            })
}

exports.createProject = (req,res,next) => {
    if(req.team_id == req.body.team_id){
        Projects.create(req.body)
                .then(() => {
                    res.status(200).json({message:'Project Created'})
                })
                .catch(error => {
                    if (error instanceof Sequelize.ValidationError) {
                        let messages = error.errors.map( (e) => e.message)
                        return res.status(400).json(messages)
                    }else{
                        return next(error)
                    }
                })
    }else{
        res.status(401).json({error:'Not Authorized'})
    }
}

exports.updateProject = (req,res,next) => {
    Projects.findOne({where:{team_id:req.team_id,id:req.params.id}})
            .then(() => {
                Projects.update(req.body,{where:{id:req.params.id}})
                .then(() => {
                    res.status(200).json({message:'Project Updated'})
                })
                .catch(error => {
                    if (error instanceof Sequelize.ValidationError) {
                        let messages = error.errors.map( (e) => e.message)
                        return res.status(400).json(messages)
                    }else{
                        return next(err)
                    }
                })
            })
            .catch(error => {
                res.status(400).json(error)
            })
}

exports.deleteProject = (req,res,next) => {
    Projects.findOne({where:{team_id:req.team_id,id:req.params.id}})
            .then(() => {
                Tasks.destroy({where:{id:req.params.id}})
                     .then(() => {
                         res.status(200).json({message:'Task Deleted'})
                     })
                     .catch(error => {
                         res.status(400).json(error)
                     })
            })
            .catch(error => {
                res.status(400).json(error)
            })
}