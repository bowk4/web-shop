const mobileModels = require("../models/MobileModel");
const isValidMongoId = require("../validation/isValidMongoId");

const uniqueRandom = require("unique-random");
const rand = uniqueRandom(0, 999999);

const queryCreator = require("../commonHelpers/queryCreator");
const filterParser = require("../commonHelpers/filterParser");
const _ = require("lodash");

// exports.addImages = (req, res, next) => {
//   if (req.files.length > 0) {
//     res.json({
//       message: "Photos are received"
//     });
//   } else {
//     res.json({
//       message:
//         "Something wrong with receiving photos at server. Please, check the path folder"
//     });
//   }
// };

exports.addMobileModel = (req, res, next) => {
  const mobileModelFields = _.cloneDeep(req.body);

  mobileModelFields.itemNo = rand();

  // try {
  //   mobileModelFields.name = mobileModelFields.name
  //     .toLowerCase()
  //     .trim()
  //     .replace(/\s\s+/g, " ");
  //
  // } catch (err) {
  //   res.status(400).json({
  //     message: `Error happened on server: "${err}" `
  //   });
  // }

  const updatedMobileModel = queryCreator(mobileModelFields);

  const newMobileModel = new mobileModels(updatedMobileModel);

  newMobileModel
    .save()
    .then(mobileModel => res.json(mobileModel))
    .catch(err =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `
      })
    );
};

exports.updateMobileModel = (req, res, next) => {
  const { id } = req.params;
  if (!isValidMongoId(id)) {
    return res.status(400).json({
      message: `mobileModel with id "${id}" is not valid`
    });
  }

  mobileModels.findById(id)
    .then(mobileModel => {
      if (!mobileModel) {
        return res.status(400).json({
          message: `mobileModel with id "${req.params.id}" is not found.`
        });
      } else {
        const mobileModelFields = _.cloneDeep(req.body);

        // try {
        //   mobileModelFields.name = mobileModelFields.name
        //     .toLowerCase()
        //     .trim()
        //     .replace(/\s\s+/g, " ");
        // } catch (err) {
        //   res.status(400).json({
        //     message: `Error happened on server: "${err}" `
        //   });
        // }

        const updatedMobileModel = queryCreator(mobileModelFields);

        mobileModel.findOneAndUpdate(
          { _id: req.params.id },
          { $set: updatedMobileModel },
          { new: true }
        )
          .then(mobileModel => res.json(mobileModel))
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

exports.getMobileModels = async (req, res, next) => {
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
    const foundMobileModels = await mobileModels.find(mongooseQuery)
      .skip(startPage * perPage - perPage)
      .limit(perPage)
      .sort(sort);

    const total = await mobileModels.countDocuments(mongooseQuery);

    res.json({ data: foundMobileModels, total });
  } catch (err) {
    res.status(400).json({
      message: `Error happened on server: "${err}" `
    });
  }
};

exports.getMobileModelById = (req, res, next) => {
  const { id } = req.params;
  // if (!isValidMongoId(id)) {
  //   console.log('I am still here?');
  //   return res.status(400).json({
  //     message: `mobileModel with id "${id}" is not valid`
  //   });
  // }
  // mobileModels.findById(id)
  mobileModels.findOne({id: id})
    .then(mobileModel => {
      if (!mobileModel) {
        res.status(400).json({
          message: `mobileModel with itemNo ${req.params.id} is not found`
        });
      } else {
        res.json(mobileModel);
      }
    })
    .catch(err =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `
      })
    );
};


