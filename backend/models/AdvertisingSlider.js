const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const advertisingSliderSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    subtitle: {
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
    ]
});

module.exports = mongoose.model('advertising-slider', advertisingSliderSchema);
