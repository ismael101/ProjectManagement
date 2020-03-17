const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const morgan = require('morgan')
const projects = require('./routes/project')
const todos = require('./routes/todo')
const teams = require('./routes/team')

const app = express()

mongoose.connect(`mongodb://projectuser:projectpass1@ds023912.mlab.com:23912/projects`,{useNewUrlParser:true, useCreateIndex:true, useUnifiedTopology:true})
        .then(() => {
            console.log('connected to db')
        })
        .catch(err  => {
            console.log(err)
        })

app.use('/uploads/images', express.static('uploads/images'));
app.use(cors())
app.use(morgan("dev"));
app.use(express.json())


app.use('/project', projects)
app.use('/team', teams)
app.use('/todo', todos)

app.use((req,res,next) => {
	res.status(404).send("Not Found")
})
app.use((err,req,res,next) => {
	console.error(err.stack)
	res.status(500).send(err.stack)
})
let server = app.listen(8000,() => {
                console.log(`Server is running on ${server.address().port}`)
            })