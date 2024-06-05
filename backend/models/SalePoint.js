const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const salePointSchema = new Schema({
  cityName: {
    type: String,
    required: true
  },
  address: {
    street: {
      type: String,
      required: true
    },
    zip: {
      type: String,
      required: true,
      minlength: 5
    },
    hours: {
      type: [String],
      required: true
    }
  }
});

salePointSchema.index({ "$**": "text" });
module.exports = SalePoint = mongoose.model("sale-point", salePointSchema);
