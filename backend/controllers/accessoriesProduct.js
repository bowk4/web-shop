const accessoriesProducts = require("../models/AccessoriesProducts");
const isValidMongoId = require("../validation/isValidMongoId");
const uniqueRandom = require("unique-random");
const rand = uniqueRandom(0, 999999);
const queryCreator = require("../commonHelpers/queryCreator");
const filterParser = require("../commonHelpers/filterParser");
const _ = require("lodash");
const AccessoriesModelQuantity = require("../models/AccessoriesModelQuantity");



exports.addAccessoryProduct = (req, res, next) => {
    const accessoryProductFields = _.cloneDeep(req.body);
    accessoryProductFields.itemNo = rand();

    const updatedAccessoryProduct = queryCreator(accessoryProductFields);
    const newAccessoryProduct = new accessoriesProducts(updatedAccessoryProduct);

    newAccessoryProduct
        .save()
        .then(accessoryProduct => res.json(accessoryProduct))
        .catch(err =>
            res.status(400).json({
                message: `Error happened on server: "${err}" `
            })
        );
};

exports.updateAccessoryProduct = (req, res, next) => {
    const { id } = req.params;
    if (!isValidMongoId(id)) {
        return res.status(400).json({
            message: `Accessory product with id "${id}" is not valid`
        });
    }

    accessoriesProducts.findById(id)
        .then(accessoryProduct => {
            if (!accessoryProduct) {
                return res.status(400).json({
                    message: `Accessory product with id "${id}" is not found.`
                });
            } else {
                const accessoryProductFields = _.cloneDeep(req.body);
                const updatedAccessoryProduct = queryCreator(accessoryProductFields);

                accessoriesProducts.findOneAndUpdate(
                    { _id: id },
                    { $set: updatedAccessoryProduct },
                    { new: true }
                )
                    .then(accessoryProduct => res.json(accessoryProduct))
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

exports.getAccessoryProducts = async (req, res, next) => {
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
        const foundAccessoryProducts = await accessoriesProducts.find(mongooseQuery)
            .skip(startPage * perPage - perPage)
            .limit(perPage)
            .sort(sort);
        const total = await accessoriesProducts.countDocuments(mongooseQuery);

        res.json({ data: foundAccessoryProducts, total });
    } catch (err) {
        res.status(400).json({
            message: `Error happened on server: "${err}" `
        });
    }
};

exports.getAdminAccessoryProducts = async (req, res, next) => {
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
        const foundAccessoryProducts = await accessoriesProducts.find(mongooseQuery)
          .sort({ available: -1 })
          .sort(sort)
          .skip(startPage * perPage - perPage)
          .limit(perPage);

        const productNames = foundAccessoryProducts.map(product => product.name);
       
        const quantities = await AccessoriesModelQuantity.find({ productName: { $in: productNames } });
        

        const productsWithQuantity = foundAccessoryProducts.map(product => {
        const quantityData = quantities.find(qty => qty.productName === product.name);
        const quantity = quantityData ? quantityData.quantity : 0;
        return { ...product.toObject(), quantity };
      });



        res.json({ data: productsWithQuantity });
    } catch (err) {
        res.status(400).json({
            message: `Error happened on server: "${err}" `
        });
    }
};

exports.getAccessoryProductsTotal = async (req, res, next) => {
  const mongooseQuery = filterParser(req.query);
  const q = typeof req.query.q === 'string' ? req.query.q.trim() : null;

  if (q) {
    mongooseQuery.name = {
      $regex: new RegExp(q, "i"),
    };
  }

  try {
    const total = await accessoriesProducts.countDocuments(mongooseQuery);

    res.json({ total });
  } catch (err) {
    res.status(400).json({
      message: `Error happened on server: "${err}" `,
    });
  }
};

exports.getAccessoryProductById = (req, res, next) => {
    const { id } = req.params;
    if (!isValidMongoId(id)) {
        return res.status(400).json({
            message: `Accessory product with id "${id}" is not valid`
        });
    }
    accessoriesProducts.findById(id)
        .then(accessoryProduct => {
            if (!accessoryProduct) {
                res.status(400).json({
                    message: `Accessory product with id ${id} is not found`
                });
            } else {
                res.json(accessoryProduct);
            }
        })
        .catch(err =>
            res.status(400).json({
                message: `Error happened on server: "${err}" `
            })
        );
};

exports.getAccessoryProductByCustomId = (req, res, next) => {
    const { id } = req.params;

    accessoriesProducts.findOne({ id })
      .then(product => {
        if (!product) {
          return res.status(404).json({
            message: `Product with productId ${id} is not found`
          });
        }
        res.json(product);
      })
      .catch(err => res.status(500).json({
        message: `Error happened on server: "${err}"`
      }));
  };