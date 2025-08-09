import express from 'express'
import Menu from '../models/menu.js'

const router = express.Router()

// Create
router.post('/', async (req, res, next) => {
    try {
        const menu = await Menu.create(req.body)
        res.status(201).json(menu)
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
router.put('/:id', async (req, res, next) => {
    try {
        return res.json({ message: 'Hit Update Route'})
    } catch (error) {
        next(error)
    }
})

// Delete
router.delete('/:id', async (req, res, next) => {
    try {
        return res.json({ message: 'Hit Delete Route'})
    } catch (error) {
        next(error)
    }
})



export default router