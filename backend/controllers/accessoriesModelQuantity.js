const accessoriesModelsQuantity = require("../models/AccessoriesModelQuantity");
const AccessoriesModel = require("../models/AccessoriesModels");
const AccessoriesProduct = require("../models/AccessoriesProducts");
const uniqueRandom = require("unique-random");
const rand = uniqueRandom(0, 999999);

const queryCreator = require("../commonHelpers/queryCreator");
const filterParser = require("../commonHelpers/filterParser");
const _ = require("lodash");
const { login } = require("passport/lib/http/request");
const sendNotificationToSubscribers = require("../commonHelpers/sendNotificationToSubscribers");
const sendNotificationToNotRegisteredSubscribers = require("../commonHelpers/sendNotificationToNotRegisteredSubscribers");


exports.addAccessoriesModelQuantity = (req, res, next) => {
  const accessoriesModelQuantityFields = _.cloneDeep(req.body);

  accessoriesModelQuantityFields.itemNo = rand();

  // try {
  //   accessoriesModelQuantityFields.name = accessoriesModelQuantityFields.name
  //     .toLowerCase()
  //     .trim()
  //     .replace(/\s\s+/g, " ");
  //
  // } catch (err) {
  //   res.status(400).json({
  //     message: `Error happened on server: "${err}" `
  //   });
  // }

  const updatedAccessoriesModelQuantity = queryCreator(accessoriesModelQuantityFields);

  const newAccessoriesModelQuantity = new accessoriesModelsQuantity(updatedAccessoriesModelQuantity);

  newAccessoriesModelQuantity
    .save()
    .then(accessoriesModelQuantity => res.json(accessoriesModelQuantity))
    .catch(err =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `,
      }),
    );
};
const updateAccessoriesModelQuantity = async (req, res, next) => {
  const { productName } = req.params;
  const { quantity } = req.body;

  let notificationMessageSubscribers = "Accessory is available";
  let notificationMessageUnauthorized = "Accessory is available";

  try {
    const accessoriesModelQuantity = await accessoriesModelsQuantity.findOne({ productName });

    if (!accessoriesModelQuantity) {
      return res.status(400).json({
        message: `accessoriesModelQuantity with productName "${productName}" is not found.`,
      });
    }

    let newQuantity = accessoriesModelQuantity.quantity + quantity;

    if (newQuantity < 0) {
      return res.status(400).json({
        message: "Insufficient quantity.",
      });
    }

    if (newQuantity === 0) {
      await Promise.all([
        AccessoriesModel.findOneAndUpdate(
          { name: productName },
          { $set: { available: false } },
          { new: true }
        ),
        AccessoriesProduct.findOneAndUpdate(
          { name: productName },
          { $set: { available: false } },
          { new: true }
        )
      ]);
    }

    if (accessoriesModelQuantity.quantity === 0 && newQuantity > 0) {
      notificationMessageSubscribers = await sendNotificationToSubscribers({ id: productName, category: 'accessories' });
      notificationMessageUnauthorized = await sendNotificationToNotRegisteredSubscribers({ id: productName, category: 'accessories' });

      await Promise.all([
        AccessoriesModel.findOneAndUpdate(
          { name: productName },
          { $set: { available: true } },
          { new: true }
        ),
        AccessoriesProduct.findOneAndUpdate(
          { name: productName },
          { $set: { available: true } },
          { new: true }
        )
      ]);
    }

    const updatedModelQuantity = await accessoriesModelsQuantity.findOneAndUpdate(
      { productName: productName },
      { $set: { quantity: newQuantity } },
      { new: true }
    );

    const responseData = {
      updatedModelQuantity,
      notificationMessageSubscribers,
      notificationMessageUnauthorized,
    };

    res.json(responseData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: `Error happened on server: "${err}"` });
  }
};


exports.updateAccessoriesModelQuantityAsAdmin = (req, res, next) => {
  updateAccessoriesModelQuantity(req, res, next);
};

exports.updateAccessoriesModelQuantityCheckout = (req, res, next) => {
  updateAccessoriesModelQuantity(req, res, next);
};

exports.getAccessoriesModelsQuantity = async (req, res, next) => {
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
    const foundAccessoriesModelsQuantity = await accessoriesModelsQuantity.find(mongooseQuery)
      .skip(startPage * perPage - perPage)
      .limit(perPage)
      .sort(sort);

    const total = await accessoriesModelsQuantity.countDocuments(mongooseQuery);

    res.json({ data: foundAccessoriesModelsQuantity, total });
  } catch (err) {
    res.status(400).json({
      message: `Error happened on server: "${err}" `,
    });
  }
};

exports.getAccessoriesModelsQuantityById = (req, res, next) => {
  const { productName } = req.params;

  accessoriesModelsQuantity.findOne({ productName: productName })
    .then(accessoriesModelQuantity => {
      if (!accessoriesModelQuantity) {
        res.status(400).json({
          message: `accessoriesModelQuantity with productName: ${productName} is not found`,
        });
      } else {
        res.json(accessoriesModelQuantity);
      }
    })
    .catch(err =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `,
      }),
    );
};


