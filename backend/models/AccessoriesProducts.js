const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accessoriesProductSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    picture: {
        type: String,
        required: true
    },
    available: {
        type: Boolean,
        required: true
    },
    weight: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    }
});

accessoriesProductSchema.index({ "$**": "text" });

module.exports = AccessoriesProducts = mongoose.model("accessories-products", accessoriesProductSchema);
