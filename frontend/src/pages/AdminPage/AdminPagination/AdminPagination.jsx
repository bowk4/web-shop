import React from "react";
import PropTypes from "prop-types";
import { DOTS, usePagination } from "../hooks/usePagination";
import styles from "./AdminPagination.module.scss";
import RightArrowIcon from "../../../Components/Icons/RightArrowIcon";
import LeftArrowIcon from "../../../Components/Icons/LeftArrowIcon";

const AdminPagination = ({
  onPageChange,
  currentPage,
  totalCount,
  pageSize,
  siblingCount,
}) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    pageSize,
    siblingCount,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];

  return (
    <ul
      className={`${styles.paginationContainer} ${styles.paginationBar} ${currentPage === 1 ? styles.disabled : ""}`}
    >
      <li
        key="previous"
        className={`${styles.paginationItem} ${currentPage === 1 ? styles.disabled : ""}`}
        onClick={onPrevious}
      >
        <LeftArrowIcon />
      </li>
      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return (
            <li
              key={`dots${index}`}
              className={`${styles.paginationItem} ${styles.dots}`}
            >
              &#8230;
            </li>
          );
        }

        return (
          <li
            key={`${pageNumber}`}
            className={`${styles.paginationItem} ${pageNumber === currentPage ? styles.selected : ""}`}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        key="next"
        className={`${styles.paginationItem} ${currentPage === lastPage ? styles.disabled : ""}`}
        onClick={onNext}
      >
        <RightArrowIcon />
      </li>
    </ul>
  );
};

AdminPagination.propTypes = {
  onPageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  totalCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  siblingCount: PropTypes.number,
};

AdminPagination.defaultProps = {
  siblingCount: 1,
};

export default React.memo(AdminPagination);
