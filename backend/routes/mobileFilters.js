const express = require("express");
const router = express.Router();
const passport = require("passport"); // multer for parsing multipart form data (files)

//Import controllers
const {
  addMobileFilter,
  updateMobileFilter,
  deleteMobileFilter,
  getMobileFilters,
  getMobileFiltersByType
} = require("../controllers/mobileFilters");

// @route   POST /mobileFilters
// @desc    Create new filter
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt-admin", { session: false }),
  addMobileFilter
);

// @route   PUT /mobileFilters/:id
// @desc    Update existing filter
// @access  Private
router.put(
  "/:id",
  passport.authenticate("jwt-admin", { session: false }),
  updateMobileFilter
);

// @route   DELETE /mobileFilters/:id
// @desc    DELETE existing filter
// @access  Private
router.delete(
  "/:id",
  passport.authenticate("jwt-admin", { session: false }),
  deleteMobileFilter
);

// @route   GET /mobileFilters
// @desc    GET existing filters
// @access  Public
router.get("/", getMobileFilters);

// @route   GET /mobileFilters/:type
// @desc    GET existing filters by "type" field
// @access  Public
router.get("/:type", getMobileFiltersByType);

module.exports = router;
