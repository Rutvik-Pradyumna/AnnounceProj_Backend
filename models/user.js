const mongoose = require('mongoose');   


const userSchema =new mongoose.Schema({
    email: {
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    department:{
        type:String,
        required:true
    },
    year:{
        type:String,
        required:true
    },
    Roll_No:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});



module.exports = mongoose.model('User',userSchema);