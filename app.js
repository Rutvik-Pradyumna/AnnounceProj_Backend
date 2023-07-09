const express=require('express')
require('dotenv').config({path : './envFolder/.env'})
const mongoose = require('mongoose')
const session = require('express-session');
const app=express()
const port=8000
var cors = require('cors');
app.use(cors());
const passport = require('passport');


//Auth
const sessionConfig = {
    secret:'nikcheppanraep',
    resave:false,
    saveUninitialized:true,
    cookie:{
        httpOnly:true,
        expires:Date.now()+1000*60*60*24*7,
        maxAge : 1000*60*60*24*7
    }
}
app.use(session(sessionConfig))
app.use(passport.session());
app.use(passport.initialize());

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended : true }))

// routes
app.use('/', require('./routes/tempRoute'))
app.use('/', require('./routes/userRoutes'))
app.use('/club', require('./routes/clubRoutes'))


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

app.use((err, req, res, next) => {
    if (err) {
      res.status(401).json({ error: 'Authentication failed' });
    }
});




