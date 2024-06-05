import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./AdminOption.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedOption } from "../../../store/admin/adminSlice";

const AdminOption = ({ optionTitle, subOptions }) => {
  const dispatch = useDispatch();
  const selectedOption = useSelector((state) => state.admin.selectedOption);
  const [isOpenSubOptions, setIsOpenSubOptions] = useState(true);
  const toggleSubOptions = () => setIsOpenSubOptions(!isOpenSubOptions);

  const setOption = (optTitle, optLabel) =>
    dispatch(
      setSelectedOption({
        title: optTitle,
        label: optLabel,
      })
    );

  return (
    <div className={styles.adminOptionWrapper}>
      <div className={styles.titleWrapper} onClick={toggleSubOptions}>
        <p className={`${styles.optionTitle}`}>{optionTitle}</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 16 16"
          fill="#f1f2f9"
          className={`${isOpenSubOptions === true ? styles.optionToggled : ""}`}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.4715 5.52864C12.7318 5.78899 12.7318 6.2111 12.4715 6.47145L8.47149 10.4714C8.21114 10.7318 7.78903 10.7318 7.52868 10.4714L3.52868 6.47145C3.26833 6.2111 3.26833 5.78899 3.52868 5.52864C3.78903 5.26829 4.21114 5.26829 4.47149 5.52864L8.00008 9.05723L11.5287 5.52864C11.789 5.26829 12.2111 5.26829 12.4715 5.52864Z"
            fill="#f1f2f9"
          />
        </svg>
      </div>
      <ul
        className={`${styles.supOptionsWrapper} ${isOpenSubOptions ? "" : styles.supOptionsWrapperHidden}`}
      >
        {subOptions?.map((opt, index) => {
          return (
            <li
              key={index}
              className={`${opt?.label === selectedOption?.label && optionTitle === selectedOption.title ? styles.selectedOption : ""} ${styles.subOption}`}
              onClick={() => setOption(optionTitle, opt?.label)}
            >
              {opt?.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

AdminOption.propTypes = {
  optionTitle: PropTypes.string.isRequired,
  subOptions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      component: PropTypes.element.isRequired,
    })
  ).isRequired,
};

export default React.memo(AdminOption);
