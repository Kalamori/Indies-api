import express from 'express'
import verifyToken from '../middleware/verifyToken.js'
import admin from '../middleware/admin.js'

const router = express.Router()

// Admin Profile
router.get('/admin-profile', verifyToken, admin('admin'), async (req, res, next) => {
    try {
        res.status(200).json(req.user)
    } catch (error) {
      next (error)  
    }
})

export default router