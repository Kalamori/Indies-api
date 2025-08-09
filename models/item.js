import mongoose from "mongoose"

const itemSchema = new mongoose.Schema({
    _id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            unique: true,
        },
        menuId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Menu',
            required: true,
        },
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

const Item = mongoose.model('Item', itemSchema)

export default Item