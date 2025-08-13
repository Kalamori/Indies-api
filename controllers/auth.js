import express from 'express'
import User from '../models/user.js'
import { BadRequestError, InvalidData, Unauthorized } from '../utils/errors.js'
import bcrypt from 'bcrypt'
import { generateToken } from '../utils/token.js'

const router = express.Router()

// Sign up
router.post('/sign-up', async (req, res, next) => {
    try {
        // Ensure Passwords Match
        if (req.body.password !== req.body.passwordConfirmation) {
            throw new InvalidData('Passwords do not match', 'password')
        }
        // Attempt to create new user
        const newUser = await User.create(req.body)

        console.log(newUser)
        
        // Generating the token
        const token = generateToken(newUser)
        // Response
        return res.status(201).json({ token: token})
    } catch (error) {
        next (error)
    }
})
// Sign in
router.post('/sign-in', async (req, res, next) => {
    try {
        const { identifier, password } = req.body

        if (!identifier || !password) {
             throw new BadRequestError('Identifier and password are required.')
        }

      const foundUser = await User.findOne({
        $or: [
            { username: identifier },
            { email: identifier }
        ]
      })  

      if (!foundUser) throw new Unauthorized('User does not exist.')

      if (!bcrypt.compareSync(password, foundUser.password)) 
        throw new Unauthorized('Passwords do not match.')

      const token = generateToken(foundUser)

        return res.json({ token: token})

      return res.json({ message: 'Sign in successful'})
    } catch (error) {
        next(error)
    }
})

export default router
