import express from 'express'
import Menu from '../models/menu.js'

const router = express.Router()

// Create
router.post('/', async (req, res, next) => {
    try {
        return res.json({ message: 'Hit Create Route'})
    } catch (error) {
        next(error)
    }
})

// Index

// Show

// Update

// Delete



export default router