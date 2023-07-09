const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/club');
const bcrypt = require('bcrypt');
const passport = require('passport');

const verifyCallback =  (username,password,done)=>{
       
        User.findOne({email:username})
        .then((user)=>{
            if(!user){return done(null,false)}
            
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

const strategy = new LocalStrategy({usernameField:'email'},verifyCallback);

passport.use('clubStrategy', strategy);

passport.serializeUser((club,done)=>{
    done(null,club._id);
})

passport.deserializeUser((clubId,done)=>{
    User.findById(clubId)
    .then((club)=>{
        done(null,club)
    })
    .catch(err=>done(err))
})

