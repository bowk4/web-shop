import React from "react";
import { useField } from "formik";
import styles from "./CustomInput.module.scss";
import PropTypes from "prop-types";
import { PatternFormat } from "react-number-format";

const Input = (props) => {
  const [field, meta] = useField(props);

  const label = props.name === "birthDate" ? props.label : `${props.label} *`;

  return (
    <div className={styles.inputWrapper}>
      <label htmlFor={props.name} className={styles.inputLabel}>
        {label}
      </label>
      {props.name === "telephone" ? (
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
        <input
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
        <p className={styles.inputErrMsg}>{meta.error}</p>
      ) : null}
    </div>
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default React.memo(Input);
