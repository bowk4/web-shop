import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import validationSchema from "./validationSchema.js";
import Input from "../CustomInput/CustomInput.js";
import Button from "../../Button/Button.jsx";
import styles from "./RegistrationForm.module.scss";
import { addUser } from "../../../store/user/userSlice.js";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  synchronizeCartWithServer,
  fetchCartItems,
} from "../../../API/cartAPI.js";
import { synchronizeFavor } from "../../../store/favorites/favoriteSlice.js";
import { orderGetNew, SetOrder } from "../../../store/orders/OrderNew";

const RegistrationForm = () => {
  const [regStatus, setRegStatus] = useState("");
  const [regError, setRegError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setRegStatus("");
    setRegError("");
  }, []);

  const createNewUser = async (userData) => {
    try {
      const response = await fetch(`/api/customers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      if (response.ok) {
        setRegStatus("successful");

        return await response.json();
      } else {
        setRegStatus("failed");
        const failReason = await response.json();

        setRegError(failReason.message);

        return failReason;
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const loginUser = async (userCredentials) => {
    try {
      const response = await fetch(`/api/customers/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userCredentials),
      }).then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          setRegError("Check your credentials");
          setRegStatus("failed");
          throw new Error("Login failed. Check your credentials");
        }
      });

      localStorage.setItem("token", response.token);

      return response.token;
    } catch (error) {
      console.error(error.message);
    }
  };

  const getUserOnLogin = async (token) => {
    const user = await fetch(`/api/customers/customer`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    }).then((res) => res.json());

    dispatch(addUser(user));
    return user;
  };

  const onAuthRedirect = () => {
    if (localStorage.getItem("token")) {
      const prevPath = sessionStorage.getItem("prevPath");

      if (prevPath) {
        navigate(prevPath);
      } else {
        navigate("/");
      }
    }
  };

  const onSubmit = async (values, actions) => {
    setRegStatus("");
    setRegError("");

    const submissionValues = { ...values };

    if (submissionValues.telephone.startsWith("+")) {
      submissionValues.telephone =
        "+" + submissionValues.telephone.slice(1).replace(/\D/g, "");
    } else {
      submissionValues.telephone = submissionValues.telephone.replace(
        /\D/g,
        ""
      );
    }

    const userCredentials = {
      loginOrEmail: values.login,
      password: values.password,
    };

    const result = await createNewUser(submissionValues);
    console.log(result);

    const token = await loginUser(userCredentials);
    await getUserOnLogin(token);
    dispatch(synchronizeCartWithServer());
    dispatch(fetchCartItems());
    dispatch(synchronizeFavor());
    dispatch(orderGetNew());
    localStorage.removeItem("orders");
    dispatch(SetOrder([]));
    onAuthRedirect();
  };

  const initialValues = {
    firstName: "",
    lastName: "",
    telephone: "",
    email: "",
    login: "",
    password: "",
    gender: "",
    birthDate: "2008-01-01",
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ isValid }) => {
        return (
          <Form className={styles.regForm}>
            <h1 className={styles.formHeader}>Registration Form</h1>
            <Input
              type="text"
              name="firstName"
              label="First Name"
              placeholder="First Name"
            />
            <Input
              type="text"
              name="lastName"
              label="Last Name"
              placeholder="Last Name"
            />
            <Input
              type="tel"
              name="telephone"
              label="Phone Number"
              placeholder="+38(0XX)-XXX-XX-XX"
            />
            <Input
              type="email"
              name="email"
              label="Email"
              placeholder="Email"
            />
            <Input type="text" name="login" label="Login" placeholder="Login" />
            <Input
              type="password"
              name="password"
              label="Password"
              placeholder="Password"
            />
            <Input type="date" name="birthDate" label="Birth Date" />
            <div className={styles.genderContainer}>
              <p className={styles.genderTitle}>Gender</p>
              <div role="group" className={styles.optionsGroup}>
                <input
                  className={styles.genderOption}
                  type="radio"
                  name="gender"
                  value="male"
                />
                <label htmlFor="gender" className={styles.inputLabel}>
                  Male
                </label>
                <input
                  className={styles.genderOption}
                  type="radio"
                  name="gender"
                  value="female"
                />
                <label htmlFor="gender" className={styles.inputLabel}>
                  Female
                </label>
              </div>
            </div>
            <div className={styles.submitContainer}>
              <div className={styles.btnWrapper}>
                <Button type="submit" disabled={!isValid}>
                  Register
                </Button>
              </div>
              <p className={styles.alternateAction}>
                <span className={styles.or}>or </span>
                <Link className={styles.loginLink} to="/login">
                  Log In
                </Link>
              </p>
            </div>
            {regStatus === "failed" && (
              <p className={styles.submitStatus}>Registration {regStatus}!</p>
            )}
            {regError && <p className={styles.submitError}>{regError}</p>}
          </Form>
        );
      }}
    </Formik>
  );
};

export default React.memo(RegistrationForm);
