import React, { useState, useEffect, useRef } from "react";
import LeftArrowIcon from "../Icons/LeftArrowIcon";
import RightArrowIcon from "../Icons/RightArrowIcon";
import axios from "axios";
import Card from "../Cards/Card";
import styles from "./HotPrices.module.scss";

const HotPrices = () => {
  const containerRef = useRef(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const phonesRequest = axios.get("/api/phones", {
          params: {
            discount: 0.05,
          },
        });

        const tabletsRequest = axios.get("/api/tablets", {
          params: {
            discount: 0.1,
          },
        });

        const [phonesResponse, tabletsResponse] = await axios.all([
          phonesRequest,
          tabletsRequest,
        ]);
        const combinedProducts = [
          ...phonesResponse.data.data,
          ...tabletsResponse.data.data,
        ];
        combinedProducts.sort((a, b) => a.price - b.price);
        setProducts(combinedProducts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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
        <h2 className={styles.title}>Hot Prices</h2>
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
        {products.map((product) => (
          <Card key={product.id} cartBtnFontSize="12px" {...product} />
        ))}
      </div>
    </>
  );
};

export default React.memo(HotPrices);
