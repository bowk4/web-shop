import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../../store/user/userSlice";
import { fetchCartItems } from "../../API/cartAPI";
import { SetFavor } from "../../store/favorites/favoriteSlice";
import { SetOrder } from "../../store/orders/OrderNew";
import LogoutIcon from "../../Components/Icons/LogoutIcon";
import UserIcon from "../../Components/Icons/UserIcon";
import FavoriteIcon from "../../Components/Icons/HeartIcon";
import CartIcon from "../../Components/Icons/CartIcon";
import CounterIcon from "../../Components/Icons/CounterIcon";
import Logo from "../../Components/Icons/Logo";
import OkIcon from "../../Components/Icons/OkIcon";
import scrollUp from "../../helpers/scrollUp";
import LoginIcon from "../../Components/Icons/LoginIcon";
import SearchForm from "../../Components/SearchForm/SearchForm";

import styles from "./Header.module.scss";

const Header = () => {
  const [activeTab, setActiveTab] = useState();
  const [isBurgerActive, setIsBurgerActive] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const isAuthorized = useSelector((state) => state.user.isAuthorized);

  const logOutUser = () => {
    dispatch(removeUser());
    dispatch(SetFavor([]));
    dispatch(SetOrder([]));
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("orders");
    dispatch(fetchCartItems());
  };

  const handleAuthUser = (event) => {
    if (isAuthorized) {
      toggleBurgerActive();
    } else {
      event.preventDefault();
    }
  };

  const toggleBurgerActive = () => {
    if (window.innerWidth >= 320 && window.innerWidth < 640) {
      setIsBurgerActive(!isBurgerActive);
      isBurgerActive
        ? (document.body.style.overflow = "auto")
        : (document.body.style.overflow = "hidden");
    }
  };

  const hideMenuOnLogoClick = () => {
    if (isBurgerActive) {
      toggleBurgerActive();
      setActiveTab("/");
      scrollUp();
    } else {
      scrollUp();
      setActiveTab("/");
    }
  };

  const favor = useSelector((state) => state.favorite?.favorites);

  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartItemsQuantity = cartItems.reduce(
    (total, item) => total + item.cartQuantity,
    0
  );

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    toggleBurgerActive();
  };

  return (
    <header>
      <div className={styles.headerBody}>
        <Link
          onClick={hideMenuOnLogoClick}
          to="/"
          className={styles.headerLogo}
        >
          <Logo />
          <div className={styles.ok}>
            <OkIcon />
          </div>
        </Link>

        <div
          onClick={toggleBurgerActive}
          className={
            !isBurgerActive
              ? styles.headerBurger
              : `${styles.headerBurger} ${styles.activeBurger}`
          }
        >
          <span></span>
        </div>
        <nav
          className={
            !isBurgerActive
              ? styles.headerMenu
              : `${styles.headerMenu} ${styles.activeBurger}`
          }
        >
          <div className={styles.headerList}>
            <Link
              onClick={() => handleTabClick("/")}
              className={`${styles.linksHeader} ${activeTab === "/" ? styles.linkActive : ""}`}
              to="/"
            >
              Home
            </Link>

            <Link
              onClick={() => handleTabClick("/phones")}
              className={`${styles.linksHeader} ${activeTab === "/phones" ? styles.linkActive : ""}`}
              to="/phones"
            >
              Phones
            </Link>

            <Link
              onClick={() => handleTabClick("/tablets")}
              className={`${styles.linksHeader} ${activeTab === "/tablets" ? styles.linkActive : ""}`}
              to="/tablets"
            >
              Tablets
            </Link>

            <Link
              onClick={() => handleTabClick("/accessories")}
              className={`${styles.linksHeader} ${activeTab === "/accessories" ? styles.linkActive : ""}`}
              to="/accessories"
            >
              Accessories
            </Link>

            <Link
              onClick={() => handleTabClick("/favorites")}
              className={`${styles.linksHeader} ${styles.additionalMobileMenu} ${activeTab === "/favorites" ? styles.linkActive : ""}`}
              to="/favorites"
            >
              Favorites
            </Link>

            <Link
              onClick={() => handleTabClick("/cart")}
              className={`${styles.linksHeader} ${styles.additionalMobileMenu} ${activeTab === "/cart" ? styles.linkActive : ""}`}
              to="/cart"
            >
              Cart
            </Link>

            <SearchForm toggleBurger={toggleBurgerActive} />
          </div>

          <div className={styles.auth}>
            <Link
              onClick={handleAuthUser}
              className={styles.authChild}
              to="/user"
            >
              <UserIcon fill={isAuthorized ? "white" : "#3b3e4a"} />
            </Link>
            {isAuthorized ? (
              <Link
                onClick={() => {
                  toggleBurgerActive();
                  logOutUser();
                }}
                className={styles.authChild}
                to="/"
              >
                <LogoutIcon />
              </Link>
            ) : (
              <Link
                onClick={() => {
                  sessionStorage.setItem("prevPath", location.pathname);
                  toggleBurgerActive();
                }}
                className={styles.authChild}
                to="/login"
              >
                <LoginIcon />
              </Link>
            )}
          </div>
          <div className={styles.btnGroup}>
            {isAuthorized ? (
              <>
                <Link onClick={logOutUser} className={styles.mainLinks} to="/">
                  <LogoutIcon />
                </Link>
                <Link
                  onClick={handleAuthUser}
                  className={styles.mainLinks}
                  to="/user"
                >
                  <UserIcon />
                </Link>
              </>
            ) : (
              <Link
                onClick={() => {
                  const currentFullPath = window.location.href.split(
                    window.location.origin
                  )[1];
                  sessionStorage.setItem("prevPath", currentFullPath);
                }}
                className={styles.mainLinks}
                to="/login"
              >
                <LoginIcon />
              </Link>
            )}
            <Link className={styles.mainLinks} to="/favorites">
              <div className={styles.FavorWrapper}>
                <FavoriteIcon some={false} />
                <div
                  className={styles.wrapperCount}
                  style={{ display: favor.length > 0 ? "flex" : "none" }}
                >
                  <CounterIcon />
                  <span className={styles.FavorQuantity}>{favor.length}</span>
                </div>
              </div>
            </Link>

            <Link className={styles.mainLinks} to="/cart">
              <div className={styles.cartIconWrapper}>
                <CartIcon />
                <div
                  className={styles.cartCounterWrapper}
                  style={{ display: cartItemsQuantity > 0 ? "flex" : "none" }}
                >
                  <CounterIcon />
                  <span className={styles.cartBadge}>{cartItemsQuantity}</span>
                </div>
              </div>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
