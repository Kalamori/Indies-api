import dotenv from 'dotenv'
import morgan from 'morgan'
import mongoose from 'mongoose'
import 'dotenv/config'
import cors from 'cors'
import express from 'express'

import notFoundHandler from './middleware/notFoundHandler.js'
import errorHandler from './middleware/errorHandler.js'
import verifyToken from './middleware/verifyToken.js'
import admin from './middleware/admin.js'

import userRouter from './controllers/auth.js'
import menuRouter from './controllers/menu.js'

const app = express()
const port = process.env.PORT || 3000

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(express.json())
app.use(morgan('dev'))

app.use('/api/auth', userRouter)
app.use('/api/menu', menuRouter)

app.get('/api/user-profile', verifyToken, (req, res, next) => {
    console.log(req.user)
    return res.json({ message: 'HIT User Profile ROUTE'})
} )

app.get('/api/admin-profile', verifyToken, admin('admin') ,(req, res, next) => {
    console.log(req.user)
    return res.json({ message: 'HIT Admin Profile ROUTE'})
} )

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