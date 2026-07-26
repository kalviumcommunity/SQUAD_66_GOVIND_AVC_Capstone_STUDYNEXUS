const express = require('express')
const multer = require('multer')
const { signup, login } = require('../controllers/authController')

const router=express.Router()
const upload = multer({ storage: multer.memoryStorage() })

router.post('/signup', upload.single('photo'), signup)

router.post('/login',login)

module.exports = router;