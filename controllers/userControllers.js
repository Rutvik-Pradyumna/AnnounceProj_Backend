const bcrypt = require('bcrypt')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

exports.registerUser = async (req,res,next) => {
    try{
        let hashedPassword = await bcrypt.hash(req.body.password,parseInt(process.env.SALT))
        
        let newUser = new User({
            "email" : req.body.email,
            "username" : req.body.username,
            "department" : req.body.department,
            "year" : req.body.year,
            "rollno" : req.body.rollno,
            "password" : hashedPassword
        })

        let existingUser = await User.findOne({"username" : newUser.username})
        if(existingUser) res.send('Username Already exists')
        else{
            existingUser = await User.findOne({"email" : newUser.email})
            if(existingUser) res.send('Email already Registered')
            else{
                newUser.save()
                res.send('User Registered')
            }
        }
    } catch(err) {
        next(err)
    }
}

exports.loginUser = async (req,res,next) => {
    let { email, password } = req.body
    let user = await User.findOne({"email" : email})
    if(!user){
        res.status(404).send('User not found')
    }
    else{
        bcrypt.compare(password,user.password)
        .then( async (isPswdMatched) => {
            if (isPswdMatched) {

                // creating and storing and checking expiry date of token
                let jwtToken = jwt.sign({"email" : user.email},process.env.SECRET,{"expiresIn" : "1d"})
                // updating old tokens
                user.updateTokens(1,jwtToken)

                res.json({jwtToken, "userType" : "nonAdmin"})
            } else {
                res.status(400).send('Invalid password')
            }
        })
        .catch(err => next(err))
    }
}

exports.userLogout = async (req,res) => {
    let user = req.user
    await user.updateTokens(0,req.curJwt)
    res.send('User Logged Out')
}