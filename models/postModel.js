const mongoose = require('mongoose');  


const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    lastDateToApply:{
        type:Date,
        required:true
    },
    eventDate:{
        type:Date,
        required:true
    },
    users:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }]

})

module.exports = mongoose.model('Post',postSchema);
