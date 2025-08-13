import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: ['Please provide a username', true],
        unique: true,
        trim: true,
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
    passwordConfirmation: {
        type: String,
        required: true,
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

// Hash the password just before saving a new user
userSchema.pre('save', function(next){
    if (this.isModified('password')){
      this.password = bcrypt.hashSync(this.password, 12)
    }
    next()
})


const User = mongoose.model('User', userSchema)

export default User