import express from 'express'
import mongoose from 'mongoose'
import Menu from '../models/menu.js'
import { BadRequestError, NotFound } from '../utils/errors.js'
import verifyToken from '../middleware/verifyToken.js'
import admin from '../middleware/admin.js'

const router = express.Router()

router.post('/', verifyToken, admin('admin'), async (req, res, next) => {
    try {
        const newMenu = await Menu.create({...req.body, owner: req.user._id})
        res.status(201).json(newMenu)
    } catch (error) {
        next(error)
    }
})

router.get('/', async (req, res, next) => {
    try {
        const menuItems = await Menu.find({})
        res.status(200).json(menuItems)
    } catch (error) {
        next(error)
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid menu ID format'})
        }

        let menu = await Menu.findById(req.params.id)
        if (menu) return res.status(200).json(menu)

        menu = await Menu.findOne({ "items._id": req.params.id })
        if (menu) {
            const item = menu.items.id(req.params.id)
            return res.status(200).json(item)
        }    

        throw new NotFound( 'Menu or Item not found')
    } catch (error) {
        next(error)
    }
})

router.put('/:id', verifyToken, admin('admin'), async (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid menu ID format'})
        }

        const updatedMenu = await Menu.findByIdAndUpdate(
            req.params.id,
            {...req.body},
            { new: true, runValidators: true}
        )

        if (!updatedMenu) throw new NotFound('Menu not found')

       res.status(200).json(updatedMenu)     
    } catch (error) {
        next(error)
    }
})

router.delete('/:id', verifyToken, admin('admin'), async (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid menu ID format'})
        }

        const deletedMenu = await Menu.findByIdAndDelete(req.params.id)

        if (!deletedMenu) throw new NotFound('Menu not found')

        res.status(200).json({ message: 'Menu deleted successfully'})
    } catch (error) {
        next(error)
    }
})

router.put('/:menuId/item/:itemId', verifyToken, admin('admin'), async (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.menuId) || !mongoose.Types.ObjectId.isValid(req.params.itemId)) {
           return res.status(400).json({ message: 'Invalid ID Format'}) 
        }

        const menu = await Menu.findById(req.params.menuId)
        if (!menu) throw new NotFound ('Menu not found')

        const item = menu.items.id(req.params.itemId)
        if (!item) throw new NotFound ('Menu item not found')
            
       Object.assign(item, req.body)
       await menu.save()
       
       res.status(200).json(item)
    } catch (error) {
      next (error)  
    }
})

router.delete('/:menuId/item/:itemId', verifyToken, admin('admin'), async (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.menuId) || !mongoose.Types.ObjectId.isValid(req.params.itemId)) {
            return res.status(400).json({ message: 'Invalid ID format'})
        }

        const menu = await Menu.findById(req.params.menuId)
        if (!menu) throw new NotFound ('Menu not found')

        const item = menu.items.id(req.params.itemId)
        if (!item) throw new NotFound ('Menu item not found')
            
        item.deleteOne()
        await menu.save()
        
        res.status(200).json({ message: 'Menu item deleted successfully'})
    } catch (error) {
      next (error)  
    }
})


export default router