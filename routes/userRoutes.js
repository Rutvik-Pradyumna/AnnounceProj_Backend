const express=require('express')
const router=express.Router()
const {userRegister}=require('../controllers/user.js')
const passport = require('passport');

require('../middleware/userAuth.js');

router.post('/login', passport.authenticate('userStrategy', { failureRedirect: '/register', failureMessage: true }), async (req, res) => {
    res.send('logged in');
});

router.route('/register')
.post(userRegister)


module.exports = router;