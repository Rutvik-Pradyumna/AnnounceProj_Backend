const express = require('express')
const router = express.Router()
const { registerUser,loginUser,userLogout } = require('../controllers/userControllers')
const { userAuthCheck } = require('../middleware/auth')
const { sendVerMail,verifyUser } = require('../middleware/emailVerify')

router.route('/register')
.post(registerUser,sendVerMail)

router.route('/login')
.post(loginUser)

router.route('/protected')
.get(userAuthCheck, (req,res) => res.send('inside protected route'))

router.route('/verify')
.get(verifyUser)

router.route('/logout')
.get(userAuthCheck,userLogout)

module.exports = router