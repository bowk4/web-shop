const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mobileProductSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  refModel: {
    modelId: {
      type: String,
      required: true,
    },
    modelName: {
      type: String,
      required: true,
    }
  },
  name: {
    type: String,
    required: true
  },
  capacity: {
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
  discount: {
    type: Number,
    required: false
  },
  ram: {
    type: String,
    required: true
  },
  screen: {
    type: String,
    required: true
  },
  brandNew: {
    type: Boolean,
    required: true
  },
  picture: {
    type: String,
    required: true
  },
  available: {
    type: Boolean,
    required: true
  }
});

mobileProductSchema.index({ "$**": "text" });

module.exports = MobileProducts = mongoose.model("mobile-products", mobileProductSchema);