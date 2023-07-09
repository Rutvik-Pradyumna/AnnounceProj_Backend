

const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');

const User = require('../models/user');
const bcrypt = require('bcrypt');

const verifyCallback =  (username,password,done)=>{
       
        User.findOne({username:username})
        .then((user)=>{
            if(!user){return done(null,false);}
             bcrypt.compare(password,user.password)
             .then((isValid) => {
                if (isValid) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            })
            .catch((e) => {
                console.log(e);
                done(e);
            });
        })
        .catch(e=>{
            console.log(e)
            done(e)
        })
}

const strategy = new LocalStrategy(verifyCallback);

passport.use('userStrategy', strategy);

passport.serializeUser((student,done)=>{
    done(null,student._id);
})

passport.deserializeUser((studentId,done)=>{
    User.findById(studentId)
    .then((student)=>{
        done(null,student)
    })
    .catch(err=>done(err))
})
