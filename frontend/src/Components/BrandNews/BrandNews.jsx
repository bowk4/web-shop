import LeftArrowIcon from "../Icons/LeftArrowIcon";
import RightArrowIcon from "../Icons/RightArrowIcon";
import React, { useRef } from "react";
import styles from "./BrandNews.module.scss";
import Card from "../Cards/Card";
import useFetchData from "./useFetchBrandNew";

const BrandNew = () => {
  const containerRef = useRef(null);
  const products = useFetchData();

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        left: containerRef.current.scrollLeft - 600,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        left: containerRef.current.scrollLeft + 600,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <div className={styles.header}>
        <h2 className={styles.title}>Brand New</h2>
        <div className={styles.btnGroup}>
          <div className={styles.arrow} onClick={scrollLeft}>
            <LeftArrowIcon />
          </div>
          <div className={styles.arrow} onClick={scrollRight}>
            <RightArrowIcon />
          </div>
        </div>
      </div>
      <div className={styles.cardsContainer} ref={containerRef}>
        {products.map((product) => {
          return (
            <Card
              key={product.id}
              category={product.category}
              cartBtnFontSize="12px"
              {...product}
            />
          );
        })}
      </div>
    </>
  );
};

export default React.memo(BrandNew);
