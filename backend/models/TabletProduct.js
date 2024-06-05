const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tabletProductSchema = new Schema({
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
    enum: ["64", "256"],
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
    default: "4",
    required: true
  },
  screen: {
    type: String,
    required: true
  },
  available: {
    type: Boolean,
    required: true
  },
  picture: {
    type: String,
    required: true
  },
  category: {
    type: String,
    default: "tablets",
    required: true,
  },
});

tabletProductSchema.index({ "$**": "text" });

module.exports = TabletProducts = mongoose.model("tablet-products", tabletProductSchema);