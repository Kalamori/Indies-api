import dotenv from 'dotenv'
import morgan from 'morgan'
import mongoose from 'mongoose'
import 'dotenv/config'
import cors from 'cors'
import express from 'express'

//Routers

import menuRouter from './controllers/menu.js'

const app = express()
const port = process.env.PORT || 3000

// Middleware
app.use(express.json())
app.use(morgan('dev'))

// Routes
app.use('/api/menu', menuRouter)


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