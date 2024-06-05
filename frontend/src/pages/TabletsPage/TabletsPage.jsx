import React, { useState, useEffect } from "react";
import Card from "../../Components/Cards/Card";
import { useLocation } from "react-router-dom";
import axios from "axios";
import styles from "./TabletsPage.module.scss";

const TabletsPage = () => {
  const [tabletsArr, setTabletsArr] = useState({ data: [] });
  const [totalNumber, setTotalNumber] = useState(0);
  const location = useLocation();
  const typeModel = location.pathname.slice(1);

  useEffect(() => {
    fetchTablets();
  }, []);

  const fetchTablets = () => {
    axios
      .get(`/api/tablets`)
      .then((response) => {
        setTabletsArr({ data: response.data.data });
        setTotalNumber(response.data.data.length);
      })
      .catch((error) => {
        console.error("Fetching error:", error);
      });
  };

  return (
    <article className={styles.container}>
      <h1 className={styles.tabletsTitle}>Tablets</h1>
      <h3 className={styles.subtitle}>{totalNumber} models</h3>

      <div className={styles.resultWrapper}>
        {Array.isArray(tabletsArr.data) &&
          tabletsArr.data.map((item) => (
            <Card key={item.id} category={typeModel} {...item} />
          ))}
      </div>
    </article>
  );
};

export default TabletsPage;
