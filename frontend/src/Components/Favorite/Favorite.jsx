import React from "react";
import HeartIcon from "../Icons/HeartIcon";
import styles from "./Favorite.module.scss";
import PropTypes from "prop-types";

const Favorite = ({ click, some, size }) => {
  const buttonStyle = {
    height: size,
    width: size,
  };

  return (
    <div onClick={click} className={styles.favorite} style={buttonStyle}>
      <HeartIcon some={some} />
    </div>
  );
};

Favorite.propTypes = {
  click: PropTypes.func.isRequired,
  some: PropTypes.bool.isRequired,
  size: PropTypes.string,
};

Favorite.defaultProps = {
  size: "40px",
};

export default React.memo(Favorite);
