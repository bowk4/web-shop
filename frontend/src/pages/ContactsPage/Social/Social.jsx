import React from "react";
import styles from "../ContactsPage.module.scss";

import PropTypes from "prop-types";

const Social = ({ style, ...props }) => {
  return (
    <div className={`${styles.socialIcon} ${style}`}>
      <div className={styles.socialIconBloom}></div>
      <div>
        <div className={styles.socialIconSparkleLine}></div>
        <div className={styles.socialIconSparkleLine}></div>
        <div className={styles.socialIconSparkleLine}></div>
        <div className={styles.socialIconSparkleLine}></div>
        <div className={styles.socialIconSparkleLine}></div>
      </div>
      {props.children}
    </div>
  );
};

Social.propTypes = {
  style: PropTypes.string,
  children: PropTypes.node,
};

export default React.memo(Social);
