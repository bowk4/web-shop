import React from "react";
import { Link } from "react-router-dom";
import styles from "./FallbackPage.module.scss";

const FallbackPage = () => {
  return (
    <div className={styles.fallbackContainer}>
      <div className={styles.fallbackWrapper}>
        <p>Oops, something went wrong.</p>
        <Link className={styles.linksBtn} to="/">
          Go back to main page
        </Link>
      </div>
    </div>
  );
};

export default FallbackPage;
