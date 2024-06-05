const express = require("express");
const router = express.Router();
const passport = require("passport");
const multer = require("multer"); // multer for parsing multipart form data (files)
const fse = require("fs-extra");
const { addMobileProduct, updateMobileProduct } = require("../controllers/salePoints");

//Import controllers
const {
  getSalePoint,
  addSalePoint,
  updateSalePoint,
  deleteSalePoint
} = require("../controllers/salePoints");

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

router.get("/", getSalePoint);
router.post("/", passport.authenticate("jwt-admin", { session: false }),
  addSalePoint
);
// router.put("/:id", passport.authenticate("jwt-admin", { session: false }),
//   updateSalePoint
// );
// router.delete("/:id", passport.authenticate("jwt-admin", { session: false }),
//  deleteSalePoint
// );

module.exports = router;