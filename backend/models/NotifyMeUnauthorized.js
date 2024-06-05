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
  listOfActualEmails: [
    {
      email: {
        type: String,
        required: true,
      },
    },
  ],
  listOfAllEmails: [
    {
      email: {
        type: String,
        required: true,
      },
    },
  ]
});

notifyMeAuthorizedSchema.index({ "$**": "text" });

module.exports = NotifyMeAuthorized = mongoose.model("notify-me-unauthorized", notifyMeAuthorizedSchema);