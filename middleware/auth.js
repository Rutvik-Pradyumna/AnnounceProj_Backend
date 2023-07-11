const passport=require('passport')

exports.userAuthenticate = (req,res,next) => {
    passport.authenticate('userStrategy',{
        failureRedirect: '/register', 
        failureMessage: true
     })(req,res,next)
}

exports.clubAuthenticate = (req,res,next) => {
    passport.authenticate('clubStrategy',{
        failureRedirect: '/register', 
        failureMessage: true
     })(req,res,next)
}