import React, { useEffect, useState, useMemo, useCallback } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Card from "../../Components/Cards/Card";
import CardAccessories from "../../Components/Cards/CardAccessories";
import debounce from "lodash/debounce";

import styles from "./SearchPage.module.scss";

const SearchPage = () => {
  const [searchList, setSearchList] = useState({ data: [] });
  const searchField = useSelector((state) => state.search.search);
  const total = searchList.data.length;

  const fetchSearchResult = useCallback(async () => {
    try {
      const [phonesResponse, tabletsResponse, accessoriesResponse] =
        await Promise.all([
          axios.get(`/api/phones?q=${searchField}`),
          axios.get(`/api/tablets?q=${searchField}`),
          axios.get(`/api/accessories?q=${searchField}`),
        ]);

      const phonesData = phonesResponse.data.data;
      const tabletsData = tabletsResponse.data.data;
      const accessoriesData = accessoriesResponse.data.data;

      const combinedData = [...phonesData, ...tabletsData, ...accessoriesData];

      setSearchList({ data: combinedData });
    } catch (error) {
      console.error("Fetching error:", error);
    }
  }, [searchField]);

  useEffect(() => {
    if (searchField.trim() !== "") {
      const delayedSearch = debounce(() => {
        fetchSearchResult();
      }, 1000);
      delayedSearch();
      return () => {
        delayedSearch.cancel();
      };
    }
  }, [searchField, fetchSearchResult]);

  const memoizedSearchList = useMemo(() => searchList, [searchList]);

  return (
    <article className={styles.container}>
      <h1 className={styles.searchTitle}>Search result</h1>
      <h3 className={styles.searchCategory}>
        Last search items: &quot;{searchField}&quot;
      </h3>
      <h3 className={styles.searchCategory}>total: {total}</h3>
      <div className={styles.resultWrapper}>
        {Array.isArray(memoizedSearchList.data) &&
          memoizedSearchList.data.map((item) => {
            if (item.category === "accessories") {
              return <CardAccessories key={item.id} {...item} />;
            }
            return <Card key={item.id} {...item} />;
          })}
        {total === 0 && <h2 className={styles.nothingFound}>Nothing found</h2>}
      </div>
    </article>
  );
};

export default SearchPage;
