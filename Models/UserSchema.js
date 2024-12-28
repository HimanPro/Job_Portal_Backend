const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        require: [true, 'name is require'],
        minLength: 3,
        maxLength: 15
    },
    email:{
        type: String,
        require: [true, 'name is require'],
        unique:true,
    },
    password:{
        type: String,
        require: [true, 'Password is require']
    },
    number:{
        type: String
    },
    role:{
        type: String,
        default: "Student",
        enum: ['Student', 'Employe']
    }
},{timestamps:true})

userSchema.add({
    bio:{
        type:String
    
    },
    profession:{
        type:String
    },
    forgotPasswordToken:{
        type:String
    }

})

module.exports = mongoose.model('user' , userSchema)