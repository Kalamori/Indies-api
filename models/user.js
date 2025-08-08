import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: {
        type: string,
        required: ['Please provide a name', true],
        unique: true,
    },
    emai: {
        type: string,
        required: true,
        unique: true,
    },
    password: {
        type: string,
        required: true,
    },
    role: {
        type: string,
        required: true,
    },
    createdAt: datetime,
})

const User = mongoose.model('User', userSchema)

export default User