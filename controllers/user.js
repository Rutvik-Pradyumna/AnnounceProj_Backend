const bcrypt = require('bcrypt')
const User = require('../models/user')

exports.userRegister = async (req,res,next)=>{
    try{
        const password = await bcrypt.hash(req.body.password,12)
        const newUser = new User({
            email: req.body.email,
            username:req.body.username,
            department:req.body.department,
            year:req.body.year,
            rollno:req.body.rollno,
            password:password,
        })
        newUser.save()
    }
    catch(e){
        console.log(e.message)
    }

    next()
}

exports.logoutUser = (req,res) => {
    req.logout( err => {
        if(err) next(err)
    })
    res.send('user logged out')
}