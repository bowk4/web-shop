import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./CheckoutModal.module.scss";
import CloseIcon from "../../Icons/CloseIcon";
import Button from "../../Button/Button";
import PropTypes from "prop-types";

const CheckoutModal = ({ toggleModal, validationResults }) => {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const validationResultsWithDetails = validationResults.map(
    (validationResult) => {
      if (validationResult.isEmpty) {
        return validationResult;
      }

      const product = cartItems.find(
        (item) => item.customId === validationResult.customId
      );

      return {
        ...validationResult,
        name: product ? product.name : "Unknown product",
        cartQuantity: product ? product.cartQuantity : 0,
      };
    }
  );

  const handleBackToCart = () => {
    toggleModal();
    navigate("/cart");
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.checkoutModal}>
        <button onClick={toggleModal} className={styles.closeButton}>
          <CloseIcon />
        </button>
        {validationResults.length === 1 && validationResults[0].isEmpty ? (
          <p className={styles.textMessage}>Your Shopping Cart is empty</p>
        ) : (
          <>
            {validationResultsWithDetails.filter(
              (item) => item.availableQuantity === 0
            ).length > 0 && (
              <div className={styles.textSection}>
                <p className={styles.textParagraph}>
                  Some items in cart are currently out of stock:
                </p>
                <ul className={styles.textList}>
                  {validationResultsWithDetails
                    .filter((item) => item.availableQuantity === 0)
                    .map((product) => (
                      <li
                        className={styles.textListItem}
                        key={product.customId}
                      >
                        {product.name}
                      </li>
                    ))}
                </ul>
              </div>
            )}
            {validationResultsWithDetails.filter(
              (item) => item.availableQuantity > 0
            ).length > 0 && (
              <div className={styles.textSection}>
                <p className={styles.textParagraph}>
                  Some cart items quantity is greater than in stock:
                </p>
                <ul className={styles.textList}>
                  {validationResultsWithDetails
                    .filter((item) => item.availableQuantity > 0)
                    .map((product) => (
                      <li
                        className={styles.textListItem}
                        key={product.customId}
                      >
                        {product.name}, cart quantity: {product.cartQuantity},
                        in stock: {product.availableQuantity}
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </>
        )}
        <p className={styles.textMessage}>
          Please update your cart to continue the checkout process
        </p>
        <div className={styles.backToCartButtonWrp}>
          <Button onClick={handleBackToCart}>Back to Cart</Button>
        </div>
      </div>
    </div>
  );
};

CheckoutModal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  validationResults: PropTypes.array.isRequired,
};

export default React.memo(CheckoutModal);
