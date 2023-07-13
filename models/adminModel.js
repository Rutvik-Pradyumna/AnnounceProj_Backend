const mongoose = require('mongoose');   
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose')
const Schema = mongoose.Schema;
const adminSchema =new Schema({
    email: {
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

adminSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User',adminSchema);