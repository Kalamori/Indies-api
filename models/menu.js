import mongoose from "mongoose"

const itemSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        price: {
            type: Number,
            required: true,
        },
        category: {
            type: String,
            required: true,
            trim: true,
        },
        img_URL: {
            type: String,
            required: true,
            trim: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
})

const menuSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        unique: true,
    },
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    items:[itemSchema],
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

const Menu = mongoose.model('Menu', menuSchema)

export default Menu