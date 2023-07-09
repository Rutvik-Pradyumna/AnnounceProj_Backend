const express=require('express')
const router=express.Router();
const passport = require('passport');
const {clubRegister}=require('../controllers/club.js')
require('../middleware/clubAuth.js');

router.post('/login', passport.authenticate('clubStrategy', { failureRedirect: '/register', failureMessage: true }), async (req, res) => {
    res.send('logged in');
});

router.route('/register')
.post(clubRegister)


module.exports = router;