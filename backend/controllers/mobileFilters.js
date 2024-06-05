const Filter = require("../models/MobileFilter");
const queryCreator = require("../commonHelpers/queryCreator");
const MobileFilter = require("../models/MobileFilter");
const MobileProduct = require("../models/MobileProduct");
const MobileModel = require("../models/MobileModel"); 
const _ = require("lodash");

exports.addMobileFilter = (req, res, next) => {
  MobileFilter.findOne({ name: req.body.name, type: req.body.type }).then(filter => {
    if (filter) {
      return res.status(400).json({
        message: `Filter with type "${filter.type}" and name "${filter.name}" already exists`
      });
    } else {
      const initialQuery = _.cloneDeep(req.body);
      const newFilter = new Filter(queryCreator(initialQuery));

      newFilter
        .save()
        .then(filter => res.json(filter))
        .catch(err =>
          res.status(400).json({
            message: `Error happened on server: "${err}" `
          })
        );
    }
  });
};

exports.updateMobileFilter = (req, res, next) => {
  MobileFilter.findOne({ _id: req.params.id })
    .then(filter => {
      if (!filter) {
        return res
          .status(400)
          .json({
            message: `Filter with _id "${req.params.id}" is not found.`
          });
      } else {
        const initialQuery = _.cloneDeep(req.body);
        const updatedFilter = queryCreator(initialQuery);

        MobileFilter.findOneAndUpdate(
          { _id: req.params.id },
          { $set: updatedFilter },
          { new: true }
        )
          .then(filter => res.json(filter))
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

exports.deleteMobileFilter = (req, res, next) => {
  MobileFilter.findOne({ _id: req.params.id }).then(async filter => {
    if (!filter) {
      return res
        .status(400)
        .json({ message: `Filter with _id "${req.params.id}" is not found.` });
    } else {
      const filterToDelete = await MobileFilter.findOne({ _id: req.params.id });

      MobileFilter.deleteOne({ _id: req.params.id })
        .then(deletedCount =>
          res.status(200).json({
            message: `Filter witn type "${filterToDelete.type}" and name "${filterToDelete.name}" is successfully deletes from DB `
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

// exports.getMobileFilters = (req, res, next) => {
//   Filter.find()
//     .then(filters => res.json(filters))
//     .catch(err =>
//       res.status(400).json({
//         message: `Error happened on server: "${err}" `
//       })
//     );
// };


exports.getMobileFilters = async (req, res, next) => {
  try {
    const minMaxPrice = await MobileProduct.aggregate([
      {
        $group: {
          _id: null,
          minPrice: { $min: "$price" },
          maxPrice: { $max: "$price" }
        }
      }
    ]);

    const modelNames = await MobileProduct.distinct("refModel.modelName");
    // console.log('modelNames in filters: ' ,modelNames);
    const colors = await MobileProduct.distinct("color");
    const capacities = await MobileProduct.distinct("capacity");
    const RAMs = await MobileProduct.distinct("ram");
    const screens = await MobileProduct.distinct("screen");

    const filters = {
      price: { minPrice: minMaxPrice[0].minPrice, maxPrice: minMaxPrice[0].maxPrice },
      // minPrice: minMaxPrice[0].minPrice,
      // maxPrice: minMaxPrice[0].maxPrice,
      modelName: modelNames,
      color: colors,
      capacity: capacities,
      ram: RAMs,
      screen: screens
    };

    res.json(filters);
  } catch (err) {
    res.status(400).json({ message: `Error happened on server: "${err}" ` });
  }
};


exports.getMobileFiltersByType = (req, res, next) => {
  MobileFilter.find({ type: req.params.type })
    .then(filters => res.json(filters))
    .catch(err =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `
      })
    );
};
