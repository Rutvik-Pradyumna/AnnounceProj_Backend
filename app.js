const express=require('express')
require('dotenv').config({path : './envFolder/.env'})
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')


const app=express()
const port=8000


// middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended : true }))
app.use(cookieParser())

// routes
app.use('/api/', require('./routes/tempRoute'))
app.use('/api/user',require('./routes/userRoutes'))
app.use('/api/club',require('./routes/clubRoutes'))
app.use(require('./middleware/errorHandler').errHandler)

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