const express = require('express')
const router = express.Router()
const { registerClub,
        loginClub,
        clubLogout,
        addEvent
    } = require('../controllers/clubControllers')
const { clubAuthCheck } = require('../middleware/auth')

router.route('/register')
.post(registerClub)

router.route('/login')
.post(loginClub)

router.route('/protected')
.get(clubAuthCheck, (req,res) => res.send('inside protected route'))

router.route('/logout')
.get(clubAuthCheck,clubLogout)

router.route('/addEvent')
.post(clubAuthCheck,addEvent)

module.exports = router