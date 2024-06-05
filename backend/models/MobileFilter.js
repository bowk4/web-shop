const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mobileFilterSchema = new Schema(
  {
    type: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    }
  },
  { strict: false }
);

module.exports = Filter = mongoose.model("mobile-filters", mobileFilterSchema);
