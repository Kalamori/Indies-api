import express from 'express'
import User from '../models/user.js'
import { BadRequestError, InvalidData, Unauthorized } from '../utils/errors.js'
import bcrypt from 'bcrypt'
import { generateToken } from '../utils/token.js'

const router = express.Router()

router.post('/sign-up', async (req, res, next) => {
    try {
      const { username, password, passwordConfirmation } = req.body

        if (!username || !password || !passwordConfirmation) {
            throw new InvalidData('All fields are required')
        }

        if (password !== passwordConfirmation) {
          throw new InvalidData('Passwords do not match', 'password')
        }

        const newUser = await User.create(req.body)

        const token = generateToken(newUser)

        return res.status(201).json({ token })
    } catch (error) {
        next (error)
    }
})

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

        return res.json({ token })
    } catch (error) {
        next(error)
    }
})

export default router
