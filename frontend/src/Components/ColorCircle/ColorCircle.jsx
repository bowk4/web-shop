import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./ColorCircle.module.scss";

const ColorCircle = ({
  hexColor,
  pathname,
  capacity,
  color,
  isActive,
  changeColor,
  availabilityArr,
}) => {
  const notAvailable = availabilityArr.every((el) => el?.available === false);

  return (
    <Link
      to={`${pathname}?color=${color}&capacity=${capacity}`}
      onClick={() => changeColor(color)}
      className={`${isActive ? styles.noPointerEvent : ""}`}
    >
      <div
        className={`${styles.circle} ${isActive ? styles.active : ""} ${notAvailable && styles.notAvailable}`}
        style={{ backgroundColor: hexColor }}
      ></div>
    </Link>
  );
};

ColorCircle.propTypes = {
  hexColor: PropTypes.string.isRequired,
  pathname: PropTypes.string.isRequired,
  capacity: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  changeColor: PropTypes.func.isRequired,
  availabilityArr: PropTypes.array,
};

export default React.memo(ColorCircle);
