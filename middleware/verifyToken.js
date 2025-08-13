import jwt from 'jsonwebtoken'
import { Unauthorized } from "../utils/errors.js"
import User from '../models/user.js'

const verifyToken = async (req, res, next) => {
    try {
     const authHeader = (req.headers.authorization)
     if (!authHeader) throw new Unauthorized('No authorization header provided (Bearer Token)')
    
    const token = (authHeader.split(' ')[1])
    if (!token) throw new Unauthorized('Authorization header format was invalid')
    
    const payload = jwt.verify(token, process.env.TOKEN_SECRET)
    
    const foundUser = await User.findById(payload.user._id).select('-passwordConfirmation')
    if (!foundUser) throw new Unauthorized('User does not exist')

    req.user = foundUser
    next()
    } catch (error) {
      next (error)  
    }
}

export default verifyToken