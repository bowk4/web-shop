import React, { useState } from "react";
import { Field, ErrorMessage } from "formik";
import styles from "./Input.module.scss";
import PropTypes from "prop-types";
import ShowPassword from "../../Icons/ShowPasswordIcon";
import HidePassword from "../../Icons/HidePasswordIcon";

const Input = ({
  type,
  label,
  className,
  placeholder,
  name,
  error,
  ...props
}) => {
  const [passShown, setPassShown] = useState(false);

  const togglePassword = () => {
    setPassShown(!passShown);
  };

  return (
    <>
      <div className={styles.inputUpdatePassWrapper}>
        <label>
          <h3 className={styles.registration__sectionField}>{label}</h3>
          <Field
            type={passShown ? "text" : type}
            name={name}
            {...props}
            placeholder={placeholder}
            className={className}
          />
          {type === "password" &&
            (passShown ? (
              <div onClick={togglePassword}>
                <HidePassword />
              </div>
            ) : (
              <div onClick={togglePassword}>
                <ShowPassword />
              </div>
            ))}
          <ErrorMessage className={styles.error} name={name} component={"p"} />
        </label>
      </div>
    </>
  );
};

Input.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

export default React.memo(Input);
