const applicant = require('../Models/ApplicantsSchema');
const jobs = require('../Models/JobSchema')


const applyJob = async(req, res)=>{
    let {_id} = req.user
   try {
    let data = await (await (await applicant.create({...req.body, user:_id})).populate('job')).populate('user')
    
    
   let findJob = await jobs.findById(req.body.job)
   findJob.applicants.push(_id)
   findJob.save()
    
    res.json({msg:'Successfull applied', success:true, data}) 
} catch (error) {
       res.json({msg:error.message, success:false}) 
    
   }
}

const getAllJob = async(req, res)=>{
    res.send('getAllJob Running')
}
const getSingleJob = async(req, res)=>{
    res.send('getSingleJob Running')
}

module.exports = {
    applyJob,
    getAllJob,
    getSingleJob
}