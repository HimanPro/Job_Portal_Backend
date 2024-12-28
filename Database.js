const mongoose = require('mongoose')
require('dotenv').config()

const connectToDb = async ()=>{
    mongoose.connect(`mongodb+srv://${process.env.mongoDb_atlas_user_name}:${process.env.mongoDb_atlas_user_password}@jobportal.jex0s.mongodb.net/?retryWrites=true&w=majority&appName=jobportal`)
    .then(()=>console.log('Database Connected Succesfully'))
    .catch(()=>console.log('Error in Connecting Database'))
}

module.exports = connectToDb