const mongoose = require('mongoose');   

const clubSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    image:{
        type:String,
        required:true
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
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    tokens:[{
        type:Object
    }]
})

clubSchema.methods.updateTokens = async function(flag,newToken){
    // flag : 1 -> sign in , 0 -> sign out 
    let oldTokens = this.tokens || []
    let updatedTokens = []
    // not adding newToken if it is not sent (for auth.js)
    if( flag ){
        if(oldTokens.length){
            oldTokens = oldTokens.filter(eachToken => {
                let timeDiff = (Date.now() - parseInt(eachToken.signedAt))/1000
                if(timeDiff < 86400) return eachToken
            })
        }
        updatedTokens = [...oldTokens,{jwtToken : newToken,"signedAt" : Date.now().toString()}]
    }
    else{
        if(oldTokens.length){
            oldTokens = oldTokens.filter(eachToken => {
                let timeDiff = (Date.now() - parseInt(eachToken.signedAt))/1000
                if(timeDiff < 86400 && eachToken.jwtToken !== newToken) return eachToken
            })
        }
        updatedTokens = [...oldTokens]
    }

    this.tokens = updatedTokens
    await this.save()
}

module.exports = mongoose.model('Club',clubSchema);
