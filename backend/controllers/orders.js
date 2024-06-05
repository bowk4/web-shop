const Cart = require("../models/Cart");
const Order = require("../models/Order");
const Product = require("../models/Product");
const sendMail = require("../commonHelpers/mailSender");
const validateOrderForm = require("../validation/validationHelper");
const queryCreator = require("../commonHelpers/queryCreator");
const productAvailibilityChecker = require("../commonHelpers/productAvailibilityChecker");
const subtractProductsFromCart = require("../commonHelpers/subtractProductsFromCart");
const _ = require("lodash");

const uniqueRandom = require("unique-random");
const rand = uniqueRandom(1000000, 9999999);

exports.placeOrder = async (req, res, next) => {
  try {
    const order = _.cloneDeep(req.body);
    order.orderNo = String(rand());
    
    const { errors, isValid } = validateOrderForm(req.body);

    if (!isValid) {
      return res.status(400).json({ validationErrors: errors });
    }
    
    let cartProducts = [];

    if (req.body.deliveryAddress) {
      order.deliveryAddress = req.body.deliveryAddress;
    }

    if (req.body.deliveryMethod) {
      order.deliveryMethod = req.body.deliveryMethod;
    }

    if (req.body.paymentMethod) {
      order.paymentMethod = req.body.paymentMethod;
    }
    if (req.body.userFirstName) {
      order.userFirstName = req.body.userFirstName;
    }
    if (req.body.userLastName) {
      order.userLastName = req.body.userLastName;
    }
    if (req.body.customerId) {
      order.customerId = req.body.customerId;

      cartProducts = await subtractProductsFromCart(order.customerId);
    }

    if (!req.body.products && cartProducts.length < 1) {
      res
          .status(400)
          .json({ availabilityError: "The list of products is required, but absent!" });
    }

    if (cartProducts.length > 0) {
      order.products = _.cloneDeep(cartProducts);
    } else {
      order.products = req.body.products;
    }

    let letterSubject = req.body.letterSubject        
    let subscriberMail = req.body.email
        
    let letterHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>    
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">    
        <title>Welcome to Nice Gadgets!</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; margin: 0 auto; padding: 40px; background-color: #161827;">
        <img style="display: block; margin: 0 auto; width: 240px; height: 200px;" src="https://res.cloudinary.com/de71eui6p/image/upload/v1712393815/sxhtepbcyn1msl7vptct.webp" alt="logo">
        <h1 style="color: white; font-size: 34px; font-weight: 600; line-height: 1.6;">Welcome to Nice Gadgets!</h1>    
        <p style="color: white; font-size: 18px;">Hello ${req.body.userFirstName} ${req.body.userLastName},</p>
        <p style="color: white; font-size: 18px;">Your account has been successfully created with the following details:</p>    <div style="color: #905bff; font-size: 18px;"><p>Order number: ${order.orderNo}</p>  <p>Total order cost: ${order.totalSum}$</p> 
        <h2 style="color: white" ;font-family: Arial, sans-serif; line-height: 1.6;>You have successfully placed an order, which consists of:</h2>
      `;
    let wrapperForProd = `
      <div style="display: block; margin: 0 auto; padding: 10px ">`;
    
      req.body.products.forEach(item => {
        wrapperForProd += `<div  style="display :flex; gap: 15px; justify-content: space-between"> 
          <p style="color: white; border: 1px solid #905bff; width: 100%; text-align: start; font-size: 34px; font-weight: 600; line-height: 1.6; margin: 0; padding: 0">${item.name} </p>    
        </div>  `;
      });
        wrapperForProd += `</div>`;        
        letterHtml += wrapperForProd;
        letterHtml += `<p style="color: white; font-size: 18px; font-style: normal; font-weight: 400; line-height: 21px;">Best regards,<br>Nice Gadgets Team</p>    
          <p style="color: white; font-size: 18px; font-style: normal; font-weight: 400; line-height: 21px;">Social media:</p>
          <div class="social" style="display: flex; justify-content: space-between; width: 180px;">        
          <div>
            <a href="https://t.me/nicegadgetstore" target="_blank" rel="noreferrer">                
              <img src="https://res.cloudinary.com/de71eui6p/image/upload/v1711375286/Slider/zwpnzpy4gdrardowloam.webp" alt="Telegram">
            </a>        
          </div>
          <div>            
            <a href="https://www.instagram.com/n1cegadgetstore" target="_blank" rel="noreferrer">
              <img src="https://res.cloudinary.com/de71eui6p/image/upload/v1711375285/Slider/iypblt7wvhyl9vjywwdr.webp" alt="Instagram">            
            </a>
          </div>        
          <div>
            <a href="https://www.facebook.com/groups/258628787334330" target="_blank" rel="noreferrer">                
              <img src="https://res.cloudinary.com/de71eui6p/image/upload/v1711375284/Slider/ba2xqvptwh9cpu5ekzij.webp" alt="Facebook">
            </a>        
          </div>
          <div>            
            <a href="mailto:testfrontendmail@gmail.com" target="_blank" rel="noreferrer">
              <img src="https://res.cloudinary.com/de71eui6p/image/upload/v1711375285/Slider/xqxh0u9umai1oa91dgg8.webp" alt="Gmail">            
            </a>
          </div>    
        </div>`;
        letterHtml += `  </div>
          </body></html>`;

    const newOrder = new Order(order);

    newOrder
        .save()
        .then(async order => {
          const mailResult = await sendMail(
            subscriberMail,
            letterSubject,
            letterHtml,
        );
          res.json(order)
        })
        .catch(err =>
            res.status(400).json({
              serverError: `Error happened on server: "${err}" `
            })
        );
    // }
  } catch (err) {
    res.status(400).json({
      serverError: `Error happened on server: "${err}" `
    });
  }
};

exports.updateOrder = (req, res, next) => {
  Order.findOne({ orderNo: req.params.id }).then(async currentOrder => {
    if (!currentOrder) {
      return res
          .status(400)
          .json({ message: `Order with id ${req.params.id} is not found` });
    } else {
      const order = _.cloneDeep(req.body);

      if (req.body.customerId) {
        order.customerId = req.body.customerId;
      }

      Order.findOneAndUpdate(
          { orderNo: req.params.id },
          { $set: order },
          { new: true }
      )
          .populate("customerId")
          .then(async order => {
            res.json(order);
          })
          .catch(err =>
              res.status(400).json({
                message: `Error happened on server: "${err}" `
              })
          );
    }
  });
};


exports.cancelOrder = (req, res, next) => {
  Order.findOne({ _id: req.params.id }).then(async currentOrder => {
    if (!currentOrder) {
      return res
          .status(400)
          .json({ message: `Order with id ${req.params.id} is not found` });
    } else {
      const subscriberMail = req.body.email;
      const letterSubject = req.body.letterSubject;
      const letterHtml = req.body.letterHtml;

      const { errors, isValid } = validateOrderForm(req.body);

      // Check Validation
      if (!isValid) {
        return res.status(400).json(errors);
      }

      if (!letterSubject) {
        return res.status(400).json({
          message:
              "This operation involves sending a letter to the client. Please provide field 'letterSubject' for the letter."
        });
      }

      if (!letterHtml) {
        return res.status(400).json({
          message:
              "This operation involves sending a letter to the client. Please provide field 'letterHtml' for the letter."
        });
      }

      Order.findOneAndUpdate(
          { _id: req.params.id },
          { canceled: true },
          { new: true }
      )
          .populate("customerId")
          .then(async order => {
            const mailResult = await sendMail(
                subscriberMail,
                letterSubject,
                letterHtml,
                res
            );

            res.json({ order, mailResult });
          })
          .catch(err =>
              res.status(400).json({
                message: `Error happened on server: "${err}" `
              })
          );
    }
  });
};
exports.deleteOrder = (req, res, next) => {
  Order.findOne({ _id: req.params.id }).then(async order => {
    if (!order) {
      return res
          .status(400)
          .json({ message: `Order with id ${req.params.id} is not found.` });
    } else {
      const orderToDelete = await Order.findOne({ _id: req.params.id });

      Order.deleteOne({ _id: req.params.id })
          .then(deletedCount =>
              res.status(200).json({
                message: `Order witn id "${orderToDelete._id}" is successfully deletes from DB. Order Details: ${orderToDelete}`
              })
          )
          .catch(err =>
              res.status(400).json({
                message: `Error happened on server: "${err}" `
              })
          );
    }
  });
};


exports.getOrders = (req, res, next) => {
  Order.find({ customerId: req.headers.customerid })
      .populate("customerId")
      .then(orders =>{
        res.json(orders)})
      .catch(err =>
          res.status(400).json({
            message: `Error happened on server: "${err}" `
          })
      );
};

exports.getOrder = (req, res, next) => {
  Order.findOne({ orderNo: req.params.orderNo })
      .populate("customerId")
      .then(order => res.json(order))
      .catch(err =>
          res.status(400).json({
            message: `Error happened on server: "${err}" `
          })
      );
};
