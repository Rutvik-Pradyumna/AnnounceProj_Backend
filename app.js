const express=require('express')
require('dotenv').config({path : './envFolder/.env'})
const mongoose = require('mongoose')
const session = require('express-session');
const app=express()
const port=8000
const cors = require('cors')
const passport = require('passport')


//Auth
const sessionConfig = {
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        httpOnly:true,
        expires:Date.now()+1000*60*60*24*7,
        maxAge : 1000*60*60*24*7
    }
}
app.use(session(sessionConfig))
app.use(passport.initialize())
app.use(passport.session())


// middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended : true }))


// routes
app.use('/', require('./routes/tempRoute'))
app.use('/', require('./routes/userRoutes'))
app.use('/club', require('./routes/clubRoutes'))

app.get('/in',(req,res) => {
    console.log(req.session)
    if(req.isAuthenticated()){
        res.send('inside')
    } else res.send('outside')
})

app.use(require('./middleware/errHandler.js').errHandler)


const startApp = async () => {
    try{
        // DB_Connection
        await mongoose.connect(process.env.MONGO_URI)
        app.listen( port, console.log(`http://localhost:${port}`) )
    } catch(err) {
        console.log(err)
    }
}
startApp()