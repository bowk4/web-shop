import React from "react";
import { Link } from "react-router-dom";
import styles from "./Order.module.scss";

const Order = () => {
  return (
    <div className={styles.testBox}>
      <h1 className={styles.tittle}>This is Order Page </h1>
      <Link className={styles.linksBtn} to="/">
        Home
      </Link>
    </div>
  );
};

export default React.memo(Order);
