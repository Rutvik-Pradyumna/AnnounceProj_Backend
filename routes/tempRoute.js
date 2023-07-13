const express=require('express')
const router=express.Router()
const { startRoute ,userRegister}=require('../controllers/tempController.js')

router.route('/')
.get(startRoute)




module.exports = router;