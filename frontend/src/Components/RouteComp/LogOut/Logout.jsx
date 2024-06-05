import React from "react";
import { Link } from "react-router-dom";
import styles from "./Logout.module.scss";

const Logout = () => {
  return (
    <div className={styles.testBox}>
      <h1 className={styles.tittle}>This is Logout Page </h1>
      <Link className={styles.linksBtn} to="/">
        Home
      </Link>
    </div>
  );
};

export default React.memo(Logout);
