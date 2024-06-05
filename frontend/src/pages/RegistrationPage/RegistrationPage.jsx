import React from "react";
import styles from "./RegistrationPage.module.scss";
import RegistrationForm from "../../Components/Forms/RegistrationForm/RegistrationForm";

const RegistrationPage = () => {
  return (
    <div className={`${styles.container}${styles.perPageWrapper}`}>
      <RegistrationForm />
    </div>
  );
};

export default RegistrationPage;
