const salePoints = require("../models/SalePoint");
const isValidMongoId = require("../validation/isValidMongoId");

const uniqueRandom = require("unique-random");
const rand = uniqueRandom(0, 999999);

const queryCreator = require("../commonHelpers/queryCreator");
const filterParser = require("../commonHelpers/filterParser");
const _ = require("lodash");
const SalePoint = require("../models/SalePoint");
const mobileProducts = require("../models/BrandNews");
const FAQChat = require("../models/FAQChat");


exports.getSalePoint = (req, res, next) => {
  SalePoint.find()
    .then(point => res.status(200).json(point))
    .catch(err =>
      res.status(400).json({
        message: `Error occurred on server: "${err}" `
      })
    );
};


exports.addSalePoint = (req, res, next) => {
  const salePointFields = _.cloneDeep(req.body);

  salePointFields.itemNo = rand();

  const updatedSalePoint = queryCreator(salePointFields);

  const newSalePoint = new SalePoint(updatedSalePoint);

  newSalePoint
    .save()
    .then(salePoint => res.json(salePoint))
    .catch(err =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `,
      })
    )
}



