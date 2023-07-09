
const bcrypt = require('bcrypt');
const Club = require('../models/club');


exports.startRoute = (req,res) => {
    console.log("start")
    res.send('start')
}

exports.clubRegister =async (req,res)=>{
    const password = await bcrypt.hashSync(req.body.password,12);

    try{

    const newClub = new Club({
        email: req.body.email,
        name:req.body.name,
        description:req.body.department,
        genSec:req.body.year,
        password:password,
     })
    newClub.save();

    }
    catch(e){
        console.log(e.message);
    }

    res.send('Registered')
}