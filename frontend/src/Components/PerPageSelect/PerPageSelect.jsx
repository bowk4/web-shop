import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import styles from "./PerPageSelect.module.scss";

const PerPageSelect = ({ handlePerPageChange, cardsPerPageValue }) => {
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      width: "128px",
      height: "40px",
      color: "#F1F2F9",
      backgroundColor: "#323542",
      border: "1px solid transparent",
      borderRadius: "0px",
      boxShadow: "none",
      outline: "none",
      "&:focus-within": {
        borderColor: "#905BFF",
      },
      "&:hover": {
        borderColor: state.isFocused ? "transparent" : "#4A4D58",
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#323542" : "#0F1121",
      color: state.isSelected ? "#F1F2F9" : "#75767F",
      fontFamily: "Mont",
      fontSize: "14px",
      fontWeight: "600",
      lineHeight: "21px",
      "&:hover": {
        backgroundColor: "#323542",
        color: "#F1F2F9",
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#F1F2F9",
      fontFamily: "Mont",
      fontSize: "14px",
      fontWeight: "700",
      lineHeight: "21px",
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
      backgroundColor: "#323542",
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      display: "none",
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: "#75767F",
      transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null,
      "&:hover, &:focus": {
        color: "#75767F",
      },
    }),
    menu: (provided) => ({
      ...provided,
      width: "128px",
      backgroundColor: "#0F1121",
      border: "1px solid",
      borderColor: "#905BFF",
    }),
  };

  if (window.matchMedia("(max-width: 768px)").matches) {
    customStyles.control.width = "128px";
    customStyles.menu.width = "128px";
  }

  const options = [
    { value: 8, label: "8" },
    { value: 16, label: "16" },
    { value: 24, label: "24" },
    { value: 48, label: "48" },
  ];

  return (
    <div className={styles.perPageContainer}>
      <label htmlFor="perPageSelect" className={styles.perPageTitle}>
        Items on page:
      </label>
      <Select
        id="perPageSelect"
        options={options}
        value={options.find((option) => option.value === cardsPerPageValue)}
        onChange={(selectedOption) => handlePerPageChange(selectedOption.value)}
        styles={customStyles}
        isSearchable={false}
      />
    </div>
  );
};
// )

PerPageSelect.propTypes = {
  handlePerPageChange: PropTypes.func.isRequired,
  cardsPerPageValue: PropTypes.number.isRequired,
};

export default React.memo(PerPageSelect);
