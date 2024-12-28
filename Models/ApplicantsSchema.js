const mongoose = require('mongoose')

let ApplicantsSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:[true, 'name is required']
    },
    email:{
        type:String,
        required:[true, 'email is required']
    },
    phone:{
        type:String
    },
    address:{
        type:String
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    job:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'job'
    },
    comments:{
        type:String
    }
},{timestamps:true})

module.exports = mongoose.model('applicants', ApplicantsSchema)