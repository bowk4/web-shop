import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

export const useFetchModelData = (pathname, modelId, typeModel) => {
  const [model, setModel] = useState();

  useEffect(() => {
    axios
      .get(`/api/${typeModel}-models/${modelId}/`)
      .then((response) => {
        setModel(response.data);
      })
      .catch((error) => {
        console.error("There was a problem with your fetch operation:", error);
      });
  }, [pathname, modelId, typeModel]);

  return model;
};

useFetchModelData.propTypes = {
  pathname: PropTypes.string.isRequired,
  modelId: PropTypes.string.isRequired,
  typeModel: PropTypes.string.isRequired,
};
