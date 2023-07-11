const express=require('express')
const router=express.Router()
const {userRegister, logoutUser}=require('../controllers/user.js')
const {userAuthenticate}=require('../middleware/auth.js')
require('../strategies/userStrategy.js')

router.route('/login')
.post(userAuthenticate,(req,res) => {
    res.send('user logged in')
})

router.route('/logout')
.get(logoutUser)

router.route('/register')
.post(userRegister, userAuthenticate, (req,res) => res.send('user registered and authed'))

module.exports = router;