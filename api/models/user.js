const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    _id:{
        type: Schema.Types.ObjectId,
        required:true
    },
    username:{
        type: Schema.Types.String,
        required:true
    },
    password:{
        type: Schema.Types.ObjectId,
        required:true
    }
},{
    timestamps:true
})


const User = new mongoose.model('User', userSchema)

module.exports = User