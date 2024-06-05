const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartSchema = new Schema(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "customers",
      required: true
    },
    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          required: true
        },
        customId: {
          type: String,
          required: true
        },
        name: {
          type: String,
          required: true
        },
        price: {
          type: Number,
          required: true
        },
        picture: {
          type: String,
          required: true
        },
        category: {
          type: String,
          required: true
        }, 
        cartQuantity: {
          type: Number,
          required: true
        },
        discount: {
          type: Number,
          required: false
        },
        available: {
          type: Boolean,
          required: true
        },
        refModel: {
          modelId: {
            type: String,
            required: false,
          },
          modelName: {
            type: String,
            required: false,
          }
        }
      }
    ],
    date: {
      type: Date,
      default: Date.now
    }
  },
  { strict: false }
);

module.exports = Cart = mongoose.model("cart", CartSchema, "cart");
