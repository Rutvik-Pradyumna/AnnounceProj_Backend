
const bcrypt = require('bcrypt');
const User = require('../models/user');


exports.startRoute = (req,res) => {
    console.log("start")
    res.send('start')
}

exports.userRegister =async (req,res)=>{
    const password = await bcrypt.hashSync(req.body.password,12);

    try{

    const newUser = new User({
        email: req.body.email,
        username:req.body.username,
        department:req.body.department,
        year:req.body.year,
        rollno:req.body.rollno,
        password:password,

     })
    newUser.save();

    }
    catch(e){
        console.log(e.message);
    }

    res.send('Registered')
}