const advertisingSlider = require("../models/AdvertisingSlider");
const isValidMongoId = require("../validation/isValidMongoId");
const uniqueRandom = require("unique-random");
const rand = uniqueRandom(0, 999999);
const queryCreator = require("../commonHelpers/queryCreator");
const filterParser = require("../commonHelpers/filterParser");
const _ = require("lodash");


exports.addAdvertisingSlider = (req, res, next) => {
    const mobileModelFields = _.cloneDeep(req.body);

    mobileModelFields.itemNo = rand();

    const updatedMobileModel = queryCreator(mobileModelFields);

    const newMobileModel = new advertisingSlider(updatedMobileModel);

    newMobileModel
        .save()
        .then(mobileModel => res.json(advertisingSlider))
        .catch(err =>
            res.status(400).json({
                message: `Error happened on server: "${err}" `
            })
        );
};


exports.updateAdvertisingSlider = (req, res, next) => {
    const { id } = req.params;
    if (!isValidMongoId(id)) {
        return res.status(400).json({
            message: `mobileModel with id "${id}" is not valid`
        });
    }

    advertisingSlider.findById(id)
        .then(advertisingSlider => {
            if (!advertisingSlider) {
                return res.status(400).json({
                    message: `mobileModel with id "${req.params.id}" is not found.`
                });
            } else {
                const mobileModelFields = _.cloneDeep(req.body);

                const updatedMobileModel = queryCreator(mobileModelFields);

                advertisingSlider.findOneAndUpdate(
                    { _id: req.params.id },
                    { $set: updatedMobileModel },
                    { new: true }
                )
                    .then(mobileModel => res.json(advertisingSlider))
                    .catch(err =>
                        res.status(400).json({
                            message: `Error happened on server: "${err}" `
                        })
                    );
            }
        })
        .catch(err =>
            res.status(400).json({
                message: `Error happened on server: "${err}" `
            })
        );
};


// exports.getAdvertisingSliders = async (req, res, next) => {
//     try {
//         const sliders = await advertisingSlider.findOne({id: 2});
//         res.json(sliders);
//
//         console.log(sliders)
//     } catch (error) {
//         console.error("Error fetching advertising sliders:", error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// };
exports.getAdvertisingSliders = async (req, res, next) => {
    const mongooseQuery = filterParser(req.query);
    const perPage = Number(req.query.perPage);
    const startPage = Number(req.query.startPage);
    const sort = req.query.sort;
    const q = typeof req.query.q === "string" ? req.query.q.trim() : null;


    if (q) {
        mongooseQuery.name = {
            $regex: new RegExp(q, "i")
        };
    }

    try {
        const foundMobileModels = await advertisingSlider.find(mongooseQuery)
            .skip(startPage * perPage - perPage)
            .limit(perPage)
            .sort(sort);

        const total = await advertisingSlider.countDocuments(mongooseQuery);

        res.json({ data: foundMobileModels, total });
    } catch (err) {
        res.status(400).json({
            message: `Error happened on server: "${err}" `
        });
    }
};

exports.getAdvertisingSliderById = (req, res, next) => {
    const { id } = req.params;

    advertisingSlider.findById(id)
        .then(advertisingSlider => {
            if (!advertisingSlider) {
                return res.status(404).json({
                    message: `Mobile model with id ${id} is not found`
                });
            }
            res.json(advertisingSlider);
        })
        .catch(err => {
            console.error("Error happened on server:", err);
            res.status(500).json({
                message: `Error happened on server: "${err}" `
            });
        });
};



