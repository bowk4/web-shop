import React from "react";
import PropTypes from "prop-types";

const ButtonProfile = ({ text, className, ...props }) => {
  return (
    <div>
      <button className={className} {...props}>
        {text}
      </button>
    </div>
  );
};

ButtonProfile.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func,
};

ButtonProfile.defaultProps = {
  text: "See More",
  className: "",
  type: "button",
};

export default React.memo(ButtonProfile);
