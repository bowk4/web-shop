import React, { useState } from "react";
import PropTypes from "prop-types";
import style from "./Order.module.scss";
import DownArrowIconOrders from "../Icons/DownArrowIconOrders";

const Order = ({
  _id,
  userFirstName,
  userLastName,
  canceled,
  customerId,
  data,
  deliveryAddress,
  email,
  letterSubject,
  mobile,
  orderNo,
  products,
  deliveryMethod,
  paymentMethod,
  status,
  totalSum,
}) => {
  const [toggleOpen, setToggleOpen] = useState(null);
  const dateObject = new Date(data);
  const day = dateObject.getDate();
  const month = dateObject.getMonth() + 1;
  const year = dateObject.getFullYear();

  const handelToggle = () => {
    setToggleOpen(!toggleOpen);
  };
  return (
    <div className={`${style.container} ${style.marginBtm}`}>
      <div className={style.order}>
        <div className={style.orderWrapper}>
          <p className={style.orderNumberTitle}>Order Number:</p>
          <p className={style.orderNumberSubTitle}>{orderNo}</p>
        </div>
        <div>
          <button onClick={handelToggle} className={style.orderButton}>
            {toggleOpen ? `Close All` : `Open All`}
            <DownArrowIconOrders />
          </button>
        </div>
      </div>
      {toggleOpen && (
        <>
          <div className={style.openOrderSection}>
            <div className={style.infoWrapper}>
              <div className={style.infoTextWrapper}>
                <p className={style.infoText}>Name: </p>
                <p className={style.infoTextSecond}>{userFirstName} </p>
              </div>
              <div className={style.infoTextWrapper}>
                <p className={style.infoText}>LastName: </p>
                <p className={style.infoTextSecond}>{userLastName} </p>
              </div>

              <div className={style.infoTextWrapper}>
                <p className={style.infoText}>Pay Method: </p>
                <p className={style.infoTextSecond}>{paymentMethod} </p>
              </div>
              <div className={style.infoTextWrapper}>
                <p className={style.infoText}>Delivery Address: </p>
                <p className={style.infoTextSecond}>{deliveryAddress} </p>
              </div>
              <div className={style.infoTextWrapper}>
                <p className={style.infoText}>Delivery Method: </p>
                <p className={style.infoTextSecond}>{deliveryMethod} </p>
              </div>
              <div className={style.infoTextWrapper}>
                <p className={style.infoText}>Email: </p>
                <p className={style.infoTextSecond}>{email}</p>
              </div>
              <div className={style.infoTextWrapper}>
                <p className={style.infoText}>Data: </p>
                <p className={style.infoTextSecond}>
                  {day}.{month}.{year}
                </p>
              </div>
              <div className={style.infoTextWrapper}>
                <p className={style.infoText}>Price: </p>
                <p className={style.infoTextSecond}>{totalSum} </p>
              </div>
              <div className={style.infoTextWrapper}>
                <p className={style.infoText}>Mobile: </p>
                <p className={style.infoTextSecond}>{mobile} </p>
              </div>
              <p className={style.progress}>{status}</p>
            </div>
            {products.map((product, index) => {
              const discountedPrice = product.discount
                ? Math.round(product.price - product.price * product.discount)
                : product.price;

              return (
                <div key={index} className={style.imgWrapper}>
                  <div className={style.cartItem}>
                    <div className={style.cartItemInfo}>
                      <div className={style.cartItemImg}>
                        <img src={product.picture} alt="231" />
                      </div>
                      <div className={style.cartItemName}>{product.name}</div>
                    </div>
                    <div className={style.counterPriceWrapper}>
                      <div className={style.counter}>
                        <span className={style.quantity}>
                          Quantity: {product.cartQuantity}
                        </span>
                      </div>
                      <div className={style.priceWrapper}>
                        <h3 className={style.totalItemPrice}>
                          Price: {discountedPrice}$
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

Order.propTypes = {
  _id: PropTypes.string.isRequired,
  canceled: PropTypes.bool.isRequired,
  customerId: PropTypes.any,
  data: PropTypes.string.isRequired,
  userFirstName: PropTypes.string.isRequired,
  userLastName: PropTypes.string.isRequired,
  deliveryAddress: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  letterSubject: PropTypes.string.isRequired,
  mobile: PropTypes.string.isRequired,
  orderNo: PropTypes.string.isRequired,
  products: PropTypes.array.isRequired,
  deliveryMethod: PropTypes.string.isRequired,
  paymentMethod: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  totalSum: PropTypes.number.isRequired,
};

export default React.memo(Order);
