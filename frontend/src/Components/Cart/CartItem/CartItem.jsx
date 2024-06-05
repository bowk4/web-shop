import React from "react";
import styles from "./CartItem.module.scss";
import { Link } from "react-router-dom";
import DeleteIcon from "../../Icons/CloseIcon";
import MinusIcon from "../../Icons/MinusIcon";
import PlusIcon from "../../Icons/PlusIcon";
import TrashIcon from "../../Icons/TrashIcon";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import {
  incrementQuantityLocal,
  decrementQuantityLocal,
  removeFromCartLocal,
} from "../../../store/cart/cartSlice";
import {
  incrementQuantityServer,
  decrementQuantityServer,
  removeFromCartServer,
} from "../../../API/cartAPI";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const isAuthorized = useSelector((state) => state.user.isAuthorized);

  const calculateTotalItemPrice = (price, discount = 0, quantity) => {
    return Math.round(price * (1 - discount) * quantity);
  };

  const totalItemPrice = calculateTotalItemPrice(
    item.price,
    item.discount,
    item.cartQuantity
  );

  const originalPrice = item.price * item.cartQuantity;

  const getPath = () => {
    switch (item.category) {
      case "phones":
        return `/phones/${item.refModel.modelId}?color=${item.color}&capacity=${item.capacity}`;
      case "tablets":
        return `/tablets/${item.refModel.modelId}?color=${item.color}&capacity=${item.capacity}`;
      case "accessories":
        return `/accessories/${item.name}?color=${item.color}`;
      default:
        return "/";
    }
  };

  const handleIncrement = () => {
    if (isAuthorized) {
      dispatch(incrementQuantityServer(item.productId));
    } else {
      dispatch(incrementQuantityLocal({ _id: item.productId }));
    }
  };

  const handleDecrement = () => {
    if (isAuthorized) {
      dispatch(decrementQuantityServer(item.productId));
    } else {
      dispatch(decrementQuantityLocal({ _id: item.productId }));
    }
  };

  const handleRemove = () => {
    if (isAuthorized) {
      dispatch(removeFromCartServer(item.productId));
    } else {
      dispatch(removeFromCartLocal({ _id: item.productId }));
    }
  };

  return (
    <div className={styles.cartItem}>
      <div className={styles.cartItemInfo}>
        <button onClick={handleRemove} className={styles.deleteButton}>
          <DeleteIcon />
        </button>
        <Link to={getPath()} className={styles.cartItemLink}>
          <div className={styles.cartItemImg}>
            <img src={item.picture} alt={item.name} />
          </div>
          <div className={styles.cartItemName}>{item.name}</div>
        </Link>
      </div>
      <div className={styles.counterPriceWrapper}>
        <div className={styles.counter}>
          <button
            className={styles.counterMinus}
            onClick={item.cartQuantity <= 1 ? handleRemove : handleDecrement}
          >
            {item.cartQuantity <= 1 ? <TrashIcon /> : <MinusIcon />}
          </button>
          <span className={styles.quantity}>{item.cartQuantity}</span>
          <button className={styles.counterPlus} onClick={handleIncrement}>
            <PlusIcon />
          </button>
        </div>
        <div className={styles.priceWrapper}>
          <h3 className={styles.totalItemPrice}>{`$${totalItemPrice}`}</h3>
          {(item.discount ?? 0) !== 0 && (
            <div className={styles.originalPrice}>{`$${originalPrice}`}</div>
          )}
        </div>
      </div>
    </div>
  );
};

CartItem.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    productId: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    discount: PropTypes.number,
    cartQuantity: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    color: PropTypes.string,
    capacity: PropTypes.string,
    refModel: PropTypes.shape({
      modelId: PropTypes.string.isRequired,
      modelName: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

CartItem.defaultProps = {
  item: {
    discount: 0,
    color: "",
    capacity: "",
    refModel: {},
  },
};

export default React.memo(CartItem);
