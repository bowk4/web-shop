const mobileProducts = require("../models/BrandNews");
const isValidMongoId = require("../validation/isValidMongoId");

const uniqueRandom = require("unique-random");
const rand = uniqueRandom(0, 999999);

const queryCreator = require("../commonHelpers/queryCreator");
const filterParser = require("../commonHelpers/filterParser");
const _ = require("lodash");
const MobileModel = require("../models/MobileModel");
const MobileProduct = require("../models/MobileProduct");

// exports.addImages = (req, res, next) => {
//   if (req.files.length > 0) {
//     res.json({
//       message: "Photos are received"
//     });
//   } else {
//     res.json({
//       message:
//         "Something wrong with receiving photos at server. Please, check the path folder"
//     });
//   }
// };

exports.addMobileProduct = (req, res, next) => {
    const mobileProductFields = _.cloneDeep(req.body);

    mobileProductFields.itemNo = rand();

    // try {
    //   mobileProductFields.name = mobileProductFields.name
    //     .toLowerCase()
    //     .trim()
    //     .replace(/\s\s+/g, " ");
    //
    // } catch (err) {
    //   res.status(400).json({
    //     message: `Error happened on server: "${err}" `
    //   });
    // }

    const updatedMobileProduct = queryCreator(mobileProductFields);

    const newMobileProduct = new mobileProducts(updatedMobileProduct);

    newMobileProduct
        .save()
        .then(mobileProduct => res.json(mobileProduct))
        .catch(err =>
            res.status(400).json({
                message: `Error happened on server: "${err}" `,
            }),
        );
};

exports.updateMobileProduct = (req, res, next) => {
    const { id } = req.params;
    const { discount } = req.body;

    mobileProducts.findOne({ id })
        .then(mobileProduct => {
            if (!mobileProduct) {
                return res.status(400).json({
                    message: `mobileProduct with id "${id}" is not found.`,
                });
            } else {
                // const mobileProductFields = _.cloneDeep(req.body);

                // try {
                //   mobileProductFields.name = mobileProductFields.name
                //     .toLowerCase()
                //     .trim()
                //     .replace(/\s\s+/g, " ");
                // } catch (err) {
                //   res.status(400).json({
                //     message: `Error happened on server: "${err}" `
                //   });
                // }

                // const updatedMobileProduct = queryCreator(mobileProductFields);

                MobileModel.findOneAndUpdate(
                    { id: mobileProduct.refModel.modelId },
                    { $set: { "colors.$[color].capacities.$[capacity].discount": discount } },
                    {
                        arrayFilters: [{ "color.capacities.productId": id }, { "capacity.productId": id }],
                        new: true,
                    },
                ).then(mobModel => {
                    console.log(mobModel);
                });

                MobileProduct.findOneAndUpdate(
                    { id: id },
                    { $set: { discount: discount } },
                    { new: true },
                )
                    .then(mobileProduct => res.json(mobileProduct))
                    .catch(err =>
                        res.status(400).json({
                            message: `Error happened on server: "${err}" `,
                        }),
                    );

            }
        })
        .catch(err =>
            res.status(400).json({
                message: `Error happened on server: "${err}" `,
            }),
        );
};

exports.getMobileProducts = async (req, res, next) => {

    const mongooseQuery = filterParser(req.query);
    const perPage = Number(req.query.perPage);
    const startPage = Number(req.query.startPage);

    const sort = req.query.sort;
    
    const q = typeof req.query.q === "string" ? req.query.q.trim() : null;

    if (q) {
        mongooseQuery.name = {
            $regex: new RegExp(q, "i"),
        };
    }

    try {
        const foundMobileProducts = await mobileProducts.find(mongooseQuery)
            .sort({ available: -1 })
            .sort(sort)
            .skip(startPage * perPage - perPage)
            .limit(perPage)
        // .sort({ available: -1 })
        // .sort(sort)

        const totalMatching = foundMobileProducts.length;

        const total = await mobileProducts.countDocuments(mongooseQuery);
        // const totalMatching = foundMobileProducts.length;
        const totalPages = Math.ceil(total / perPage);

        res.json({ data: foundMobileProducts, total, totalMatching, totalPages });
    } catch (err) {
        res.status(400).json({
            message: `Error happened on server: "${err}" `,
        });
    }
};

exports.getMobileProductsTotal = async (req, res, next) => {
    const mongooseQuery = filterParser(req.query);
    const q = typeof req.query.q === "string" ? req.query.q.trim() : null;

    if (q) {
        mongooseQuery.name = {
            $regex: new RegExp(q, "i"),
        };
    }

    try {
        const total = await mobileProducts.countDocuments(mongooseQuery);

        res.json({ data: foundMobileProducts, total });
    } catch (err) {
        res.status(400).json({
            message: `Error happened on server: "${err}" `,
        });
    }
};

exports.getMobileProductsTotal = async (req, res, next) => {
    const mongooseQuery = filterParser(req.query);
    const q = typeof req.query.q === "string" ? req.query.q.trim() : null;

    if (q) {
        mongooseQuery.name = {
            $regex: new RegExp(q, "i"),
        };
    }

    try {
        const total = await mobileProducts.countDocuments(mongooseQuery);

        res.json({ total });
    } catch (err) {
        res.status(400).json({
            message: `Error happened on server: "${err}" `,
        });
    }
};

exports.getMobileProductById = (req, res, next) => {
    const { id } = req.params;

    if (!isValidMongoId(id)) {
        return res.status(400).json({
            message: `Product with id "${id}" is not valid`,
        });
    }
    mobileProducts.findById(id)
        .then(product => {
            if (!product) {
                res.status(400).json({
                    message: `Product with itemNo ${req.params.itemNo} is not found`,
                });
            } else {
                res.json(product);
            }
        })
        .catch(err =>
            res.status(400).json({
                message: `Error happened on server: "${err}" `,
            }),
        );
};

exports.getMobileProductByCustomId = (req, res, next) => {
    const { id } = req.params;

    mobileProducts.findOne({ id })
        .then(product => {
            if (!product) {
                return res.status(404).json({
                    message: `Product with productId ${id} is not found`,
                });
            }
            res.json(product);
        })
        .catch(err => res.status(500).json({
            message: `Error happened on server: "${err}"`,
        }));
};


