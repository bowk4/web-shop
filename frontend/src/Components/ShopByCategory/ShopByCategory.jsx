import React from "react";
import styles from "./ShopByCategory.module.scss";
import useFetchTotalsOfCategories from "../../pages/HomePage/hooks/useFetchTotalsOfCategories";
import { Link } from "react-router-dom";

const ShopByCategory = () => {
  const { phonesTotal, tabletsTotal, accessoriesTotal } =
    useFetchTotalsOfCategories();

  return (
    <>
      <div className={styles.header}>
        <h2 className={styles.categoryTitle}>Shop by category</h2>
      </div>
      <div className={styles.wrapper}>
        <Link
          to="/phones"
          className={`${styles.categoryItem} ${styles.categoryLink}`}
        >
          <div className={styles.wallpaperPhone}></div>
          <h4 className={styles.subTitle}>Mobile phones</h4>
          <p>{phonesTotal} models</p>
        </Link>
        <Link
          to="/accessories"
          className={`${styles.categoryItem} ${styles.categoryLink}`}
        >
          <div className={styles.wallpaperAccessories}></div>
          <h4 className={styles.subTitle}>Accessories</h4>
          <p>{accessoriesTotal} models</p>
        </Link>
        <Link
          to="/tablets"
          className={`${styles.categoryItem} ${styles.categoryLink}`}
        >
          <div className={styles.wallpaperTablets}></div>
          <h4 className={styles.subTitle}>Tablets</h4>
          <p>{tabletsTotal} models</p>
        </Link>
      </div>
    </>
  );
};

export default React.memo(ShopByCategory);
