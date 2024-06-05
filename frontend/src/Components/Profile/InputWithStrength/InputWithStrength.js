import React, { useRef, useState } from "react";
import { ErrorMessage, Field } from "formik";
import PropTypes from "prop-types";
import styles from "./InputWithStrength.module.scss";
import ShowPassword from "../../Icons/ShowPasswordIcon";
import HidePassword from "../../Icons/HidePasswordIcon";

const InputWithStrength = ({
  label,
  className,
  placeholder,
  name,
  handleChange,
  error,
  ...props
}) => {
  const [passShown, setPassShown] = useState(false);
  const passwordRef = useRef(null);
  const [passwordValue, setPasswordValue] = useState("");

  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [progress, setProgress] = useState("");

  const togglePassword = () => {
    setPassShown(!passShown);
  };

  const handlePassInput = (passwordValue) => {
    const strengthChecks = {
      length: 0,
      hasUpperCase: false,
      hasLowerCase: false,
      hasDigit: false,
      hasSpecialChar: false,
    };

    strengthChecks.length = passwordValue.length >= 8 ? true : false;
    strengthChecks.hasUpperCase = /[A-Z]+/.test(passwordValue);
    strengthChecks.hasLowerCase = /[a-z]+/.test(passwordValue);
    strengthChecks.hasDigit = /[0-9]+/.test(passwordValue);
    strengthChecks.hasSpecialChar = /[^A-Za-z0-9]+/.test(passwordValue);

    let verifiedList = Object.values(strengthChecks).filter((value) => value);

    let strength =
      verifiedList.length === 5
        ? "Strong"
        : verifiedList.length >= 2
          ? "Medium"
          : "Weak";

    setPassword(passwordValue);
    setProgress(`${(verifiedList.length / 5) * 100}%`);
    setMessage(strength);
  };

  const getActiveColor = (type) => {
    if (type === "Strong") return "#8BC926";
    if (type === "Medium") return "#FEBD01";
    if (type === "Weak") return "#FF0054";
    return "#75767f";
  };

  return (
    <>
      <div className={styles.registration__showHide}>
        <label>
          <h3 className={styles.registration__sectionField}>{label}</h3>
          <Field
            innerRef={passwordRef}
            type={passShown ? "text" : "password"}
            name={name}
            {...props}
            value={passwordValue}
            className={styles.registration__sectionInput}
            onChange={(e) => {
              const value = e.target.value;
              setPasswordValue(value);
              handleChange(e);
              handlePassInput(value);
            }}
            placeholder={placeholder}
          />
          {passShown ? (
            <div onClick={togglePassword}>
              <HidePassword />
            </div>
          ) : (
            <div onClick={togglePassword}>
              <ShowPassword />
            </div>
          )}
          <ErrorMessage className={styles.error} name={name} component={"p"} />
        </label>
      </div>
      <div className={styles.passStrength}>
        <div className={styles.strengthPercent}>
          <span
            style={{
              width: progress,
              backgroundColor: getActiveColor(message),
            }}
          ></span>
        </div>
        {password.length !== 0 ? (
          <p
            className={styles.strengthLabel}
            style={{ color: getActiveColor(message) }}
          >
            {message}
          </p>
        ) : null}
      </div>
    </>
  );
};

InputWithStrength.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  handleChange: PropTypes.func,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

InputWithStrength.defaultProps = {
  handleChange: () => {},
};

export default React.memo(InputWithStrength);
