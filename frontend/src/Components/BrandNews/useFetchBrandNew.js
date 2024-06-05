import { useState, useEffect } from "react";
import axios from "axios";

const useFetchData = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/phones?brandNew=true");
        setProducts(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return products;
};

export default useFetchData;
