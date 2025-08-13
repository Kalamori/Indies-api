import express from 'express'
import Menu from '../models/menu.js'
import { BadRequestError, NotFound } from '../utils/errors.js'
import verifyToken from '../middleware/verifyToken.js'
import admin from '../middleware/admin.js'

const router = express.Router()

// Create
router.post('/', verifyToken, admin('admin'), async (req, res, next) => {
    try {
        return res.json({ message: 'HIT CREATE ROUTE'})
    } catch (error) {
        next(error)
    }
})

// Index
router.get('/', async (req, res, next) => {
    try {
        return res.json({ message: 'Hit Index Route'})
    } catch (error) {
        next(error)
    }
})

// Show
router.get('/:id', async (req, res, next) => {
    try {
        return res.json({ message: 'Hit Show Route'})
    } catch (error) {
        next(error)
    }
})

// Update
router.put('/:id', verifyToken, admin('admin'), async (req, res, next) => {
    try {
        return res.json({ message: 'Hit Update Route'})
    } catch (error) {
        next(error)
    }
})

// Delete
router.delete('/:id', verifyToken, admin('admin'), async (req, res, next) => {
    try {
        return res.json({ message: 'Hit Delete Route'})
    } catch (error) {
        next(error)
    }
})



export default router