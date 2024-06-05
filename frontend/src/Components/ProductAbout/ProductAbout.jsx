import React from "react";
import PropTypes from "prop-types";
import styles from "./ProductAbout.module.scss";

const ProductAbout = ({ title, text }) => {
  return (
    <>
      <h4 className={styles.aboutTitle}>{title}</h4>
      <p className={styles.aboutDescription}>{text}</p>
    </>
  );
};

ProductAbout.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default React.memo(ProductAbout);
