import React, { useState, useEffect, useRef } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import FilterButtonIcon from "../Icons/FilterButtonIcon";
import CloseFilterIcon from "../Icons/CloseFilterIcon";
import ClearFiltersIcon from "../Icons/ClearFiltersIcon";
import DownArrowIcon from "../Icons/DownArrowIcon";
import UpArrowIcon from "../Icons/UpArrowIcon";
import styles from "./FilterOptimized.module.scss";
import PropTypes from "prop-types";

const Filter = ({ handleFilter, filters, setFilters, clearFilters }) => {
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [serverFilters, setServerFilters] = useState(null);

  const wrapperRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/phones-filters");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setServerFilters(data);
      } catch (error) {
        console.error("There was a problem with your fetch operation:", error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    isFilterVisible
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "auto");
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsFilterVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isFilterVisible]);

  const toggleFilterVisibility = () => {
    setIsFilterVisible((prevState) => !prevState);
  };

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const handleGroupCheckboxChange = (e) => {
    const { name, checked, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: checked
        ? [...prevFilters[name], value]
        : prevFilters[name].filter((item) => item !== value),
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFilters({ ...filters, [name]: parseInt(value) });
  };

  const handleSliderChange = (value) => {
    setFilters({ ...filters, minPrice: value[0], maxPrice: value[1] });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFilters({ ...filters, [name]: checked });
  };

  const applyFilters = async () => {
    await handleFilter();
    setIsFilterVisible(false);
  };

  return (
    <div ref={wrapperRef} className={styles.filterWrapper}>
      <h2
        className={styles.filterButton}
        onClick={() => {
          if (filters.minPrice === 0 && filters.maxPrice === 0) {
            setFilters({
              ...filters,
              minPrice: serverFilters.price.minPrice,
              maxPrice: serverFilters.price.maxPrice,
            });
          }
          toggleFilterVisibility();
        }}
      >
        {isFilterVisible ? <CloseFilterIcon /> : <FilterButtonIcon />} Filters
      </h2>
      {isFilterVisible && (
        <div className={styles.filterOuterContainer}>
          <div className={styles.filterContainer}>
            <div className={`${styles.checkboxGroup} ${styles.sticky}`}>
              <label className={styles.checkboxLabel} htmlFor="hotPrices">
                <input
                  id="hotPrices"
                  type="checkbox"
                  name="discount"
                  checked={filters.discount}
                  onChange={handleCheckboxChange}
                />
                <span className={styles.checkmark}></span>
                <span className={styles.labelText}>Hot prices only</span>
              </label>
              <label className={styles.checkboxLabel} htmlFor="inStock">
                <input
                  id="inStock"
                  type="checkbox"
                  name="available"
                  checked={filters.available}
                  onChange={handleCheckboxChange}
                />
                <span className={styles.checkmark}></span>
                <span className={styles.labelText}>In stock only</span>
              </label>
            </div>
            {serverFilters &&
              Object.keys(serverFilters).map((key) => (
                <div key={key} className={styles.filterGroupContainer}>
                  <h3
                    className={styles.filterGroupHeader}
                    onClick={() => toggleSection(key)}
                  >
                    {key}
                    {activeSection === key ? (
                      <UpArrowIcon />
                    ) : (
                      <DownArrowIcon />
                    )}
                  </h3>
                  {activeSection === key && (
                    <div className={styles.filterContent}>
                      {Array.isArray(serverFilters[key]) ? (
                        <ul className={styles.checkboxGroup}>
                          {serverFilters[key].map((item) => (
                            <li key={item}>
                              <label className={styles.checkboxLabel}>
                                <input
                                  type="checkbox"
                                  name={key}
                                  value={item}
                                  checked={filters[key].includes(item)}
                                  onChange={handleGroupCheckboxChange}
                                />
                                <span className={styles.checkmark}></span>
                                <span className={styles.labelText}>
                                  {key === "capacity" || key === "ram"
                                    ? `${item} GB`
                                    : `${item}`}
                                </span>
                              </label>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <div className={styles.priceFilter}>
                          <div className={styles.minMaxInputs}>
                            <input
                              type="number"
                              name="minPrice"
                              min={serverFilters[key].minPrice}
                              max={serverFilters[key].maxPrice}
                              value={filters?.minPrice}
                              onChange={handleInputChange}
                              className={styles.priceInput}
                            />
                            <span>-</span>
                            <input
                              type="number"
                              name="maxPrice"
                              min={serverFilters[key].minPrice}
                              max={serverFilters[key].maxPrice}
                              value={filters?.maxPrice}
                              onChange={handleInputChange}
                              className={styles.priceInput}
                            />
                          </div>
                          <div className={styles.sliderContainer}>
                            <Slider
                              range
                              min={serverFilters[key].minPrice}
                              max={serverFilters[key].maxPrice}
                              step={10}
                              allowCross={false}
                              pushable={true}
                              // draggableTrack={true}
                              minDistance={10}
                              value={[filters.minPrice, filters.maxPrice]}
                              onChange={handleSliderChange}
                              styles={{
                                track: {
                                  backgroundColor: "#905bff",
                                  height: 5,
                                },
                                rail: {
                                  backgroundColor: "#f1f2f9",
                                  borderRadius: 10,
                                  height: 5,
                                },
                                handle: {
                                  // borderColor: 'red',
                                  opacity: 1,
                                  height: 15,
                                  width: 15,
                                  marginLeft: 0,
                                  marginTop: -5,
                                  backgroundColor: "#3b3e4a",
                                },
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
          </div>
          <div className={styles.filterButtonsContainer}>
            <button
              onClick={applyFilters}
              className={styles.filterActionButton}
            >
              Apply
            </button>
            <button
              onClick={() => {
                clearFilters();
                setIsFilterVisible(false);
              }}
              className={styles.filterActionButton}
            >
              <ClearFiltersIcon /> Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

Filter.propTypes = {
  handleFilter: PropTypes.func.isRequired,
  filters: PropTypes.shape({
    discount: PropTypes.bool.isRequired,
    available: PropTypes.bool.isRequired,
    minPrice: PropTypes.any.isRequired,
    maxPrice: PropTypes.any.isRequired,
    modelName: PropTypes.arrayOf(PropTypes.string).isRequired,
    capacity: PropTypes.arrayOf(PropTypes.string).isRequired,
    color: PropTypes.arrayOf(PropTypes.string).isRequired,
    ram: PropTypes.arrayOf(PropTypes.string).isRequired,
    screen: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
  setFilters: PropTypes.func.isRequired,
  clearFilters: PropTypes.func.isRequired,
};

export default React.memo(Filter);
