const mobileModelsQuantity = require("../models/MobileModelQuantity");
const uniqueRandom = require("unique-random");
const rand = uniqueRandom(0, 999999);
const queryCreator = require("../commonHelpers/queryCreator");
const filterParser = require("../commonHelpers/filterParser");
const MobileModel = require("../models/MobileModel");
const MobileProduct = require("../models/MobileProduct");

const sendNotificationToSubscribers = require("../commonHelpers/sendNotificationToSubscribers");
const sendNotificationToNotRegisteredSubscribers = require("../commonHelpers/sendNotificationToNotRegisteredSubscribers");


exports.addMobileModelQuantity = (req, res, next) => {
  const mobileModelQuantityFields = _.cloneDeep(req.body);

  mobileModelQuantityFields.itemNo = rand();

  const updatedMobileModelQuantity = queryCreator(mobileModelQuantityFields);

  const newMobileModelQuantity = new MobileModelQuantity(updatedMobileModelQuantity);

  newMobileModelQuantity
    .save()
    .then(mobileModelQuantity => res.json(mobileModelQuantity))
    .catch(err =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `
      })
    );
};

const updateMobileModelQuantity = async (req, res, next) => {
  const { productId } = req.params;
  const { quantity } = req.body;

  let notificationMessageSubscribers = 'Phone is available';
  let notificationMessageUnauthorized = "Phone is available";

  try {
    const mobileModelQuantity = await mobileModelsQuantity.findOne({ productId });

    if (!mobileModelQuantity) {
      return res.status(400).json({
        message: `mobileModelQuantity with id "${productId}" is not found.`
      });
    }

    let newQuantity = mobileModelQuantity.quantity + quantity;

    if (newQuantity < 0) {
      return res.status(400).json({
        message: "Insufficient quantity.",
      });
    }

    if (newQuantity === 0) {
      await Promise.all([
        MobileModel.findOneAndUpdate(
          { id: mobileModelQuantity.refModel },
          { $set: { "colors.$[color].capacities.$[capacity].available": false } },
          {
            arrayFilters: [{ "color.capacities.productId": productId }, { "capacity.productId": productId }],
            new: true,
          }
        ),
        MobileProduct.findOneAndUpdate(
          { id: productId },
          { $set: { available: false } },
          { new: true }
        )
      ]);
    }

    if (mobileModelQuantity.quantity === 0 && newQuantity > 0) {
      notificationMessageSubscribers = await sendNotificationToSubscribers({ id: productId, category: 'phones' });
      notificationMessageUnauthorized = await sendNotificationToNotRegisteredSubscribers({ id: productId, category: 'phones' });


      await Promise.all([
        MobileModel.findOneAndUpdate(
          { id: mobileModelQuantity.refModel },
          { $set: { "colors.$[color].capacities.$[capacity].available": true } },
          {
            arrayFilters: [{ "color.capacities.productId": productId }, { "capacity.productId": productId }],
            new: true
          }
        ),
        MobileProduct.findOneAndUpdate(
          { id: productId },
          { $set: { available: true } },
          { new: true }
        )
      ]);
    }

    const updatedModelQuantity = await mobileModelsQuantity.findOneAndUpdate(
      { productId: productId },
      { $set: { quantity: newQuantity } },
      { new: true }
    );

    const responseData = {
      updatedModelQuantity,
      notificationMessageSubscribers,
      notificationMessageUnauthorized
    }

    res.json(responseData);
  } catch (err) {
    res.status(500).json({ message: `Error happened on server: "${err}"` });
  }
};

exports.updateMobileModelQuantityAsAdmin = (req, res, next) => {
  updateMobileModelQuantity(req, res, next);
};

exports.updateMobileModelQuantityCheckout = (req, res, next) => {
  updateMobileModelQuantity(req, res, next);
};

exports.getMobileModelsQuantity = async (req, res, next) => {
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
    const foundMobileModelsQuantity = await mobileModelsQuantity.find(mongooseQuery)
      .skip(startPage * perPage - perPage)
      .limit(perPage)
      .sort(sort);

    const total = await mobileModelsQuantity.countDocuments(mongooseQuery);

    res.json({ data: foundMobileModelsQuantity, total });
  } catch (err) {
    res.status(400).json({
      message: `Error happened on server: "${err}" `
    });
  }
};

exports.getMobileModelsQuantityById = (req, res, next) => {
  const { id } = req.params;
  // if (!isValidMongoId(id)) {
  //   console.log('I am still here?');
  //   return res.status(400).json({
  //     message: `mobileModelQuantity with id "${id}" is not valid`
  //   });
  // }
  // mobileModelsQuantity.findById(id)
  mobileModelsQuantity.findOne({id: id})
    .then(mobileModelQuantity => {
      if (!mobileModelQuantity) {
        res.status(400).json({
        });
      } else {
        res.json(mobileModelQuantity);
      }
    })
    .catch(err =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `
      })
    );
};


