import React from "react";
import { useSelector } from "react-redux";
import styles from "./Cart.module.scss";
import CartItem from "../CartItem/CartItem";
import CheckoutButton from "../../Checkout/CheckoutButton/CheckoutButton";
import CheckoutModal from "../../Checkout/CheckoutModal/CheckoutModal";
import { useCartValidationModal } from "../../Checkout/hooks/useCartValidationModal";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const { isModalOpen, validationResults, setValidationResults, toggleModal } =
    useCartValidationModal();

  const calculateTotalItemPrice = (price, discount = 0, quantity) => {
    return Math.round(price * (1 - discount) * quantity);
  };

  const totalCartPrice = cartItems.reduce(
    (total, item) =>
      total +
      calculateTotalItemPrice(item.price, item.discount, item.cartQuantity),
    0
  );

  const totalItemsQuantity = cartItems.reduce(
    (total, item) => total + item.cartQuantity,
    0
  );

  return (
    <div className={styles.cart}>
      {cartItems.length === 0 && (
        <p className={styles.emptyMessage}>Your Cart is empty</p>
      )}

      {cartItems.length > 0 && (
        <>
          <div className={styles.cartItemsList}>
            {cartItems.map((item) => (
              <CartItem key={item._id} item={item} />
            ))}
          </div>

          <div className={styles.checkoutSection}>
            <div className={styles.totalPriceWarapper}>
              <p className={styles.totalCartPrice}>{`$${totalCartPrice}`}</p>
              <p
                className={styles.totalItemsQuantity}
              >{`Total for ${totalItemsQuantity} items`}</p>
            </div>
            <div className={styles.divider}></div>
            <CheckoutButton
              toggleModal={toggleModal}
              setValidationResults={setValidationResults}
            />
            {isModalOpen && (
              <CheckoutModal
                toggleModal={toggleModal}
                validationResults={validationResults}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default React.memo(Cart);
