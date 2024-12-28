const express = require('express');
const App = express();
const port = 8090;
const userRouter = require('./Routes/UserROutes')
const jobRouter = require('./Routes/JobRoutes')
const applicantsRouter = require('./Routes/ApplicantsRoutes')
const cors = require('cors')
App.use(cors())
App.use(express.json({limit:'50mb'}))
App.set('view engine', 'ejs')

const Database = require('./Database')
Database()


App.get('/', (req,res)=>{
    res.send('Welcome to Jobportal')
})

App.use('/user', userRouter)
App.use('/job', jobRouter)
App.use('/applicants', applicantsRouter)

App.listen(port, ()=>{
    console.log(`Server is running at http://localhost:${port}`)
})