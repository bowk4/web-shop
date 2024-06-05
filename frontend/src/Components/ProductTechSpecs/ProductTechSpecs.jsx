import React from "react";
import PropTypes from "prop-types";
import styles from "./ProductTechSpecs.module.scss";

const TechSpecs = ({ techSpecs, capacity }) => {
  return (
    <div>
      {techSpecs.map((spec, index) => (
        <div key={index} className={styles.techSpec}>
          <div className={styles.specName}>{spec.specName}</div>
          <div className={styles.specDescription}>
            {spec.specName === "Built in memory"
              ? capacity
              : spec.specDescription}
          </div>
        </div>
      ))}
    </div>
  );
};

TechSpecs.propTypes = {
  capacity: PropTypes.string,
  techSpecs: PropTypes.arrayOf(
    PropTypes.shape({
      specName: PropTypes.string.isRequired,
      specDescription: PropTypes.string.isRequired,
    })
  ).isRequired,
};

TechSpecs.defaultProps = {
  capacity: "",
};
export default React.memo(TechSpecs);
