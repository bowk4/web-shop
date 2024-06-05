import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Favorite from "../Favorite/Favorite";
import { Tooglefavorites } from "../../store/favorites/favoriteSlice";
import CartButton from "../Cart/CartButton/CartButton";
import styles from "./Card.module.scss";

const CardAccessories = (props) => {
  const {
    id,
    name,
    picture,
    price,
    color,
    size,
    weight,
    category,
    discount,
    cartBtnFontSize,
  } = props;
  const dispatch = useDispatch();

  const favor = useSelector((state) => state.favorite.favorites);
  const some = favor.some((el) => id === el.id);

  const productToAdd = { ...props };
  const cartItems = useSelector((state) => state.cart.cartItems);
  const inCart = cartItems.some((item) => item.productId === productToAdd._id);

  const discountedPrice = discount
    ? Math.round(price - price * discount)
    : price;
  const percentDiscount = discount ? discount * 100 : 0;

  return (
    <Link
      to={`/${category}/${name}?color=${color}`}
      className={styles.cardLink}
    >
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
            <p>Size</p>
            <p>{size}</p>
          </li>
          <li>
            <p>Color</p>
            <p>{color}</p>
          </li>
          <li>
            <p>Weight</p>
            <p>{weight}</p>
          </li>
        </ul>
        <div className={styles.buttonWrapper}>
          <CartButton
            productToAdd={productToAdd}
            isAvailable={productToAdd?.available}
            inCart={inCart}
            fetchDetailsUrl={null}
            fontSize={cartBtnFontSize}
          />

          <Favorite
            click={(event) => {
              event.stopPropagation();
              event.preventDefault();
              dispatch(Tooglefavorites(props));
            }}
            some={some}
          />
        </div>
      </div>
    </Link>
  );
};

CardAccessories.propTypes = {
  _id: PropTypes.string,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  weight: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  available: PropTypes.bool.isRequired,
  discount: PropTypes.number,
  cartBtnFontSize: PropTypes.string,
};

CardAccessories.defaultProps = {
  discount: 0,
  cartBtnFontSize: "14px",
};

export default React.memo(CardAccessories);
