import React from "react";
import styles from "./FlexBox.module.scss";

const FlexBox = () => {
  return (
    <div className={styles.slider}>
      <div className={styles.images}>
        <img
          className={styles.imagePhone}
          src="https://images.dailyobjects.com/marche/product-images/1101/nimbus-phone-case-cover-for-iphone-15-images/Nimbus-Phone-Case-Cover-For-iPhone-15.png?tr=cm-pad_resize,v-2,w-960,h-837,dpr-1"
          alt="213"
        />
      </div>
      <div className={styles.text}>
        <h3 className={styles.title}>Discount anywhere you</h3>
        <button className={styles.btn}>buy</button>
        <p className={styles.subtitle}>sliders sub title</p>
      </div>
    </div>
  );
};

export default React.memo(FlexBox);
