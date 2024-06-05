import React, { useState } from "react";
import { useSelector } from "react-redux";
import Button from "../../Button/Button";
import { useHandleAddToCart } from "../hooks/useHandleAddToCart";
import PropTypes from "prop-types";
import NotifyModal from "../../Button/NotifyWhenAvailable/NotifyModal/NotifyModal";
import notifyAuthorizedAPI from "../../../API/notifyAuthorizedAPI";

const CartButton = ({
  productToAdd,
  fetchDetailsUrl,
  isAvailable,
  inCart,
  heightBtn,
  fontSize,
  notifyCategory,
  notifyProductId,
}) => {
  const [isShowNotifyModal, setIsShowNotifyModal] = useState(false);
  const userInfo = useSelector((state) => state.user);
  const isAuthorized = userInfo?.isAuthorized;
  const backgroundColorBtn = isAvailable && !inCart ? "#905BFF" : "#323542";
  const hoverBackgroundColorBtn = inCart ? backgroundColorBtn : "#a378ff";
  const handleAddToCart = useHandleAddToCart(isAuthorized);
  const productCategory = notifyCategory ?? productToAdd?.category;
  const productIdToSubscribe =
    notifyCategory ?? productToAdd?.category === "accessories"
      ? notifyProductId ?? productToAdd?.name
      : notifyProductId ?? productToAdd?.id;

  const toggleNotifyModal = () => {
    setIsShowNotifyModal(!isShowNotifyModal);
  };

  const handleClick = async (event) => {
    event.stopPropagation();
    event.preventDefault();

    if (!isAvailable) {
      if (isAuthorized) {
        await notifyAuthorizedAPI(
          productIdToSubscribe,
          productCategory,
          userInfo?.user?.customerNo
        );
        return;
      }
      toggleNotifyModal();
      return;
    }

    await handleAddToCart(productToAdd, fetchDetailsUrl);
  };

  return (
    <>
      <Button
        onClick={handleClick}
        backgroundColor={backgroundColorBtn}
        hoverBackgroundColor={hoverBackgroundColorBtn}
        height={heightBtn}
        disabled={inCart}
        fontSize={fontSize}
      >
        {isAvailable ? (inCart ? "Added to Cart" : "Add to Cart") : "Notify Me"}
      </Button>
      {isShowNotifyModal && (
        <NotifyModal
          toggleNotifyModal={toggleNotifyModal}
          productId={productIdToSubscribe}
          category={productCategory}
        />
      )}
    </>
  );
};

CartButton.propTypes = {
  productToAdd: PropTypes.object,
  fetchDetailsUrl: PropTypes.string,
  isAvailable: PropTypes.bool.isRequired,
  inCart: PropTypes.bool.isRequired,
  heightBtn: PropTypes.string,
  fontSize: PropTypes.string,
  notifyProductId: PropTypes.string,
  notifyCategory: PropTypes.string,
};

CartButton.defaultProps = {
  productToAdd: null,
  fetchDetailsUrl: null,
  heightBtn: "40px",
  fontSize: "14px",
  notifyProductId: null,
  notifyCategory: null,
};

export default React.memo(CartButton);
