const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const Club = require('../models/clubModel')

exports.userAuthCheck = (req, res, next) => {
    let jwtToken = req.cookies.jwtToken
    if (!jwtToken) return res.status(401).send('Unauthorized Access')
    jwt.verify(jwtToken, process.env.secret, async (err, payload) => {

        if (err) return res.send('Invalid Access Token Log In again')
        else {
            // checking auth of user
            let user = await User.findOne({ "email": payload.email })
            // checking if current jwtToken is in db
            let oldTokens = user.tokens || []
            let foundToken = 0
            oldTokens.forEach(tokenObj => {
                if (tokenObj.jwtToken === jwtToken) foundToken++
            })
            if (foundToken) {
                req.user = user
                req.curJwt = jwtToken
                next()
            } else res.status(401).send('Invalid Access Token Log In again')
        }

    })
}

exports.clubAuthCheck = (req, res, next) => {
    let jwtToken = req.cookies.jwtToken
    if (!jwtToken) return res.status(401).send('Unauthorized Access')
    jwt.verify(jwtToken, process.env.secret, async (err, payload) => {

        if (err) return res.send('Invalid Access Token Log In again')
        else {
            // checking auth of club
            let club = await Club.findOne({ "email": payload.email })
            // checking if current jwtToken is in db
            let oldTokens = club.tokens || []
            let foundToken = 0
            oldTokens.forEach(tokenObj => {
                if (tokenObj.jwtToken === jwtToken) foundToken++
            })
            if (foundToken) {
                req.club = club
                req.curJwt = jwtToken
                next()
            } else res.status(401).send('Invalid Access Token Log In again')
        }

    })
}