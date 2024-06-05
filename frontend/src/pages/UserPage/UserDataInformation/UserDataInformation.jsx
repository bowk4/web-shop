import React, { useEffect, useState } from "react";
import styles from "../UserDataInformation/UserDataInformation.module.scss";
import { Form, Formik } from "formik";
import validationSchema from "./validationSchema";
import ButtonProfile from "../../../Components/Profile/ButtonProfile/ButtonProfile";
import { sendAuthorizedRequest } from "../../../helpers/sendRequest";
import { useDispatch, useSelector } from "react-redux";
import stylesBack from "../../CartPage/CartPage.module.scss";
import LeftArrowIcon from "../../../Components/Icons/LeftArrowIcon";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../../../store/user/userSlice";
import CustomInput from "../../../Components/Forms/CustomInput/CustomInput";
import toast from "react-hot-toast";

const UserDataInformation = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleBack = () => {
    const prevPath = sessionStorage.getItem("prevPath") || "/";
    if (
      prevPath === "/cart" ||
      prevPath === "/login" ||
      prevPath === "/registration"
    ) {
      navigate("/");
    } else {
      navigate(prevPath);
    }
  };

  const [initialValues, setInitialValues] = useState({
    firstName: "",
    lastName: "",
    telephone: "",
    email: "",
    birthday: "",
    login: "",
    isAdmin: true,
  });

  useEffect(() => {
    if (user) {
      let formattedPhoneNumber = "";
      if (user.telephone) {
        const rawNumber = user.telephone.replace("+380", "");
        formattedPhoneNumber = rawNumber.replace(
          /(\d{2})(\d{3})(\d{2})(\d{2})/,
          "+380 ($1) $2-$3-$4"
        );
      }

      setInitialValues((currentValues) => ({
        login: user?.login || "",
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        email: user?.email || "",
        telephone: formattedPhoneNumber,
        birthday: user?.birthDate || "",
        isAdmin: user?.isAdmin,
      }));
    }
  }, [user]);

  const handleSubmit = async (values) => {
    try {
      const requestBody = {
        firstName: values.firstName,
        lastName: values.lastName,
        login: values.login,
        email: values.email,
        telephone: values.telephone,
        birthDate: values.birthday,
        isAdmin: values.isAdmin,
      };

      if (requestBody.telephone.startsWith("+")) {
        requestBody.telephone =
          "+" + requestBody.telephone.slice(1).replace(/\D/g, "");
      } else {
        requestBody.telephone = requestBody.telephone.replace(/\D/g, "");
      }

      await sendAuthorizedRequest(`/api/customers`, "PUT", {
        body: JSON.stringify(requestBody),
      });
      dispatch(updateUser(requestBody));
      toast.success("Information successfully updated");
      navigate("/user");
    } catch (error) {
      toast.error("Oops, Server Error!");
    }
  };

  return (
    <section className={styles.container}>
      <div className={stylesBack.backBtnWrapper} onClick={handleBack}>
        <LeftArrowIcon />
        <span className={stylesBack.backBtn}>Back</span>
      </div>
      <div className={styles.sectionDataUser}>
        <div className={styles.sectionTitle}>
          <h2 className={styles.dataTitle}>Edit Profile Information</h2>
        </div>
        <Formik
          initialValues={initialValues}
          enableReinitialize
          validationSchema={validationSchema}
          onSubmit={
            handleSubmit
            // .then(() => {
            //   setSubmitting(false);
            // })
            // .catch(() => {
            //   setSubmitting(false);
            // });
          }
        >
          {({ values, errors, touched, handleChange }) => (
            <Form
              className={styles.infoDataForm}
              onSubmit={(e) => {
                e.preventDefault();
                if (Object.keys(errors).length === 2 && !errors.birthday) {
                  handleSubmit(values);
                }
                console.log(Object.keys(errors).length);
                console.log(Object.keys(errors));
              }}
            >
              <CustomInput
                className={styles.dataInput}
                name="firstName"
                placeholder="First name"
                label="Your first name"
                error={
                  errors.firstName && touched.firstName
                    ? errors.firstName
                    : undefined
                }
                onChange={handleChange}
              />
              <CustomInput
                className={styles.dataInput}
                name="lastName"
                placeholder="Last name"
                label="Your last name"
                error={
                  errors.lastName && touched.lastName
                    ? errors.lastName
                    : undefined
                }
                onChange={handleChange}
              />
              <CustomInput
                className={styles.dataInput}
                name="login"
                placeholder="Login"
                label="Your Login"
                error={errors.login && touched.login ? errors.login : undefined}
                onChange={handleChange}
              />
              <CustomInput
                className={styles.dataInput}
                name="email"
                placeholder="example@gmail.com"
                label="Your Email"
                error={errors.email && touched.email ? errors.email : undefined}
                onChange={handleChange}
              />
              <CustomInput
                className={styles.dataInput}
                type="tel"
                name="telephone"
                placeholder="+380"
                label="Your phone number"
                error={
                  errors.telephone && touched.telephone
                    ? errors.telephone
                    : undefined
                }
                onChange={handleChange}
              />
              <CustomInput
                className={styles.dataInput}
                type="date"
                name="birthday"
                label="Your birthday"
                error={
                  errors.birthday && touched.birthday
                    ? errors.birthday
                    : undefined
                }
                onChange={handleChange}
              />
              <div className={styles.updateDataBtnBlock}>
                <ButtonProfile
                  type="submit"
                  text="Update information"
                  className={styles.updateDataBtn}
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default UserDataInformation;
