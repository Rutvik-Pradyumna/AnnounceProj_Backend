const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

exports.userAuthCheck = (req,res,next) => {
    if(req.headers && req.headers.authorization){
        let jwtToken = req.headers.authorization.split(' ')[1]
        jwt.verify(jwtToken,process.env.secret,async (err,payload) => {

            if(err) res.send('Invalid Access Token Log In again')
            else{
                // checking auth of user
                let user = await User.findOne({"email" : payload.email})
                // checking if current jwtToken is in db
                let oldTokens = user.tokens || []
                let foundToken = 0
                oldTokens.forEach( tokenObj => {
                    if(tokenObj.jwtToken === jwtToken) foundToken++
                })
                if(foundToken){
                    req.user=user
                    req.curJwt=jwtToken
                    next()
                } else res.status(401).send('Invalid Access Token Log In again')
            }

        })
    } else {
        res.status(401).send('Unauthorized Access')
    }
}