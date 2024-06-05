import { useSelector } from "react-redux";
import WrongRoute from "../pages/WrongRoutePage/WrongRoute";
import React from "react";
import PropTypes from "prop-types";

export const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.user);

  const isAdmin = user?.isAdmin || false;

  // useEffect(() => {
  //   if (user && !isAdmin) {
  //     // navigate("/");
  //
  //   }
  // }, [user, isAdmin, navigate]);

  return isAdmin ? children : <WrongRoute />;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
