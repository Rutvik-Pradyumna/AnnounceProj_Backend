const bcrypt = require('bcrypt')
const Club = require('../models/club')

exports.clubRegister =async (req,res,next)=>{
    try{
        const password = await bcrypt.hash(req.body.password,12)
        const newClub = new Club({
            email: req.body.email,
            name:req.body.name,
            description:req.body.description,
            genSec:req.body.genSec,
            password:password,
        })
        newClub.save()
    }
    catch(e){
        console.log(e.message)
    }

    next()
}