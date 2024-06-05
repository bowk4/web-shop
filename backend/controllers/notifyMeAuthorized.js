const NotifyMeAuthorized = require("../models/NotifyMeAuthorized");
const MobileProducts = require("../models/MobileProduct");
const TabletProducts = require("../models/TabletProduct");
const AccessoriesProducts = require("../models/AccessoriesProducts");

exports.addProductToNotifyMeAuthorized = async (req, res, next) => {
  const { id, category, customerNo } = req.body;

  const productModel = {
    "phones": MobileProducts,
    "tablets": TabletProducts,
    "accessories": AccessoriesProducts,
  }[category];


  if (!productModel) {
    return res.status(400).json({ message: "Invalid product category" });
  }

  try {
    let productToAdd;
    if (productModel === AccessoriesProducts) {
      productToAdd = await productModel.findOne({ name: id });
      if (!productToAdd) {
        return `Product with name: "${id}" does not exist in category "${category}"`;
      }
    } else {
      productToAdd = await productModel.findOne({ id });
      if (!productToAdd) {
        return `Product with id: "${id}" does not exist in category "${category}"`;
      }
    }

    let notifyMeAuthorized = await NotifyMeAuthorized.findOne({ productId: id });
    if (!notifyMeAuthorized) {
      notifyMeAuthorized = new NotifyMeAuthorized({
        productId: id,
        refCategory: category,
        listOfActualSubscribers: [],
        listOfAllSubscribers: [],
      });
    }

    const isInActualList = notifyMeAuthorized?.listOfActualSubscribers.some(customer => customer?.customerNo === (customerNo));
    const isInHistoryList = notifyMeAuthorized?.listOfAllSubscribers.some(customer => customer?.customerNo === (customerNo));

    if (!isInActualList) {
      notifyMeAuthorized?.listOfActualSubscribers.push({
        customerNo: customerNo,
      });

      if (!isInHistoryList) {
        notifyMeAuthorized?.listOfAllSubscribers.push({
          customerNo: customerNo,
        });
      }
    } else {
      return res.status(200).json({
        message: `You have already subscribed in product with id: "${id}"`,
      });
    }

    await notifyMeAuthorized?.save();
    res.json(notifyMeAuthorized);
  } catch (err) {
    res.status(500).json({ message: `Error happened on server: "${err}" ` });
  }
};

exports.getProductByCategoryToNotifyMeAuthorized = async (req, res, next) => {
  const { category } = req.params;

  const productModel = {
    "phones": MobileProducts,
    "tablets": TabletProducts,
    "accessories": AccessoriesProducts,
  }[category];

  if (!productModel) {
    return res.status(400).json({ message: "Invalid product category" });
  }

  try {
    const products = await productModel.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: `Error happened on server: ${err}` });
  }
};

exports.deleteProductToNotifyMeAuthorized = async (req, res, next) => {
  const { productId } = req.params;

  try {
    const notifyMeAuthorized = await NotifyMeAuthorized.findOneAndDelete({ productId });
    if (!notifyMeAuthorized) {
      return res.status(404).json({ message: "Product not found in notify me authorized list" });
    }

    res.status(200).json({ message: "Product removed from notify me authorized list" });
  } catch (err) {
    res.status(500).json({ message: `Error happened on server: ${err}` });
  }
};