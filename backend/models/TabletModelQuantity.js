const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tabletProductQuantitySchema = new Schema({
  productId: {
    type: String,
    required: true,
    unique: true,
  },
  refModel: {
      type: String,
      required: true,
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

  quantity: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    default: "tablets",
    required: true,
  },
});

tabletProductQuantitySchema.index({ "$**": "text" });

module.exports = TabletProductQuantity = mongoose.model("tablet-model-quantity", tabletProductQuantitySchema);