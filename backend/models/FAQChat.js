const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FAQChatSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        subtitle: {
            advantages: [{
                type: String,
                required: true
            }]
        }
    },
);

module.exports = FAQChat = mongoose.model("faqchats", FAQChatSchema, "faqchats");
