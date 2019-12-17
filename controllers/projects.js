const Projects = require('../models/').Projects
const Sequelize = require('sequelize')

//created this controller to get all of the projects with the users team id
exports.getProjects = (req,res,next) => {
    Projects.findAll({where:{team:req.team}})
            .then(projects => {
                if(projects){
                    res.status(200).send(projects)
                }else{
                    res.status(404).send('No Projects Found')
                }
            })
            //returned a 404 not found error for not finding any projects with the users team id
            .catch(err => {
                next(err)
            })
}
//created this controller to get a specific project with the users team id
exports.getProject = (req,res,next) => {
    Projects.findOne({where:{team:req.team, id:req.params.id}})
            .then(project => {
                if(project){
                    res.status(200).send(project)
                }else{
                    res.status(404).send('No Project Found')
                }
            })
            //returned a 404 not found error for not finding any project with a corresponding id and team id
            .catch(err => {
                next(err)
            })
}

//created this controller to create a project
exports.createProject = (req,res,next) => {
    //check if the tokens team id matches the team id in the json to prevent users from creating projects not for their authorized team
    if(req.team == req.body.team || req.body.team == null){
        //if it does i create the project here
        Projects.create(req.body)
                .then(() => {
                    res.status(200).send('Project Created')
                })
                .catch(err => {
                    //if there are validation errors i catch them and send them to the user here
                    if (err instanceof Sequelize.ValidationError) {
                        let messages = err.errors.map( (e) => e.message)
                        return res.status(400).send(messages)
                    }else{
                        //if the error isn't a validation error than i pass it to the server js file 
                        return next(err)
                    }
                })
    }else{
        //if the token team id doesnt match the team id in the body than i give a 401 unaithourized error
        res.status(401).send('Cannot Create Project For Different Team')
    }
}

//created this controller to update the project
exports.updateProject = (req,res,next) => {
    //checked if the task the user wants to update is theirs to prevent user from updating tasks that arent theirs 
    if(req.team == req.body.team || req.body.team == null){
        Projects.update(req.body,{where:{id:req.params.id,team:req.team}})
            .then((rm) => {
                if(!rm[0]){
                    res.status(404).send('Project Not Updated')
                }else{
                    res.status(200).send('Project Updated')
                }
            })
            .catch(err => {
                if (err instanceof Sequelize.ValidationError) {
                    let messages = err.errors.map( (e) => e.message)
                    return res.status(400).send(messages)
                }else if(err instanceof Sequelize.ForeignKeyConstraintError){
                    let messages = err.errors.map( (e) => e.message)
                    return res.status(400).send(messages) 
                }
                else{
                    //if the error isn't a validation error than i pass it to the server js file
                    next(err)
                }
            })
    }else{
        res.status(401).send('Cannot Change Team of Project')
    }
    
}
//created this controller to delete a project
exports.deleteProject = (req,res,next) => {
    //checked if the user project corresponds with users team id
        Projects.destroy({where:{id:req.params.id,team:req.team}})
            .then(() => {
                res.status(200).send('Project Deleted')
            })
            .catch(err => {
                next(err)
            })
        }