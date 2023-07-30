const nodemailer = require('nodemailer')
const User = require('../models/userModel')

exports.userResetMail = (req,res) => {
    let { email,userId,resetId } = req
    let transporter = nodemailer.createTransport({
        service : 'Gmail',
        auth : {
            user : process.env.MAIL_ID,
            pass : process.env.MAIL_PSWD
        }
    })
    let mailOptions = {
        from : process.env.MAIL_ID,
        to : email,
        subject : 'Verify Your Mail for NitWBuZZ',
        html : `<a href="http://localhost:8000/user/reset-password?userId=${userId}&resetId=${resetId}">Click here to reset password</a>`
    }
    transporter.sendMail(mailOptions)
    .then( info => console.log(info.response))
    .catch( err => next(err) )

    res.send('Email sent Successfully.')
}