const express = require("express");
const router = express.Router();
const passport = require("passport");
const multer = require("multer");
const fse = require("fs-extra");

// Import controllers
const {
    addAdvertisingSlider,
    updateAdvertisingSlider,
    getAdvertisingSliders,
    getAdvertisingSliderById,
} = require("../controllers/advertisingSlider");


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

// @route   POST /advertisingSliders
// @desc    Create new advertising slider
// @access  Private
router.post(
    "/",
    passport.authenticate("jwt-admin", { session: false }),
    upload.single("picture"),
    addAdvertisingSlider
);

// @route   PUT /advertisingSliders/:id
// @desc    Update existing advertising slider
// @access  Private
router.put(
    "/:id",
    passport.authenticate("jwt-admin", { session: false }),
    upload.single("picture"),
    updateAdvertisingSlider
);

// @route   GET /advertisingSliders
// @desc    GET existing advertising sliders
// @access  Public
router.get("/", getAdvertisingSliders);

// @route   GET /advertisingSliders/:id
// @desc    GET existing advertising slider by id
// @access  Public
router.get("/:id", getAdvertisingSliderById);

module.exports = router;
