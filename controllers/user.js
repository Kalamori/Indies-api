import express from 'express'
import verifyToken from '../middleware/verifyToken.js'

const router = express.Router()

router.get('/user-profile', verifyToken, async (req, res, next) => {
    try {
        res.status(200).json(req.user)
    } catch (error) {
      next(error)  
    }
})

export default router