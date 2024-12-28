const mongoose = require('mongoose');
const jobSchema = new mongoose.Schema({
    title:{
        type:String,
    },
    description:{
        type:String,
    },
    company:{
        type:String
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    salary:{
        type:String
    },
    image:{
        type:String
    },
    jobRole:{
        type:String,
    },
    requirements:{
        type:Array
    },
    skills:{
        type:Array
    },
    applicants:[{
        type:mongoose.Schema.Types.ObjectId
    }],
    
    lastDate:{
        type:Date
    }

},{timestamps:true})

jobSchema.add({
    location:{
        type:String
    },
    time:{
        type:String
    },
    jobType:{
        type:String
    },
    workMode:{
        type:String
    }
})

module.exports = mongoose.model('job',jobSchema)