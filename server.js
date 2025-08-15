import morgan from 'morgan'
import mongoose from 'mongoose'
import 'dotenv/config'
import cors from 'cors'
import express from 'express'

import userRouter from './controllers/auth.js'
import menuRouter from './controllers/menu.js'

import errorHandler from './middleware/errorHandler.js'
import notFoundHandler from './middleware/notFoundHandler.js'

import verifyToken from './middleware/verifyToken.js'
import admin from './middleware/admin.js'

const app = express()
const port = process.env.PORT || 3000

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET','POST','PUT','DELETE','OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use(express.json())
app.use(morgan('dev'))

app.use('/api/auth', userRouter)
app.use('/api/menu', menuRouter)

app.get('/api/user-profile', verifyToken, (req, res, next) => {
   try {
    console.log(req.user)
    return res.json({
      message: 'User Profile fetched successfully',
      user: req.user,
    })
  } catch (err) {
    next(err)
  }
})

    app.get('/api/admin-profile', verifyToken, admin('admin'), (req, res, next) => {
  try {
    console.log(req.user)
    return res.json({
      message: 'Admin Profile fetched successfully',
      user: req.user,
    })
  } catch (err) {
    next(err)
  }
})

app.use(errorHandler)
app.use(notFoundHandler)

const startServers = async () => {
    try {
     await mongoose.connect(process.env.MONGODB_URI)
    console.log(`Connected to MongoDB ${mongoose.connection.name} Database 🔒`)
    app.listen(port, () => console.log(`Server up and running on port ${port} 🚀`))
    } catch (error) {
    console.log(error)
    }
 }
startServers()