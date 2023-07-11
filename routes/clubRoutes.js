const express=require('express')
const router=express.Router();
const {clubRegister}=require('../controllers/club.js')
const {clubAuthenticate}=require('../middleware/auth.js')
require('../strategies/clubStrategy.js')

router.route('/login')
.post(clubAuthenticate,(req,res) => {
    console.log(req.session)
    res.send('club logged in')
})

router.route('/register')
.post(clubRegister, clubAuthenticate, (req,res) => res.send('club registered and authed'))

router.get('/ins',(req,res) => {
    console.log(req.session)
    if(req.isAuthenticated()){
        res.send('club inside')
    } else res.send('club outside')
})

module.exports = router;