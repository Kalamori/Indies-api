import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true,
        auto: true,
    },
    name: {
        type: String,
        required: ['Please provide a name', true],
        unique: true,
    },
    email: {
        type: String,
        required: ['Please provide a email address',true],
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: ['Please provide a password',true],
    },
    role: {
        type: String,
        required: true,
        enum: ['user', 'admin'],
        default: 'user',
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const User = mongoose.model('User', userSchema)

export default User