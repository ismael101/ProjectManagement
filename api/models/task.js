const mongoose = require('mongoose')
const Schema = mongoose.Schema

const taskSchema = new Schema({
    _id:{
        type: Schema.Types.ObjectId,
        required:true
    },
    assigned:{ type: Schema.Types.ObjectId, ref: 'User'},
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
    }
},{
    timestamps:true
})

const Task = new mongoose.model('Task', taskSchema)

module.exports = Task