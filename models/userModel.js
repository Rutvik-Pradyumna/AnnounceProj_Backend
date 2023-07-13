const mongoose = require('mongoose')

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
    rollno:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    posts:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post'
    }],
    tokens:[{
        type:Object
    }]
})

userSchema.methods.updateTokens = async function(flag,newToken){
    // flag : 1 -> sign in , 0 -> sign out 
    let oldTokens = this.tokens || []
    let updatedTokens = []
    // not adding newToken if it is not sent (for auth.js)
    if( flag ){
        if(oldTokens.length){
            oldTokens = oldTokens.filter(eachToken => {
                let timeDiff = (Date.now() - parseInt(eachToken.signedAt))/1000
                if(timeDiff < 20) return eachToken
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

module.exports = mongoose.model('User',userSchema)