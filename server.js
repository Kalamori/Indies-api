import dotenv from 'dotenv'
import morgan from 'morgan'
import mongoose from 'mongoose'
import 'dotenv/config'
import cors from 'cors'
import express from 'express'

//Routes

const app = express()
const port = process.env.PORT || 3000


mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name} 🔒`)
})


app.use(express.json())
app.use(morgan('dev'))

app.listen(3000, () => {
    console.log('The express app is ready! 🚀')
})