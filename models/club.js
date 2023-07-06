const mongoose = require('mongoose');   

const Schema = mongoose.Schema;

const clubSchema = new Schema({
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
        type:Schema.Types.ObjectId,
        ref:'Post'
    }],
    username:{
        type:String,//username ->email
        require:true
    },
    password:{
        type:String,
        require:true
    }
})

module.exports = mongoose.model('Club',clubSchema);
