const express = require("express");
const router = express.Router();
const passport = require("passport");
const multer = require("multer"); // multer for parsing multipart form data (files)
const fse = require("fs-extra");

//Import controllers
const {
  addTabletModel,
  updateTabletModel,
  getTabletModels,
  getTabletModelById,
} = require("../controllers/tabletModels");

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
// // @route   POST /tabletModels/images
// // @desc    Add images
// // @access  Private
// router.post(
//   "/images",
//   passport.authenticate("jwt-admin", { session: false }),
//   upload.array("photos"),
//   addImages
// );

// @route   POST /tabletModels
// @desc    Create new tabletModel
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt-admin", { session: false }),
  addTabletModel
);

// @route   PUT /tabletModels/:id
// @desc    Update existing product
// @access  Private
router.put(
  "/:id",
  passport.authenticate("jwt-admin", { session: false }),
  updateTabletModel
);

// @route   GET /tabletModels
// @desc    GET existing tabletModels
// @access  Public
router.get("/", getTabletModels);

// @route   GET /tabletModels/:id
// @desc    GET existing tabletModel by id
// @access  Public
router.get("/:id", getTabletModelById);

module.exports = router;
