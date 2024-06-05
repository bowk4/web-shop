const express = require("express");
const router = express.Router();
const passport = require("passport");

const {
  addProductToNotifyMeAuthorized,
  getProductByCategoryToNotifyMeAuthorized,
  deleteProductToNotifyMeAuthorized
} = require("../controllers/notifyMeAuthorized");

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  addProductToNotifyMeAuthorized
);

router.get(
  "/:category",
  passport.authenticate("jwt-admin", { session: false }),
  getProductByCategoryToNotifyMeAuthorized
);

router.delete(
  "/:productId",
  passport.authenticate("jwt-admin", { session: false }),
  deleteProductToNotifyMeAuthorized
);

module.exports = router;
