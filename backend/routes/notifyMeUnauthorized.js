const express = require("express");
const router = express.Router();
const passport = require("passport");

const {
  addProductToNotifyMeUnauthorized,
  deleteProductToNotifyMeUnauthorized
} = require("../controllers/notifyMeUnauthorized");

router.post(
  "/",
  addProductToNotifyMeUnauthorized
);

router.get(
  "/:category",
  passport.authenticate("jwt-admin", { session: false }),
);

router.delete(
  "/:productId",
  passport.authenticate("jwt-admin", { session: false }),
  deleteProductToNotifyMeUnauthorized
);

module.exports = router;
