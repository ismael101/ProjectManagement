const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const morgan = require('morgan')
const projects = require('./routes/project')
const tasks = require('./routes/task')
const app = express()

mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ds023912.mlab.com:23912/projects`,{useNewUrlParser:true, useCreateIndex:true, useUnifiedTopology:true})
        .then(() => {
            console.log('connected to db')
        })
        .catch(err  => {
            console.log(err)
        })

app.use(cors())
app.use(morgan("dev"));
app.use(express.json())

app.use('/projects', projects)
app.use('/tasks', tasks)

app.use((req,res,next) => {
	res.status(404).send("Not Found")
})
app.use((err,req,res,next) => {
	console.error(err.stack)
	res.status(500).send(err.stack)
})
let server = app.listen(process.env.SERVER_PORT || 8000,() => {
                console.log(`Server is running on ${server.address().port}`)
            })