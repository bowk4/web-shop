import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { validateCartItems } from "../../../API/cartAPI";

export const useValidateCartAndNavigate = (
  toggleModal,
  setValidationResults,
  successRedirectPath = "/checkout",
  onSuccess = null,
  shouldCreateOrder = false
) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const handleCheckout = useCallback(
    async (values) => {
      try {
        if (!cartItems.length) {
          toggleModal(true);
          setValidationResults([{ isEmpty: true }]);
          return;
        }

        const validationResults = await dispatch(
          validateCartItems(cartItems)
        ).unwrap();

        if (validationResults.allProductsAvailable) {
          if (shouldCreateOrder && onSuccess) {
            try {
              await onSuccess(values);
              return;
            } catch (err) {
              console.error("response error:", err);
              return;
            }
          }

          navigate(successRedirectPath);
        } else {
          toggleModal(true);
          setValidationResults(validationResults.errors || []);
        }
      } catch (error) {
        console.error("Validation error:", error);
      }
    },
    [
      navigate,
      dispatch,
      cartItems,
      toggleModal,
      setValidationResults,
      successRedirectPath,
      onSuccess,
      shouldCreateOrder,
    ]
  );

  return handleCheckout;
};
