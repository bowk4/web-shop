// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WishlistSchema = new Schema({
    id: {
        type : String
    },
    products: []
});

module.exports = Wishlist = mongoose.model(
    "wishlist",
    WishlistSchema,
    "wishlist"
);
