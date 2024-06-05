const tabletProducts = require("../models/TabletProduct");
const isValidMongoId = require("../validation/isValidMongoId");

const uniqueRandom = require("unique-random");
const rand = uniqueRandom(0, 999999);

const queryCreator = require("../commonHelpers/queryCreator");
const filterParser = require("../commonHelpers/filterParser");
const _ = require("lodash");
const TabletModel = require("../models/TabletModel");
const TabletModelQuantity = require("../models/TabletModelQuantity");


exports.addTabletProduct = (req, res, next) => {
  const tabletProductFields = _.cloneDeep(req.body);

  tabletProductFields.itemNo = rand();

  const updatedTabletProduct = queryCreator(tabletProductFields);

  const newTabletProduct = new tabletProducts(updatedTabletProduct);

  newTabletProduct
    .save()
    .then(tabletProduct => res.json(tabletProduct))
    .catch(err =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `,
      }),
    );
};

exports.updateTabletProduct = (req, res, next) => {
  const { id } = req.params;
  const { discount } = req.body;

  tabletProducts.findOne({ id })
    .then(tabletProduct => {
      if (!tabletProduct) {
        return res.status(400).json({
          message: `tabletProduct with id "${id}" is not found.`,
        });
      } else {

        TabletModel.findOneAndUpdate(
          { id: tabletProduct.refModel.modelId },
          { $set: { "colors.$[color].capacities.$[capacity].discount": discount } },
          {
            arrayFilters: [{ "color.capacities.productId": id }, { "capacity.productId": id }],
            new: true,
          },
        ).then(tabModel => {
          console.log(tabModel);
        });

        tabletProducts.findOneAndUpdate(
          { id: id },
          { $set: { discount: discount } },
          { new: true },
        )
          .then(tabletProduct => res.json(tabletProduct))
          .catch(err =>
            res.status(400).json({
              message: `Error happened on server: "${err}" `,
            }),
          );

      }
    })
    .catch(err =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `,
      }),
    );
};

exports.getTabletProducts = async (req, res, next) => {
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
    const foundTabletProducts = await tabletProducts.find(mongooseQuery)
      .skip(startPage * perPage - perPage)
      .limit(perPage)
      .sort(sort);

    const total = await tabletProducts.countDocuments(mongooseQuery);

    res.json({ data: foundTabletProducts, total });
  } catch (err) {
    res.status(400).json({
      message: `Error happened on server: "${err}" `,
    });
  }
};

exports.getAdminTabletProducts = async (req, res, next) => {
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
    const foundTabletProducts = await tabletProducts.find(mongooseQuery)
      .skip(startPage * perPage - perPage)
      .limit(perPage)
      .sort(sort)
      .limit(perPage)

    const productIds = foundTabletProducts.map(product => product.id);
    const quantities = await TabletModelQuantity.find({ productId: { $in: productIds } });

    const productsWithQuantity = foundTabletProducts.map(product => {
      const quantityData = quantities.find(qty => qty.productId === product.id);
      const quantity = quantityData ? quantityData.quantity : 0;
      return { ...product.toObject(), quantity };
    });


    res.json({ data: productsWithQuantity });
  } catch (err) {
    res.status(400).json({
      message: `Error happened on server: "${err}" `,
    });
  }
};

exports.getTabletProductsTotal = async (req, res, next) => {
  const mongooseQuery = filterParser(req.query);
  const q = typeof req.query.q === "string" ? req.query.q.trim() : null;

  if (q) {
    mongooseQuery.name = {
      $regex: new RegExp(q, "i"),
    };
  }

  try {
    const total = await tabletProducts.countDocuments(mongooseQuery);

    res.json({ total });
  } catch (err) {
    res.status(400).json({
      message: `Error happened on server: "${err}" `,
    });
  }
};

exports.getTabletProductById = (req, res, next) => {
  const { id } = req.params;

  if (!isValidMongoId(id)) {
    return res.status(400).json({
      message: `Product with id "${id}" is not valid`,
    });
  }
  tabletProducts.findById(id)
    .then(product => {
      if (!product) {
        res.status(400).json({
          message: `Product with itemNo ${req.params.itemNo} is not found`,
        });
      } else {
        res.json(product);
      }
    })
    .catch(err =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `,
      }),
    );
};

exports.getTabletProductByCustomId = (req, res, next) => {
  const { id } = req.params;

  tabletProducts.findOne({ id })
    .then(product => {
      if (!product) {
        return res.status(404).json({
          message: `Product with productId ${id} is not found`,
        });
      }
      res.json(product);
    })
    .catch(err => res.status(500).json({
      message: `Error happened on server: "${err}"`,
    }));
};


