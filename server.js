const express = require('express')
const cors = require('cors')
const app = express()
const projects = require('./routes/projects')
const users = require('./routes/users')
const teams = require('./routes/teams')
const tasks = require('./routes/tasks')

//allow server to parse json 
app.use(express.json())
//allow for cross origin resources
app.use(cors())

//expose the routes here
app.use('/projects', projects)
app.use('/users', users)
app.use('/teams', teams)
app.use('/tasks', tasks)

//more error handling here
app.use((req,res,next) => {
    res.status(404).send('Not Found')
})

app.use((err,req,res) => {
    console.error(err.stack)
    res.status(500).send('Server Error')
})

//server lisiting here
let server = app.listen(process.env.PORT || 5000, () => {
    console.log(`server is running on port ${server.address().port}`)
})