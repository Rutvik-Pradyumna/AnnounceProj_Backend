const bcrypt = require('bcrypt')
const Club = require('../models/clubModel')
const jwt = require('jsonwebtoken')

exports.registerClub = async (req,res,next) => {
    try{

        if(req.body.securityCode !== process.env.SECURITY_CODE){
            return res.send('Incorrect Security Code')
        }

        let hashedPassword = await bcrypt.hash(req.body.password,parseInt(process.env.SALT))
        
        let newClub = new Club({
            "name" : req.body.name,
            "description" : req.body.description,
            "genSec" : req.body.genSec,
            "email" : req.body.email,
            "password" : hashedPassword
        })

        let existingClub = await Club.findOne({"name" : newClub.name})
        if(existingClub) return res.send('Clubname Already Registered')
        else{
            existingClub = await Club.findOne({"email" : newClub.email})
            if(existingClub) return res.send('Email already Registered')
            else{
                newClub.save()
                return res.send('Club Registered')
            }
        }
    } catch(err) {
        next(err)
    }
}

exports.loginClub = async (req,res,next) => {
    let { email, password } = req.body
    let club = await Club.findOne({"email" : email})
    if(!club){
        return res.status(404).send('Club not found')
    }
    else{
        bcrypt.compare(password,club.password)
        .then( async (isPswdMatched) => {
            if (isPswdMatched) {

                // creating and storing and checking expiry date of token
                let jwtToken = jwt.sign({"email" : club.email},process.env.SECRET,{"expiresIn" : "1d"})
                // updating old tokens
                club.updateTokens(1,jwtToken)

                return res.json({jwtToken, "userType" : "club"})
            } else {
                return res.status(400).send('Invalid password')
            }
        })
        .catch(err => next(err))
    }
}

exports.clubLogout = async (req,res) => {
    let club = req.club
    await club.updateTokens(0,req.curJwt)
    res.send('Club Logged Out')
}