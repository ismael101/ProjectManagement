const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    _id:{
        type: Schema.Types.ObjectId,
        required:true
    },
    team:{ type: Schema.Types.ObjectId, ref: 'Team'},
    name:{
        type: Schema.Types.String,
        required:true
    },
    title:{
        type: Schema.Types.String,
        required:true
    },
    avatar:{
        type: Schema.Types.String,
        required:true
    }
},{
    timestamps:true
})

const User = new mongoose.model('User', userSchema)

module.exports = User