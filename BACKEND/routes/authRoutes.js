const express = require('express')
const multer = require('multer')
const { signup, login, updateProfile } = require('../controllers/authController')
const protectRoute = require('../middleware/authMiddleware')

const router=express.Router()
const upload = multer({ storage: multer.memoryStorage() })

router.post('/signup', upload.single('photo'), signup)

router.post('/login',login)

// Update profile details (JWT required). Email and userid cannot be changed.
router.put('/profile', protectRoute, updateProfile)

module.exports = router;
