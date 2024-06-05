import React, { useState } from "react";
import styles from "../../../Components/Cards/Card.module.scss";
import PropTypes from "prop-types";
import QuantityChange from "./AdminCardsButtons/QuantityChange/QuantityChange";
import DiscountChange from "./AdminCardsButtons/DiscountChange/DiscountChange";

const AdminCard = ({
  id,
  name,
  picture,
  price,
  discount,
  category,
  quantity,
  operationType,
}) => {
  const [newQuantity, setNewQuantity] = useState(quantity);
  const [newDiscount, setNewDiscount] = useState(discount);
  const handleNewQuantityChange = (qty) => setNewQuantity((prev) => prev + qty);
  const handleNewDiscountChange = (newDisc) => setNewDiscount(newDisc);

  const discountedPrice = newDiscount
    ? Math.round(price - price * newDiscount)
    : price;
  const percentDiscount = newDiscount ? newDiscount * 100 : 0;

  return (
    <div className={styles.card}>
      <div className={styles.cardImg}>
        <img src={picture} alt="Card" />
      </div>
      <div className={styles.nameWrapper}>
        <div className={styles.model}>{name}</div>
      </div>
      <div className={styles.priceWrap}>
        <div className={styles.discountPrice}>${discountedPrice}</div>
        {percentDiscount > 0 && (
          <>
            <div className={styles.price}>${price}</div>
          </>
        )}
      </div>
      <div className={styles.divider}></div>
      <ul className={styles.paramsGroup}>
        <li>
          <p>Actual quantity: </p>
          <p>{newQuantity}</p>
        </li>
        {(newDiscount || newDiscount === 0) && (
          <li>
            <p>Discount</p>
            <p>{newDiscount * 100} %</p>
          </li>
        )}
      </ul>
      <div className={styles.buttonWrapper}>
        {(category === "phones" || category === "tablets") &&
          operationType === "quantityChange" && (
            <QuantityChange
              quantity={newQuantity}
              category={category}
              id={id}
              onClick={handleNewQuantityChange}
            />
          )}
        {category === "accessories" && operationType === "quantityChange" && (
          <QuantityChange
            quantity={newQuantity}
            category={category}
            name={name}
            onClick={handleNewQuantityChange}
          />
        )}

        {(category === "phones" || "tablets") &&
          operationType === "discountChange" && (
            <DiscountChange
              id={id}
              category={category}
              onClick={handleNewDiscountChange}
            />
          )}
      </div>
    </div>
  );
};

AdminCard.propTypes = {
  picture: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  discount: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  operationType: PropTypes.string.isRequired,
};

AdminCard.defaultProps = {
  discount: 0,
};

export default React.memo(AdminCard);
