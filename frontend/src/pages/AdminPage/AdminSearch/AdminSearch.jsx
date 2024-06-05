import React from "react";
import PropTypes from "prop-types";
import styles from "./AdminSearch.module.scss";
import SearchLogo from "../../../Components/Icons/SearchLogo";

const AdminSearch = ({ onChange }) => {
  return (
    <div className={styles.inputWrapper}>
      <SearchLogo className={styles.searchIcon} />
      <input
        type="text"
        placeholder={`Type to search`}
        className={styles.searchInput}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

AdminSearch.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default React.memo(AdminSearch);
