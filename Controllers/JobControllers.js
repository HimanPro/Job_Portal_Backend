const job = require('../Models/JobSchema')

const createJob = async (req, res) => {
    let { _id, role } = req.user
    let user_id = req.params._id
   try {
    if (role !== 'Employe') {
        return res.json({ msg: 'You are not athorized create post', success: false })
    }
    else {
        try {
            const data = await job.create({...req.body, userId:_id})
            res.json({ msg: 'job created successfull', success: true })
    
        } catch (error) {
            res.json({ msg: 'error in job creating', success: false, error: error.message })
    
        }
    
    }
   } catch (error) {
    res.json({msg:error.message, success:false})
   }
  
}
const updateJob = async (req, res) => {
    let User_id = req.params._id
    let {role} = req.user
    if(role !== 'Employe'){
        return res.json({ msg: 'You are not athorized update post', success: false })
    }else{
        try {
            let jobs = await job.findByIdAndUpdate(User_id, { $set: req.body }, { new: true })
            res.json({ msg: 'Job update Successfull', success: true, jobs })
        } catch (error) {
            res.json({ msg: error.message, success: false })
    
        }

    }
}
const deleteJob = async (req, res) => {
    let _id = req.params._id
    let {role} = req.user
    if(role==='Student'){
        return res.json({ msg: 'You are not athorized delete post', success: false })
    }
    else{
        try {
            await job.findByIdAndDelete(_id)
            res.json({ msg: 'Job deleted Successfully', success: true })
        } catch (error) {
            res.json({ msg: error.message, success: false })
        }

    }
}
const getAllJOb = async (req, res) => {
    try {
        let jobs = await job.find()
        res.json({ msg: "All job fetched successfully", success: true, jobs })
    } catch (error) {
        res.json({ msg: error.message, success: false })

    }
}
const getOwnJob = async (req, res) => {
    let {role,_id} = req.user
    if(role==='Student'){
        return res.json({ msg: 'You are not athorized update post', success: false })
    }
    try {
        let jobData = await job.find({userId:_id})
        res.json({msg:'All posted job fetch successfully', success:true, job:jobData})
    } catch (error) {
        res.json({msg:error.message, success:false})
    }

}
const searchJob = async (req, res) => {
    let {title, location} = req.query;
    let obj = {}
    if(title){
        obj.title = {$regex: title, $option:'i'}
    }
    if(location){
        obj.location = {$regex: location, $option:'i'}
    }

    let searchJob = await job.find(obj)
    res.json(searchJob)
}

module.exports = {
    createJob,
    updateJob,
    deleteJob,
    getAllJOb,
    getOwnJob
}