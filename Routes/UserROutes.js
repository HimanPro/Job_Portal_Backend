const express = require('express')
const { registerUser, loginUser, updateUser, deleteUser, forgetPassword, varifyPassword, resetPassword } = require('../Controllers/UserControllers')
const Checktoken = require('../middleware/Checktocken')

const router = express.Router()

router.post('/create', registerUser)
router.post('/login', loginUser)
router.put('/update/:_id',Checktoken, updateUser)
router.delete('/delete/:_id',Checktoken, deleteUser)
router.post('/forgotPassword',forgetPassword)
router.get('/forgotPassword/:token',varifyPassword)
router.post('/resetPassword/:token',resetPassword)

module.exports = router