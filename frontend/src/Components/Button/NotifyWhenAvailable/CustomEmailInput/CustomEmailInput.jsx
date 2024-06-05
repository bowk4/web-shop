import React, { useState } from "react";
import PropTypes from "prop-types";
import notifyUnauthorizedAPI from "../../../../API/notifyUnauthorizedAPI";
import styles from "./CustomEmailInput.module.scss";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const CustomEmailInput = ({ toggleNotifyModal, productId, category }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [disableButton, setDisableButton] = useState(true);

  const handleSubmit = async () => {
    setDisableButton(true);
    await notifyUnauthorizedAPI(productId, category, email);
    toggleNotifyModal();
  };

  const handleChange = (e) => {
    const inputValue = e.target.value;
    setEmail(inputValue);
    if (!inputValue) {
      setError("Email is required");
      setDisableButton(true);
    } else if (!emailRegex.test(inputValue)) {
      setError("Invalid email format");
      setDisableButton(true);
    } else {
      setError("");
      setDisableButton(false);
    }
  };

  return (
    <>
      <div>
        <div className={`${styles.inputLabelWrapper}`}>
          <label className={`${styles.inputLabel}`}>Email:</label>
          <input
            type="text"
            value={email}
            onChange={handleChange}
            placeholder="Enter your email"
            className={`${styles.emailInput} `}
          />
        </div>
        <p className={`${error ? styles.inputErrMsg : styles.hidden}`}>
          {error}
        </p>
      </div>
      <button
        disabled={disableButton}
        onClick={handleSubmit}
        className={`${styles.sendButton}`}
      >
        Submit
      </button>
    </>
  );
};

CustomEmailInput.propTypes = {
  toggleNotifyModal: PropTypes.func.isRequired,
  productId: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};

export default React.memo(CustomEmailInput);
