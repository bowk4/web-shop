import React from "react";
import styles from "./LoginPage.module.scss";
import LoginForm from "../../Components/Forms/LoginForm/LoginForm";

const LoginPage = () => {
  return (
    <div className={`${styles.container}${styles.loginPageWrapper}`}>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
