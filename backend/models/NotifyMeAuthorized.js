const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notifyMeAuthorizedSchema = new Schema({
  productId: {
    type: String,
    required: true,
    unique: true,
  },
  refCategory: {
    type: String,
    required: true,
  },
  listOfActualSubscribers: [
    {
      customerNo: {
        type: String,
        required: true,
      },
    },
  ],
  listOfAllSubscribers: [
    {
      customerNo: {
        type: String,
        required: true,
      },
    },
  ]
});

notifyMeAuthorizedSchema.index({ "$**": "text" });

module.exports = NotifyMeAuthorized = mongoose.model("notify-me-authorized", notifyMeAuthorizedSchema);