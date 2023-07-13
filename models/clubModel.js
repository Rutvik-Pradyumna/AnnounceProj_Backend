const mongoose = require('mongoose');   
const passportLocalMongoose = require('passport-local-mongoose');
const clubSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    genSec:{
        type:String,
        require:true
    },
    posts:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post'
    }],
    email:{
        type:String,//username ->email
        require:true
    },
    password:{
        type:String,
        require:true
    }
})
clubSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Club',clubSchema);
