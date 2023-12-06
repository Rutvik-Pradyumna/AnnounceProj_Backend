const express = require('express')
const router = express.Router()
const { registerUser,
        loginUser,
        userLogout,
        userForgotPass,
        userResetPass,
        getAllClubs 
    } = require('../controllers/userControllers')
const { userAuthCheck } = require('../middleware/auth')
const { sendVerMail,verifyUser } = require('../middleware/emailVerify')
const { userResetMail } = require('../middleware/passwordReset')

router.route('/register')
.post(registerUser,sendVerMail)

router.route('/login')
.post(loginUser)

router.route('/protected')
.get(userAuthCheck, (req,res) => res.send('inside protected route'))

router.route('/verify')
.get(verifyUser)

router.route('/forgot-password')
.get(userForgotPass,userResetMail)

router.route('/reset-password')
.put(userResetPass)

router.route('/logout')
.get(userAuthCheck,userLogout)

router.route('/getAllClubs')
.get(userAuthCheck,getAllClubs)

module.exports = router