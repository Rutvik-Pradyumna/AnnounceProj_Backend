const bcrypt = require('bcrypt')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const uuid = require('uuid')
const Club = require('../models/clubModel')
const { sendVerMail } = require('../middleware/emailVerify')

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
        if(existingUser) return res.send('Username Already exists')
        else{
            existingUser = await User.findOne({"email" : newUser.email})
            if(existingUser) return res.send('Email already Registered')
            else{
                newUser.save()
                req.user = newUser
                return next()
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
        return res.status(404).send('User not found')
    }
    else{
        if(!user.isVerified){
            // req.user = user
            // sendVerMail(req,res,next)
            return res.send('Verify your Email to continue')
        }
        bcrypt.compare(password,user.password)
        .then( async (isPswdMatched) => {
            if (isPswdMatched) {

                // creating and storing and checking expiry date of token
                let jwtToken = jwt.sign({"email" : user.email},process.env.SECRET,{"expiresIn" : "1d"})
                // updating old tokens
                user.updateTokens(1,jwtToken)
                res.cookie('jwtToken',jwtToken,{httpOnly:true, expires:new Date(Date.now() + 24*60*60*1000)})
                res.cookie('userType',"nonAdmin",{httpOnly:true, expires:new Date(Date.now() + 24*60*60*1000)})
                res.json({jwtToken,"userType" : "nonAdmin"})
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
    res.clearCookie('jwtToken')
    res.clearCookie('userType')
    res.send('User Logged Out')
}

exports.userForgotPass = async (req,res,next) => {
    try {
        let { email } = req.body
        let user = await User.findOne({"email" : email})
        if(!user) return res.send('Email does not exist')

        // inserting resetId
        let resetId = uuid.v4()
        await User.findOneAndUpdate({"email":email},{"resetId":resetId})
        req.resetId = resetId
        req.userId = user._id
        req.email = email
        next()
    } catch (err) {
        next(err)
    }
}

exports.userResetPass = async (req,res,next) => {
    try {
        let { userId,resetId } = req.query
        let user = await User.findById(userId)
        if(!user){
            return res.status(404).send('User not found')
        }
        if(user.resetId!=resetId) return res.send('Invalid resetId')
        let hashedPassword = await bcrypt.hash(req.body.password,parseInt(process.env.SALT))
        await User.findByIdAndUpdate({_id:userId},{$set:{password:hashedPassword, resetId:""}},{new:true})
        res.json({userId,resetId})
    } catch (err) {
        next(err)
    }
}

exports.getAllClubs = async (req,res,next) => {
    try {
        let allClubs = await Club.find().populate("posts")
        res.send(allClubs)
    } catch (error) {
        next(error)
    }
}

exports.getProfile = async (req,res,next) => {
    let profile = {
        "email" : req.user.email,
        "username" : req.user.email,
        "department" : req.user.department,
        "year": req.user.year,
        "rollno": req.user.rollno
    }
    res.send(profile)
}

exports.getEachClub = async (req,res,next) => {
    let { clubId } = req.query
    let myClub = await Club.findById(clubId).populate("posts")
    if(!myClub) return res.send('Invalid clubId')
    else res.send(myClub)
}