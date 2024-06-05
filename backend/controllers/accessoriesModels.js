const isValidMongoId = require("../validation/isValidMongoId");
const uniqueRandom = require("unique-random");
const rand = uniqueRandom(0, 999999);
const queryCreator = require("../commonHelpers/queryCreator");
const filterParser = require("../commonHelpers/filterParser");
const _ = require("lodash");

const accessoriesModels = require("../models/AccessoriesModels");

exports.addAccessoryModel = (req, res, next) => {
    const accessoryModelFields = _.cloneDeep(req.body);
    accessoryModelFields.itemNo = rand();

    const updatedAccessoryModel = queryCreator(accessoryModelFields);
    const newAccessoryModel = new accessoriesModels(updatedAccessoryModel);

    newAccessoryModel
        .save()
        .then(accessoryModel => res.json(accessoryModel))
        .catch(err =>
            res.status(400).json({
                message: `Error happened on server: "${err}" `
            })
        );
};

exports.updateAccessoryModel = (req, res, next) => {
    const { id } = req.params;
    if (!isValidMongoId(id)) {
        return res.status(400).json({
            message: `Accessory model with id "${id}" is not valid`
        });
    }

    accessoriesModels.findById(id)
        .then(accessoryModel => {
            if (!accessoryModel) {
                return res.status(400).json({
                    message: `Accessory model with id "${id}" is not found.`
                });
            } else {
                const accessoryModelFields = _.cloneDeep(req.body);
                const updatedAccessoryModel = queryCreator(accessoryModelFields);

                accessoriesModels.findOneAndUpdate(
                    { _id: id },
                    { $set: updatedAccessoryModel },
                    { new: true }
                )
                    .then(accessoryModel => res.json(accessoryModel))
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

exports.getAccessoryModels = async (req, res, next) => {
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
        const foundAccessoryModels = await accessoriesModels.find(mongooseQuery)
            .skip(startPage * perPage - perPage)
            .limit(perPage)
            .sort(sort);

        const total = await accessoriesModels.countDocuments(mongooseQuery);

        res.json({ data: foundAccessoryModels, total });
    } catch (err) {
        res.status(400).json({
            message: `Error happened on server: "${err}" `
        });
    }
};

// exports.getAccessoryModelById = (req, res, next) => {
//     const { name } = req.params;
//
//     console.log("name:", name)
//     accessoriesModels.findOne({ name: name })
//         .then(accessoryModel => {
//             console.log("TRIPLE IF:", accessoryModel)
//
//             if (!accessoryModel) {
//                 console.log("DOBULE IF:", accessoryModel)
//
//                 res.status(400).json({
//                     message: `Accessory model with id ${name} is not found`
//                 });
//             } else {
//                 console.log("ELSE IF:", accessoryModel)
//
//                 res.json(accessoryModel);
//             }
//         })
//         .catch(err =>
//             res.status(400).json({
//                 message: `Error happened on server: "${err}" `
//             })
//         );
// };
exports.getAccessoryModelById = (req, res, next) => {
    const { name } = req.params;
    
    accessoriesModels.findOne({ name: name })
        .then(accessoryModel => {

            if (!accessoryModel) {

                return res.status(400).json({
                    message: `Accessory model with name "${name}" is not found`
                });
            }
            res.json(accessoryModel);

        })
        .catch(err =>
            res.status(400).json({
                message: `Error happened on server: "${err}" `
            })
        );
};
