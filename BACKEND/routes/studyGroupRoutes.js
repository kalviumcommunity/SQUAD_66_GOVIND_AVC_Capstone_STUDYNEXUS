// const express=require('express')
const express=require('express')
const { createGroup, getBrowseRequests } = require('../controllers/studyGroupController')
const protectRoute = require('../middleware/authMiddleware')
const router=express.Router()

router.post('/create',protectRoute,createGroup)

router.get('/requests',protectRoute,getBrowseRequests)


module.exports=router   
