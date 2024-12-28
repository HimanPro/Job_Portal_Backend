const express = require('express')
const { createJob, updateJob, deleteJob, getAllJOb, getOwnJob } = require('../Controllers/JobControllers')
const Checktoken = require('../middleware/Checktocken')

const router = express.Router()

router.post('/create', Checktoken, createJob)
router.put('/update/:_id',Checktoken, updateJob)
router.delete('/delete/:_id',Checktoken, deleteJob)
router.get('/getAll', getAllJOb)
router.get('/getOwnJob', Checktoken, getOwnJob)


module.exports = router