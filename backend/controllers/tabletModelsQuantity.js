const tabletModelsQuantity = require("../models/TabletModelQuantity");
const TabletModel = require("../models/TabletModel");
const TabletProduct = require("../models/TabletProduct");
const uniqueRandom = require("unique-random");
const rand = uniqueRandom(0, 999999);

const queryCreator = require("../commonHelpers/queryCreator");
const filterParser = require("../commonHelpers/filterParser");
const _ = require("lodash");
const { login } = require("passport/lib/http/request");
const sendNotificationToSubscribers = require("../commonHelpers/sendNotificationToSubscribers");
const sendNotificationToNotRegisteredSubscribers = require("../commonHelpers/sendNotificationToNotRegisteredSubscribers");

exports.addTabletModelQuantity = (req, res, next) => {
  const tabletModelQuantityFields = _.cloneDeep(req.body);

  tabletModelQuantityFields.itemNo = rand();

  const updatedTabletModelQuantity = queryCreator(tabletModelQuantityFields);

  const newTabletModelQuantity = new tabletModelsQuantity(updatedTabletModelQuantity);

  newTabletModelQuantity
    .save()
    .then(tabletModelQuantity => res.json(tabletModelQuantity))
    .catch(err =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `,
      }),
    );
};

const updateTabletModelQuantity = async (req, res, next) => {
  const { productId } = req.params;
  const { quantity } = req.body;

  let notificationMessageSubscribers = "Tablet is available";
  let notificationMessageUnauthorized = "Tablet is available";

  try {
    const tabletModelQuantity = await tabletModelsQuantity.findOne({ productId });

    if (!tabletModelQuantity) {
      return res.status(400).json({
        message: `tabletModelQuantity with id "${productId}" is not found.`,
      });
    }

    let newQuantity = tabletModelQuantity.quantity + quantity;

    if (newQuantity < 0) {
      return res.status(400).json({
        message: "Insufficient quantity.",
      });
    }

    if (newQuantity === 0) {
      await Promise.all([
        TabletModel.findOneAndUpdate(
          { id: tabletModelQuantity.refModel },
          { $set: { "colors.$[color].capacities.$[capacity].available": false } },
          {
            arrayFilters: [{ "color.capacities.productId": productId }, { "capacity.productId": productId }],
            new: true,
          }
        ),
        TabletProduct.findOneAndUpdate(
          { id: productId },
          { $set: { available: false } },
          { new: true }
        )
      ]);
    }

    if (tabletModelQuantity.quantity === 0 && newQuantity > 0) {
      notificationMessageSubscribers = await sendNotificationToSubscribers({ id: productId, category: 'tablets' });
      notificationMessageUnauthorized = await sendNotificationToNotRegisteredSubscribers({ id: productId, category: 'tablets' });

      await Promise.all([
        TabletModel.findOneAndUpdate(
          { id: tabletModelQuantity.refModel },
          { $set: { "colors.$[color].capacities.$[capacity].available": true } },
          {
            arrayFilters: [{ "color.capacities.productId": productId }, { "capacity.productId": productId }],
            new: true
          }
        ),
        TabletProduct.findOneAndUpdate(
          { id: productId },
          { $set: { available: true } },
          { new: true }
        )
      ]);
    }

    const updatedModelQuantity = await tabletModelsQuantity.findOneAndUpdate(
      { productId: productId },
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


exports.updateTabletModelQuantityAsAdmin = (req, res, next) => {
  updateTabletModelQuantity(req, res, next);
};

exports.updateTabletModelQuantityCheckout = (req, res, next) => {
  updateTabletModelQuantity(req, res, next);
};

exports.getTabletModelsQuantity = async (req, res, next) => {
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
    const foundTabletModelsQuantity = await tabletModelsQuantity.find(mongooseQuery)
      .skip(startPage * perPage - perPage)
      .limit(perPage)
      .sort(sort);

    const total = await tabletModelsQuantity.countDocuments(mongooseQuery);

    res.json({ data: foundTabletModelsQuantity, total });
  } catch (err) {
    res.status(400).json({
      message: `Error happened on server: "${err}" `,
    });
  }
};

exports.getTabletModelsQuantityById = (req, res, next) => {
  const { id } = req.params;

  tabletModelsQuantity.findOne({ id: id })
    .then(tabletModelQuantity => {
      if (!tabletModelQuantity) {
        res.status(400).json({
          message: `tabletModelQuantity with itemNo ${req.params.id} is not found`,
        });
      } else {
        res.json(tabletModelQuantity);
      }
    })
    .catch(err =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `,
      }),
    );
};


