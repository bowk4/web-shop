const express = require("express");
const router = express.Router();
const passport = require("passport");
const multer = require("multer");
const fse = require("fs-extra");

// Import controllers
const {
    addAccessoryProduct,
    updateAccessoryProduct,
    getAccessoryProducts,
    getAccessoryProductById,
    getAccessoryProductsTotal,
    getAccessoryProductByCustomId,
    getAdminAccessoryProducts,
} = require("../controllers/accessoriesProduct");


const storage = multer.diskStorage({

    destination: function(req, file, cb) {
        var newDestination = req.headers.path;
        fse.mkdirsSync(newDestination);
        cb(null, newDestination);
    },

    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

const fileFilter = (req, file, cb) => {

    if (
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg"
    ) {
        cb(null, true);
    } else {

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

// @route   POST /accessoriesProducts
// @desc    Create new accessory product
// @access  Private
router.post(
    "/",
    passport.authenticate("jwt-admin", { session: false }),
    upload.single("picture"),
    addAccessoryProduct
);

// @route   PUT /accessoriesProducts/:id
// @desc    Update existing accessory product
// @access  Private
router.put(
    "/:id",
    passport.authenticate("jwt-admin", { session: false }),
    upload.single("picture"),
    updateAccessoryProduct
);

// @route   GET /accessoriesProducts
// @desc    GET existing accessory products
// @access  Public
router.get("/", getAccessoryProducts);

router.get("/admin", getAdminAccessoryProducts);

router.get("/total", getAccessoryProductsTotal);

// @route   GET /accessoriesProducts/:id
// @desc    GET existing accessory product by id
// @access  Public
router.get("/:id", getAccessoryProductById);

// @route   GET /mobileProducts/byProductId/:productId
// @desc    GET existing mobileProduct by custom productId
// @access  Public
router.get("/byProductId/:id", getAccessoryProductByCustomId);

module.exports = router;
