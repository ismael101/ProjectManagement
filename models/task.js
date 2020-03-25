const mongoose = require('mongoose')
const Schema = mongoose.Schema

const taskSchema = new Schema({
    _id:{
        type: Schema.Types.ObjectId,
        required:true
    },
    name:{
        type: Schema.Types.String,
        required: true
    },
    description:{
        type: Schema.Types.String,
        required: true
    },
    complete:{
        type: Schema.Types.Boolean,
        default: false
    },
    project:{
        type: Schema.Types.ObjectId, 
        ref: 'Project'
    },
    due:{
        type: Schema.Types.Date,
        default: Date.now()
    },
},{
    timestamps:true,
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
})

taskSchema.virtual('overdue').get(function() {
    if(this.due > Date.now()){
        return true
    }else{
        return false
    }
})

const Task = new mongoose.model('Task', taskSchema)

module.exports = Task