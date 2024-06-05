import React from "react";
import Button from "../../Button/Button";
import { useValidateCartAndNavigate } from "../hooks/useValidateCartAndNavigate";
import PropTypes from "prop-types";

const CheckoutButton = ({ toggleModal, setValidationResults }) => {
  const validateAndNavigate = useValidateCartAndNavigate(
    toggleModal,
    setValidationResults
  );

  return (
    <Button onClick={validateAndNavigate} type="button" height="48px">
      Checkout
    </Button>
  );
};

CheckoutButton.propTypes = {
  toggleModal: PropTypes.func,
  setValidationResults: PropTypes.func,
};

CheckoutButton.defaultProps = {
  toggleModal: () => {},
  setValidationResults: () => {},
};

export default React.memo(CheckoutButton);
