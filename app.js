const express=require('express')
require('dotenv').config({path : './envFolder/.env'})
const mongoose = require('mongoose')

const app=express()
const port=8000

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended : true }))

// routes
app.use('/', require('./routes/tempRoute'))

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