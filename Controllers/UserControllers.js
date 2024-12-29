const users = require('../Models/UserSchema')
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const jwt = require('jsonwebtoken');
const randomstring = require("randomstring");
const nodemailer = require("nodemailer");
require('dotenv').config()


const registerUser = async (req, res) => {
    let { name, email, password, role } = req.body
   
    if(!name){
        return res.json({msg:'Name is required', success:false})
    }
   
    if(!password){
        return res.json({msg:'Password is required', success:false})
    }
   
    const checkUser = await users.findOne({email})

    if(checkUser){
        return res.json({msg:'This email already use in another acount', success:false})
    }
    else{
        try {
            let hashPassword = bcrypt.hashSync(password, salt);
            let user = await users.create({
                name,
                email,
                password:hashPassword,
                role
            })
            res.json({
                msg: 'user created Succesfully',
                success: true,
                user
            })
        } catch (error) {
            res.json({
                msg: 'error in creating user',
                success: false,
                error: error.message
            })
        }
    }
}
const loginUser = async (req, res) => {
    let {email , password} = req.body

   try {
    const findUser = await users.findOne({email})

    if(!findUser){
        return res.json({msg:"User not exist first create account", success:false})
    }
    else{
        let checkPassword = bcrypt.compareSync(password, findUser.password); 
        if(!checkPassword){
            return res.json({msg:'wrong Password', success:false})
        }
        else{
            const token = jwt.sign({_id:findUser._id, role:findUser.role}, process.env.JWT_Secret)
            return res.json({
                msg:"Login Successfull",
                success:true,
                token,
                role:findUser.role,
                _id:findUser._id
            })
        }
    }
   } catch (error) {
    return res.json({
        msg:"Login Unsuccessfull",
        success:false,
       error:error.message
    })
   }
}
const updateUser = async (req, res) => {
    let {name, password, bio, prefession} = req.body
    let _id = req.params._id
    let user_id = req.user._id
    if(user_id === _id){
        try {
            if(password){
                var hashPassword = bcrypt.hashSync(password, salt);
            }
            let findUser = await users.findByIdAndUpdate(_id, {$set:{name, password:hashPassword, bio, prefession}}, {new:true})
            res.json({msg:'Data update successfull', success:true, findUser})
        } catch (error) {
            res.json({msg:'erorr in updating data', success:false, error:error.message})
        }
    }
    else{
        res.json({msg:'Unauthorized Access', success:false})
    }
   
}
const deleteUser = async (req, res) => {
    let _id = req.params._id
    let user_id = req.user._id
    if(user_id === _id){
        try {
            let data = await users.findByIdAndDelete(_id)
            res.json({msg:'user delete successfull', success:true})
        } catch (error) {
            res.json({msg:'error in delete user', success:false, error:error.message})
            
        }
    }
    else{
        res.json({msg:'Unauthorized Access', success:false})
    }
   
}

const forgetPassword = async (req, res) => {
let {email} = req.body
if(!email){
    return res.json({msg:'email is require', success:false})
}
else{
    try {
        let userData = await users.findOne({email})
        if(!userData){
            return res.json({msg:'user not found or invalid user', success:false})
        }
        else{
          let token = randomstring.generate(30) 
          userData.forgotPasswordToken = token
          userData.save()
        await sendmail(email, token)

          res.json({msg:'check your email', success:true})
        }
        
    } 
    catch (error) {
        return res.json({msg: error.message, success:false})
    }
}

}

const sendmail = async (email , token) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for port 465, false for other ports
        auth: {
          user: process.env.JWT_NodemailerEmail,
          pass: process.env.JWT_Password
        },
      });

      async function main() {
        const info = await transporter.sendMail({
          from: 'jobFusionXg@gmail.com', // sender address
          to: email, // list of receivers
          subject: "Forget Password Request", // Subject line
          text: `please click below link \n https://job-portal-backend-1-wd2i.onrender.com/user/forgotPassword/${token}`, // plain text body
        });
      
        console.log("Message sent: %s", info.messageId);
        // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
      }
      
      main().catch(console.error);
}

const varifyPassword = async (req, res)=>{
    let {token} = req.params
    let user = await users.findOne({forgotPasswordToken:token})
     if(!user){
        return res.json({msg:'Invailid token', success:false})
     }else{

         res.render('ForgetPassword', {token})
     }

}

const resetPassword =async (req,res)=>{
 let {token} = req.params
let newPasswordd = req.body.NewPassword
let hashPassword = bcrypt.hashSync(newPasswordd, salt)
let user = await users.findOne({forgotPasswordToken:token})
user.password = hashPassword
await user.save()
res.json({msg:'Password change', success:true})
}

module.exports = {
    registerUser,
    loginUser,
    updateUser,
    deleteUser,
    forgetPassword,
    varifyPassword,
    resetPassword
}
