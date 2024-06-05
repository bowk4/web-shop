import { useDispatch } from "react-redux";
import { addToCartLocal } from "../../../store/cart/cartSlice";
import { addToCartServer } from "../../../API/cartAPI";
import { fetchProductDetails } from "../../../API/fetchProductDetails";

export const useHandleAddToCart = (isAuthorized) => {
  const dispatch = useDispatch();

  const handleAddToCart = async (product, fetchDetailsUrl = null) => {
    let productDetails = {};

    const currentFullPath = window.location.href.split(
      window.location.origin
    )[1];
    sessionStorage.setItem("prevPath", currentFullPath);

    if (fetchDetailsUrl) {
      try {
        const details = await fetchProductDetails(fetchDetailsUrl);
        productDetails = { ...details };
      } catch (error) {
        console.error("There was a problem with your fetch operation:", error);
        return;
      }
    } else {
      productDetails = { ...product };
    }

    if (isAuthorized) {
      dispatch(addToCartServer(productDetails));
    } else {
      dispatch(addToCartLocal({ productToAdd: productDetails }));
    }
  };

  return handleAddToCart;
};
