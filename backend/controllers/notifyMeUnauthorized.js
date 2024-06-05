const NotifyMeUnauthorized = require("../models/NotifyMeUnauthorized");
const MobileProducts = require("../models/MobileProduct");
const TabletProducts = require("../models/TabletProduct");
const AccessoriesProducts = require("../models/AccessoriesProducts");

exports.addProductToNotifyMeUnauthorized = async (req, res, next) => {
  const { id, category, email } = req.body;
  
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

    let notifyMeUnauthorized = await NotifyMeUnauthorized.findOne({ productId: id });
    if (!notifyMeUnauthorized) {
      notifyMeUnauthorized = new NotifyMeUnauthorized({
        productId: id,
        refCategory: category,
        listOfActualEmails: [],
        listOfAllEmails: [],
      });
    }

    const isInActualList = notifyMeUnauthorized?.listOfActualEmails.some(customer => customer?.email === (email));
    const isInHistoryList = notifyMeUnauthorized?.listOfAllEmails.some(customer => customer?.email === (email));

    if (!isInActualList) {
      notifyMeUnauthorized?.listOfActualEmails.push({
        email: email,
      });

      if (!isInHistoryList) {
        notifyMeUnauthorized?.listOfAllEmails.push({
          email: email,
        });
      }
    } else {

      return res.status(200).json({
        message: `You have already subscribed on product with id: "${id}"`,
      });
    }

    await notifyMeUnauthorized?.save();
    res.json(notifyMeUnauthorized);
  } catch (err) {
    res.status(500).json({ message: `Error happened on server: "${err}" ` });
  }
};

// exports.getProductByCategoryToNotifyMeUnauthorized = async (req, res, next) => {
//   const { category } = req.params;
//
//   const productModel = {
//     "phones": MobileProducts,
//     "tablets": TabletProducts,
//     "accessories": AccessoriesProducts,
//   }[category];
//
//   if (!productModel) {
//     return res.status(400).json({ message: "Invalid product category" });
//   }
//
//   try {
//     const products = await productModel.find();
//     res.json(products);
//   } catch (err) {
//     res.status(500).json({ message: `Error happened on server: ${err}` });
//   }
// };

exports.deleteProductToNotifyMeUnauthorized = async (req, res, next) => {
  const { productId } = req.params;

  try {
    const notifyMeUnauthorized = await NotifyMeUnauthorized.findOneAndDelete({ productId });
    if (!notifyMeUnauthorized) {
      return res.status(404).json({ message: "Product not found in notify me authorized list" });
    }

    res.json({ message: "Product removed from notify me authorized list" });
  } catch (err) {
    res.status(500).json({ message: `Error happened on server: ${err}` });
  }
};