import { useMemo } from "react";

import PropTypes from "prop-types";

export const useSelectedColorData = (model, color) => {
  return useMemo(() => {
    if (model) {
      return model.colors.find((el) => el.colorName === color);
    }
    return null;
  }, [model, color]);
};

useSelectedColorData.propTypes = {
  model: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    colors: PropTypes.arrayOf(
      PropTypes.shape({
        colorName: PropTypes.string.isRequired,
        pictures: PropTypes.arrayOf(
          PropTypes.shape({
            alt: PropTypes.string.isRequired,
            link: PropTypes.string.isRequired,
            _id: PropTypes.string.isRequired,
          })
        ).isRequired,
        capacities: PropTypes.arrayOf(
          PropTypes.shape({
            capacity: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            productId: PropTypes.string.isRequired,
            available: PropTypes.bool.isRequired,
            discount: PropTypes.number,
            _id: PropTypes.string.isRequired,
          })
        ).isRequired,
        hexColor: PropTypes.string.isRequired,
        _id: PropTypes.string.isRequired,
      })
    ).isRequired,
    techSpecs: PropTypes.arrayOf(
      PropTypes.shape({
        specName: PropTypes.string.isRequired,
        specDescription: PropTypes.string.isRequired,
        _id: PropTypes.string.isRequired,
      })
    ).isRequired,
    about: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        _id: PropTypes.string.isRequired,
      })
    ).isRequired,
    refRecommendations: PropTypes.string,
    __v: PropTypes.number.isRequired,
  }),
  color: PropTypes.string.isRequired,
};
