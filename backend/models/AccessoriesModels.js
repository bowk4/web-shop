const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accessoriesModelSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true,
        unique: true
    },
    available: {
        type: Boolean,
        required: true
    },
    colors: [
        {
            colorName: {
                type: String,
                required: true
            },
            pictures: [
                {
                    alt: {
                        type: String,
                        required: true
                    },
                    link: {
                        type: String,
                        required: true
                    }
                }
            ],
        }
    ],
    techSpecs: [{
        specName: {
            type: String,
            required: true
        },
        specDescription: {
            type: String,
            required: true
        }
    }],
    about: [{
        title: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: true
        }
    }],
    category: {
        type: String,
        required: true
    },


});

accessoriesModelSchema.index({"$**": "text"});

module.exports = AccessoriesModel = mongoose.model("accessories-model", accessoriesModelSchema);

