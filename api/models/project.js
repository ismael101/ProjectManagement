const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    _id:{
        type: mongoose.Schema.Types.ObjectId,
        required:true
    },
    assigned:{type: mongoose.Schema.Types.ObjectId, ref='User'},
    name:{
        type: mongoose.Schema.Types.String,
        required: true
    },
    description:{
        type: mongoose.Schema.Types.String,
        required: true
    },
    complete:{
        type: mongoose.Schema.Types.Boolean,
        default: false
    }
},{
    timestamps:true
})

const projectSchema = new mongoose.Schema({
    _id:{
        type: mongoose.Schema.Types.ObjectId,
        required:true
    },
    team:{type: mongoose.Schema.Types.ObjectId, ref='Team'},
    name:{
        type: mongoose.Schema.Types.String,
        required: true
    },
    description:{
        type: mongoose.Schema.Types.String,
        required: true
    },
    tasks:[{ type: mongoose.Schema.Types.ObjectId, ref: 'ProjectTask' }],
    complete:{
        type: mongoose.Schema.Types.Boolean,
        default: false
    }
},{
    timestamps:true,
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
})

projectSchema.virtual('progress').get(function() {
    let counter = 0
    let progress = 0
    this.tasks.forEach(element => {
        counter++
        if(element.complete){
            progress++
        }
    });
    return (progress/counter) * 100
  });

const Task = new mongoose.model('ProjectTask', taskSchema)
const Project = new mongoose.model('Project', projectSchema)


module.exports = {
    Project: Project,
    Task: Task
}