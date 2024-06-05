import React from "react";
import { useField } from "formik";
import PropTypes from "prop-types";
import styles from "./CustomInputCheckout.module.scss";
import { PatternFormat } from "react-number-format";

const CustomInputCheckout = ({ label, as: Component = "input", ...props }) => {
  const [field, meta] = useField(props.name);

  return (
    <div className={styles.inputWrapper}>
      <label htmlFor={props.name} className={styles.inputLabel}>
        {label}
      </label>
      {props.name === "phoneNumber" ? (
        <PatternFormat
          {...field}
          {...props}
          format="+380 (##) ###-##-##"
          allowEmptyFormatting={true}
          mask="_"
          onValueChange={(values) => {
            field.onChange(values.value);
          }}
          className={styles.inputField}
          style={{
            borderColor: meta.touched && meta.error ? "#eb5757" : "#323542",
          }}
          autoComplete="off"
        />
      ) : (
        <Component
          {...field}
          {...props}
          className={styles.inputField}
          style={{
            borderColor: meta.touched && meta.error ? "#eb5757" : "#323542",
          }}
          autoComplete="off"
        />
      )}
      {meta.touched && meta.error ? (
        <p className={styles.inputError}>{meta.error}</p>
      ) : null}
    </div>
  );
};

CustomInputCheckout.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  as: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
};

CustomInputCheckout.defaultProps = {
  as: "input",
  type: "text",
  placeholder: "",
};

export default React.memo(CustomInputCheckout);
