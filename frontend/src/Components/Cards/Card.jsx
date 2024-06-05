import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetOne } from "../../store/favorites/favoriteSlice";
import CartButton from "../Cart/CartButton/CartButton";
import Favorite from "../Favorite/Favorite";
import styles from "./Card.module.scss";

const Card = (props) => {
  const {
    id,
    name,
    picture,
    price,
    color,
    screen,
    capacity,
    ram,
    refModel,
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
      to={`/${category}/${refModel?.modelId}?color=${color}&capacity=${capacity}`}
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
            <p>Screen</p>
            <p>{screen}</p>
          </li>
          <li>
            <p>Capacity</p>
            <p>{capacity}</p>
          </li>
          <li>
            <p>RAM</p>
            <p>{ram}</p>
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
              // dispatch(Tooglefavorites(props));
              dispatch(fetchGetOne(`/api/${category}/byProductId/${id}`));
            }}
            some={some}
          />
        </div>
      </div>
    </Link>
  );
};

Card.propTypes = {
  _id: PropTypes.string,
  picture: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  category: PropTypes.string,
  color: PropTypes.string.isRequired,
  available: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  screen: PropTypes.string.isRequired,
  capacity: PropTypes.string.isRequired,
  ram: PropTypes.string.isRequired,
  refModel: PropTypes.shape({
    modelId: PropTypes.string,
    modelName: PropTypes.string,
  }).isRequired,
  discount: PropTypes.number,
  cartBtnFontSize: PropTypes.string,
};

Card.defaultProps = {
  discount: 0,
  cartBtnFontSize: "14px",
};

export default React.memo(Card);
