const express = require("express");
const router = express.Router();
const passport = require("passport");
const multer = require("multer"); // multer for parsing multipart form data (files)
const fse = require("fs-extra");

//Import controllers
const {
  addMobileProduct,
  updateMobileProduct,
  getMobileProducts,
  getAdminMobileProducts,
  getMobileProductById,
  getMobileProductsTotal,
  getMobileProductByCustomId,
} = require("../controllers/mobileProducts");

// Configurations for multer
const storage = multer.diskStorage({
  // Destination, where files should be stored (image url)
  destination: function(req, file, cb) {
    var newDestination = req.headers.path; // We send image url in header ("path"), when making axios request
    fse.mkdirsSync(newDestination); // We're creating folder in destination, specified in headers "path"
    cb(null, newDestination); // Saving file
  },

  filename: function(req, file, cb) {
    cb(null, file.originalname); // We accept original file-name
  }
});

const fileFilter = (req, file, cb) => {
  // Accept file (only jpeg/jpg/png)
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    // reject file (if not jpeg/jpg/png)
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 3 // Max size 5MB
  },
  fileFilter: fileFilter
});
//
// // @route   POST /mobileProducts/images
// // @desc    Add images
// // @access  Private
// router.post(
//   "/images",
//   passport.authenticate("jwt-admin", { session: false }),
//   upload.array("photos"),
//   addImages
// );

// @route   POST /mobileProducts
// @desc    Create new mobileProduct
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt-admin", { session: false }),
  addMobileProduct
);

// @route   PUT /mobileProducts/:id
// @desc    Update existing product
// @access  Private
router.put(
  "/:id",
  passport.authenticate("jwt-admin", { session: false }),
  updateMobileProduct
);

// @route   GET /mobileProducts
// @desc    GET existing mobileProducts
// @access  Public
router.get("/", getMobileProducts);

router.get("/admin", getAdminMobileProducts);

router.get("/total", getMobileProductsTotal);

// @route   GET /mobileProducts/:id
// @desc    GET existing mobileProduct by id
// @access  Public
router.get("/:id", getMobileProductById);

// @route   GET /mobileProducts/byProductId/:productId
// @desc    GET existing mobileProduct by custom productId
// @access  Public
router.get("/byProductId/:id", getMobileProductByCustomId);

module.exports = router;
