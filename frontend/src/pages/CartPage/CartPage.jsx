import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cart from "../../Components/Cart/Cart/Cart";
import styles from "./CartPage.module.scss";
import LeftArrowIcon from "../../Components/Icons/LeftArrowIcon";
import { fetchCartItems } from "../../API/cartAPI";

const CartPage = () => {
  const dispatch = useDispatch();
  const isAuthorized = useSelector((state) => state.user.isAuthorized);
  const navigate = useNavigate();

  const handleBack = () => {
    const prevPath = sessionStorage.getItem("prevPath") || "/";
    if (["/cart", "/login", "/registration"].includes(prevPath)) {
      navigate("/");
    } else {
      navigate(prevPath);
    }
  };

  useEffect(() => {
    if (isAuthorized) {
      dispatch(fetchCartItems());
    }
  }, [dispatch, isAuthorized]);

  return (
    <>
      <div className={styles.cartContainer}>
        <div className={styles.backBtnWrapper} onClick={handleBack}>
          <LeftArrowIcon />
          <span className={styles.backBtn}>Back</span>
        </div>
        <h1 className={styles.cartPageTitle}>Cart</h1>
        <Cart />
      </div>
    </>
  );
};

export default CartPage;
