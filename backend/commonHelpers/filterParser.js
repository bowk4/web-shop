const excludedParams = ["perPage", "startPage", "minPrice", "maxPrice", "sort", "q"];

module.exports = function filterParser(filtersQueryString) {
  const mongooseQuery = {};


  if (filtersQueryString.minPrice || filtersQueryString.maxPrice) {
    mongooseQuery.price = {
      $gte: Number(filtersQueryString.minPrice) || 0,
      $lte: Number(filtersQueryString.maxPrice) || 2500
    };
  }

  return Object.keys(filtersQueryString).reduce(
    (mongooseQuery, filterParam) => {
      if (filtersQueryString[filterParam].includes(",")) {
        if (filterParam === "modelName") {
          mongooseQuery["refModel.modelName"] = {
            $in: filtersQueryString[filterParam]
              .split(",")
              .map(item => decodeURI(item))
          }
        } else { 
          mongooseQuery[filterParam] = {
            $in: filtersQueryString[filterParam]
              .split(",")
              .map(item => decodeURI(item))
          };
        }
        
      } else if (!excludedParams.includes(filterParam)) {
        if (filterParam === "modelName") {
          mongooseQuery["refModel.modelName"] = decodeURI(filtersQueryString[filterParam])
        } else if (filterParam === "discount") { 
          mongooseQuery.discount = {$gte: 0.05}
        }
        else { 
          mongooseQuery[filterParam] = decodeURI(filtersQueryString[filterParam]);
        }
          
      }
      return mongooseQuery;
    },
    mongooseQuery
  );
};
