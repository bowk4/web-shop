const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mobileModelQuantitySchema = new Schema({
  productId: {
    type: String,
    required: true,
  },
  refModel: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  capacity: {
    type: String,
    enum: ['64', '128', '256', '512', '1024'],
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

module.exports = MobileModelQuantity = mongoose.model("mobile-model-quantity", mobileModelQuantitySchema);