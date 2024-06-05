import React from "react";
import PropTypes from "prop-types";
import styles from "./City.module.scss";

const CityTab = ({ cityName, activeTab, handleTabClick }) => {
  return (
    <div
      onClick={() => handleTabClick(cityName)}
      className={`${styles.city} ${activeTab === cityName && styles.activeCity}`}
      data-address-id={cityName}
    >
      {cityName}
    </div>
  );
};

CityTab.propTypes = {
  cityName: PropTypes.string.isRequired,
  address: PropTypes.shape({
    street: PropTypes.string.isRequired,
    zip: PropTypes.string.isRequired,
  }).isRequired,
  activeTab: PropTypes.string,
  handleTabClick: PropTypes.func.isRequired,
};

export default React.memo(CityTab);
