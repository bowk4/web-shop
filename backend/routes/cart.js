const express = require("express");
const router = express.Router();
const passport = require("passport");

//Import controllers
const {
  createCart,
  updateCart,
  addProductToCart,
  increaseCartProductQuantity,
  decreaseCartProductQuantity,
  deleteCart,
  deleteProductFromCart,
  getCart,
  synchronizeCart,
  validateCartItems,
  updateProductQuantities
} = require("../controllers/cart");

// @route   PUT /cart/synchronize
// @desc    Synchronize cart items for authenticated user
// @access  Private
router.put(
  "/sync", 
  passport.authenticate("jwt", { session: false }), 
  synchronizeCart
);

// @route   POST /cart
// @desc    Create cart
// @access  Private
router.post(
  "/", 
  passport.authenticate("jwt", { session: false }), 
  createCart
);

// @route   PUT /cart
// @desc    Update cart when adding / deleting products in cart
// @access  Private
router.put(
  "/", 
  passport.authenticate("jwt", { session: false }), 
  updateCart
);


// @route   PUT /cart/:productId
// @desc    Add one product to cart
// @access  Private
router.put(
  "/:productId",
  passport.authenticate("jwt", { session: false }),
  addProductToCart
);

// @route   DELETE /cart
// @desc    Delete cart (when the order is placed or customer logging out)
// @access  Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  deleteCart
);

// @route   DELETE /cart/:productId
// @desc    Delete one product from cart
// @access  Private
router.delete(
  "/:productId",
  passport.authenticate("jwt", { session: false }),
  deleteProductFromCart
);

// @route   DELETE /cart/product/:productId
// @desc    Delete one product from cart
// @access  Private
// router.delete(
//   "/product/:productId",
//   passport.authenticate("jwt", { session: false }),
//   decreaseCartProductQuantity
// );

// @route   PUT /cart/decrease/:productId
// @desc    Decrease quantity of a product in the cart by one
// @access  Private
router.put(
  "/decrease/:productId",
  passport.authenticate("jwt", { session: false }),
  decreaseCartProductQuantity
);

// @route   PUT /cart/decrease/:productId
// @desc    Decrease quantity of a product in the cart by one
// @access  Private
router.put(
  "/increase/:productId",
  passport.authenticate("jwt", { session: false }),
  increaseCartProductQuantity
);

// @route   GET /cart
// @desc    Get cart for customer
// @access  Private
router.get(
  "/", 
  passport.authenticate("jwt", { session: false }), 
  getCart
);

// @route   POST /cart/validate
// @desc    Validate cart items for availability and quantity
// @access  Public
router.post(
  "/validate", 
  validateCartItems
);

// @route   POST /cart/updateQuantities
// @desc    Update product quantities after purchase
// @access  Public
router.post(
  '/updateQuantities', 
  updateProductQuantities
);


module.exports = router;
