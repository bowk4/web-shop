const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mobileModelSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    unique: true
  },
  colors: [
    {
      colorName: {
        type: String,
        required: true
      },
      pictures: [
        {
          alt: {
            type: String,
            required: true
          },
          link: {
            type: String,
            required: true
          }
        }
      ],
      capacities: [
        {
          capacity: {
            type: String,
            enum: ["64", "128", "256", "512", "1024"],
            required: true
          },
          price: {
            type: Number,
            required: true
          },
          productId: {
            type: String,
            required: true
          },
          available: {
            type: Boolean,
            default: true,
            required: true
          },
          discount: {
            type: Number,
            required: false
          }
        }
      ],
      hexColor: {
        type: String,
        required: true
      }
    }
  ],
  techSpecs: [{
    specName: {
      type: String,
      required: true
    },
    specDescription: {
      type: String,
      required: true
    }
  }],
  about: [{
    title: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    }
  }],
  refRecommendations: {
    type: String,
    required: false
  }
});

mobileModelSchema.index({ "$**": "text" });

module.exports = MobileModel = mongoose.model("mobile-model", mobileModelSchema);
