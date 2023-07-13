const express = require('express')
const router = express.Router()
const { registerUser,loginUser,userLogout } = require('../controllers/userControllers')
const { userAuthCheck } = require('../middleware/auth')

router.route('/register')
.post(registerUser)

router.route('/login')
.post(loginUser)

router.route('/protected')
.get(userAuthCheck, (req,res) => res.send('inside protected route'))

router.route('/logout')
.get(userAuthCheck,userLogout)

module.exports = router