const express = require('express')
const { applyJob, getAllJob, getSingleJob } = require('../Controllers/ApplicantsController')
const Checktoken = require('../middleware/Checktocken')

const router = express.Router()

router.post('/apply', Checktoken, applyJob)
router.get('/getall', getAllJob)
router.get('/getjob/:_id', getSingleJob)


module.exports = router