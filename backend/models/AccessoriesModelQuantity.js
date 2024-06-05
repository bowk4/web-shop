const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const accessoriesModelQuantitySchema = new Schema({
  productName: {
    type: String,
    required: true,
    unique: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

module.exports = AccessoriesModelQuantity = mongoose.model("accessories-model-quantity", accessoriesModelQuantitySchema);