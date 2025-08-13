import dotenv from 'dotenv'
import morgan from 'morgan'
import mongoose from 'mongoose'
import 'dotenv/config'
import cors from 'cors'
import express from 'express'

// Error Middleware 
import notFoundHandler from './middleware/notFoundHandler.js'
import errorHandler from './middleware/errorHandler.js'

//Routers
import userRouter from './controllers/user.js'
import menuRouter from './controllers/menu.js'

const app = express()
const port = process.env.PORT || 3000

// Middleware
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

// Routes
app.use('/api/auth', userRouter)
app.use('/api/menu', menuRouter)


// Error Handler routes
app.use(errorHandler)
app.use(notFoundHandler)

// Server connections
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