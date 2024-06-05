import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./Button.module.scss";

const Button = ({
  onClick,
  children,
  backgroundColor,
  hoverBackgroundColor,
  height,
  disabled,
  type,
  fontSize,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const buttonStyle = {
    backgroundColor:
      isHovered && !disabled ? hoverBackgroundColor : backgroundColor,
    height,
    cursor: disabled ? "default" : "pointer",
    fontSize,
  };

  return (
    <button
      type={type}
      style={buttonStyle}
      className={styles.button}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  backgroundColor: PropTypes.string,
  hoverBackgroundColor: PropTypes.string,
  height: PropTypes.string,
  disabled: PropTypes.bool,
  fontSize: PropTypes.string,
};

Button.defaultProps = {
  type: "button",
  onClick: () => {},
  backgroundColor: "#905BFF",
  hoverBackgroundColor: "#a378ff",
  height: "40px",
  disabled: false,
  fontSize: "14px",
};

export default React.memo(Button);
