import React from "react";
import Style from "./WrongRoutePage.module.scss";
import { Link } from "react-router-dom";

const WrongRoute = () => {
  return (
    <div className={Style.wrapper}>
      <p className={Style.sorry}>
        4 <span>0</span> 4
      </p>
      <h2 className={Style.er}>
        Error Page<span>Something Gone wrong</span>
      </h2>

      <Link className={Style.linksBtn} to="/">
        Home
      </Link>
    </div>
  );
};

export default WrongRoute;
