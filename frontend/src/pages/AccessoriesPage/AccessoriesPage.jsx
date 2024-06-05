import React, { useEffect, useState } from "react";
import axios from "axios";
import CardAccessories from "../../Components/Cards/CardAccessories";
import styles from "./AccessoriesPage.module.scss";

const AccessoriesPage = () => {
  const [accessoriesArr, setAccessoriesArr] = useState({ data: [] });
  const [totalNumber, setTotalNumber] = useState(0);

  useEffect(() => {
    fetchAccessories();
  }, []);

  const fetchAccessories = () => {
    axios
      .get("/api/accessories")
      .then((response) => {
        setAccessoriesArr({ data: response.data.data });
        setTotalNumber(response.data.data.length);
      })
      .catch((error) => {
        console.error("Fetching error:", error);
      });
  };

  return (
    <div className={styles.container}>
      <>
        <h1 className={styles.accessoriesTitle}>Accessories</h1>
        <h3 className={styles.subtitle}>{totalNumber} models</h3>

        <div className={styles.resultWrapper}>
          {Array.isArray(accessoriesArr.data) &&
            accessoriesArr.data.map((item) => (
              <CardAccessories key={item.id} {...item} />
            ))}
        </div>
      </>
    </div>
  );
};

export default React.memo(AccessoriesPage);
