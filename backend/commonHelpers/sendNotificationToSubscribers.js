const NotifyMeAuthorized = require("../models/NotifyMeAuthorized");
const _ = require("lodash");
const MobileProducts = require("../models/MobileProduct");
const TabletProducts = require("../models/TabletProduct");
const AccessoriesProducts = require("../models/AccessoriesProducts");
const Customer = require("../models/Customer");
const phonesOrTabletsAvailableEmailGenerator = require("../emailGenerators/phonesOrTabletsAvailableEmailGenerator");
const accessoriesAvailableEmailGenerator = require("../emailGenerators/accessoriesAvailableEmailGenerator");
const sendMail = require("../commonHelpers/mailSender");

const sendNotificationToSubscribers = async ({ id, category }) => {
  let productModel;
  switch (category) {
    case "phones":
      productModel = MobileProducts;
      break;
    case "tablets":
      productModel = TabletProducts;
      break;
    case "accessories":
      productModel = AccessoriesProducts;
      break;
    default:
      return "Invalid product category";
  }
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

  const notifyMeAuthorized = await NotifyMeAuthorized.findOne({ productId: id });
  if (!notifyMeAuthorized || !notifyMeAuthorized.listOfActualSubscribers || notifyMeAuthorized.listOfActualSubscribers.length === 0) {
    return "There are no subscribers for the product.";
  }

  let productDetails;

  if (productModel === AccessoriesProducts) {
    const { name, picture, price, color, available, weight, size } = productToAdd;
    productDetails = {
      name,
      picture,
      price,
      color,
      available,
      weight,
      size,
    };
  } else {
    // Destructure phones and tablets product properties
    const { name, picture, price, color, screen, capacity, ram, refModel, discount } = productToAdd;
    productDetails = {
      name,
      picture,
      price,
      color,
      screen,
      capacity,
      ram,
      refModelId: refModel.modelId,
      discountPrice: price - (price * discount),
    };
  }
  const letterSubject = `The product ${productDetails?.name} is now available!`;
  let letterHtml;
  if (productModel === AccessoriesProducts) {
    letterHtml = accessoriesAvailableEmailGenerator(
      productDetails?.name,
      productDetails?.picture,
      productDetails?.price,
      productDetails?.color,
      productDetails?.weight,
      productDetails?.size,
      category,
    );
  } else {
    letterHtml = phonesOrTabletsAvailableEmailGenerator(
      productDetails?.name,
      productDetails?.picture,
      productDetails?.price,
      productDetails?.screen,
      productDetails?.capacity,
      productDetails?.ram,
      productDetails?.color,
      category,
      productDetails?.refModelId,
      productDetails?.discountPrice,
    );
  }

  const subscribersEmails = await Promise.all(notifyMeAuthorized.listOfActualSubscribers.map(async (subscriber) => {
    const subscriberDetails = await Customer.findOne({ customerNo: subscriber?.customerNo });
    return subscriberDetails?.email;
  }));

  const sendEmailPromises = subscribersEmails.map(async (email) => {
    try {
      await sendMail(email, letterSubject, letterHtml);
      console.log(`Notification email sent to ${email}`);
      return true;
    } catch (emailError) {
      console.error(`Error sending notification email to ${email}:`, emailError);
      return false;
    }
  });

  const emailResults = await Promise.all(sendEmailPromises);
  const allEmailsSent = emailResults.every(result => result);
  if (allEmailsSent) {
    // Clear the list of subscribers if all emails are sent successfully
    notifyMeAuthorized.listOfActualSubscribers = [];
    await notifyMeAuthorized.save();
    return "Notifications sent to subscribers successfully";
  } else {
    return "Error sending notifications to subscribers";
  }
};
module.exports = sendNotificationToSubscribers;
