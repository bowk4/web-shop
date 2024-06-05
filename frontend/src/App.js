import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import RootRouters from "./routers/RootRouters";
import Header from "./Composition/Header/Header";
import Footer from "./Composition/Footer/Footer";
import "./styles/global/_base.scss";
import Breadcrumbs from "./Composition/Breadcrumbs/Breadcrumbs";
import { addUser, removeUser } from "./store/user/userSlice";
import { useLocation } from "react-router-dom";
import { fetchCartItems } from "./API/cartAPI";
import { fetchTodos, fetchChange } from "./store/favorites/favoriteSlice";
import { orderGetNew } from "./store/orders/OrderNew";
import { Toaster } from "react-hot-toast";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const prevPathRef = useRef(location.pathname);

  useEffect(() => {
    const token = localStorage?.getItem("token");
    if (token) {
      const getUserOnLogin = async (token) => {
        const user = await fetch(`/api/customers/customer`, {
          method: "GET",
          headers: {
            Authorization: token,
          },
        }).then((res) => res.json());
        dispatch(addUser(user));

        dispatch(fetchCartItems());
      };
      getUserOnLogin(token);
    } else {
      dispatch(removeUser());
    }
  }, [prevPathRef, dispatch]);

  useEffect(() => {
    const handleRouteChange = () => {
      const currentFullPath = window.location.href.split(
        window.location.origin
      )[1];
      const prevPath = prevPathRef.current;

      if (!["/login", "/registration", "/cart"].includes(location.pathname)) {
        sessionStorage.setItem("prevPath", prevPath);
      }

      prevPathRef.current = currentFullPath;
    };

    handleRouteChange();
  }, [location.pathname, location.search]);

  const user = useSelector((state) => state.user.user);
  const order = useSelector((state) => state.OrderNew.orders);

  const isAuthorized = useSelector((state) => state.user.isAuthorized);
  const token = localStorage?.getItem("token");
  const favor = useSelector((state) => state.favorite.favorites);
  useEffect(() => {
    token &&
      setTimeout(() => {
        dispatch(fetchTodos(user, isAuthorized));
      }, 100);
  }, [dispatch, token, user, isAuthorized]);

  useEffect(() => {
    const effect = () => {
      token && dispatch(fetchChange({ user, favor }));
      !token && localStorage.setItem("favorites", JSON.stringify(favor));
    };
    effect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favor, dispatch]);
  useEffect(() => {
    !token && localStorage.setItem("orders", JSON.stringify(order));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, order]);
  useEffect(() => {
    token && dispatch(orderGetNew());
  }, [dispatch, token]);
  return (
    <div className="app-wrapper">
      <Header />
      <Toaster position={`bottom-right`} />
      <Breadcrumbs />
      <main className="content-wrapper">
        <RootRouters />
      </main>
      <Footer />
    </div>
  );
}

export default App;
