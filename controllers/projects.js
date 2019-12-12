const Projects = require('../models/').Projects
const Sequelize = require('sequelize')

//created this controller to get all of the projects with the users team id
exports.getProjects = (req,res,next) => {
    Projects.findAll({where:{team_id:req.team_id}})
            .then(projects => {
                res.status(200).json(projects)
            })
            //returned a 404 not found error for not finding any projects with the users team id
            .catch(error => {
                res.status(404).json(error)
            })
}
//created this controller to get a specific project with the users team id
exports.getProject = (req,res,next) => {
    Projects.findOne({where:{team_id:req.team_id, id:req.params.id}})
            .then(project => {
                res.status(200).json(project)
            })
            //returned a 404 not found error for not finding any project with a corresponding id and team id
            .catch(error => {
                res.status(404).json(error)
            })
}

//created this controller to create a project
exports.createProject = (req,res,next) => {
    //check if the tokens team id matches the team id in the json to prevent users from creating projects not for their authorized team
    if(req.team_id == req.body.team_id){
        //if it does i create the project here
        Projects.create(req.body)
                .then(() => {
                    res.status(200).json({message:'Project Created'})
                })
                .catch(error => {
                    //if there are validation errors i catch them and send them to the user here
                    if (error instanceof Sequelize.ValidationError) {
                        let messages = error.errors.map( (e) => e.message)
                        return res.status(400).json(messages)
                    }else{
                        //if the error isn't a validation error than i pass it to the server js file 
                        return next(error)
                    }
                })
    }else{
        //if the token team id doesnt match the team id in the body than i give a 401 unaithourized error
        res.status(401).json({error:'Not Authorized'})
    }
}

//created this controller to update the project
exports.updateProject = (req,res,next) => {
    
    //checked if the task the user wants to update is theirs to prevent user from updating tasks that arent theirs
    Projects.findOne({where:{team_id:req.team_id,id:req.params.id}})
            .then(() => {
                //if it does i update it here
                Projects.update(req.body,{where:{id:req.params.id}})
                .then(() => {
                    res.status(200).json({message:'Project Updated'})
                })
                .catch(error => {
                    //if there are validation errors i catch them and send them to the user here
                    if (error instanceof Sequelize.ValidationError) {
                        let messages = error.errors.map( (e) => e.message)
                        return res.status(400).json(messages)
                    }else{
                        //if the error isn't a validation error than i pass it to the server js file
                        return next(error)
                    }
                })
            })
            //if there aren't projects with a corresponding id and team id from the token i raise a 400 bad request error
            .catch(error => {
                res.status(400).json(error)
            })
}

//created this controller to delete a project
exports.deleteProject = (req,res,next) => {
    //checked if the user project corresponds with users team id
    Projects.findOne({where:{team_id:req.team_id,id:req.params.id}})
            .then(() => {
                //if it does i destroy it here
                Tasks.destroy({where:{id:req.params.id}})
                     .then(() => {
                         res.status(200).json({message:'Task Deleted'})
                     })
                     .catch(error => {
                         //if theres an error i raise a bad request here
                         res.status(400).json(error)
                     })
            })
            //if there aren't projects with a corresponding id and team id from the token i raise a 400 bad request error
            .catch(error => {
                res.status(400).json(error)
            })
}