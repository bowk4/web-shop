import React, { useState } from "react";
import { Form, Formik } from "formik";
import validationSchema from "../UserUpdatePass/validationSchema";
import { sendAuthorizedRequest } from "../../../helpers/sendRequest";
import InputWithStrength from "../../../Components/Profile/InputWithStrength/InputWithStrength";
import { useDispatch, useSelector } from "react-redux";
import ButtonProfile from "../../../Components/Profile/ButtonProfile/ButtonProfile";
import styles from "./UserUpdatePass.module.scss";
import Input from "../../../Components/Profile/CustomInput/Input";
import { useNavigate } from "react-router-dom";
import { removeUser } from "../../../store/user/userSlice";
import stylesBack from "../../CartPage/CartPage.module.scss";
import LeftArrowIcon from "../../../Components/Icons/LeftArrowIcon";
import toast from "react-hot-toast";
import { deleteCartLocal } from "../../../store/cart/cartSlice";
import { SetFavor } from "../../../store/favorites/favoriteSlice";
import { SetOrder } from "../../../store/orders/OrderNew";

const UserUpdatePass = () => {
  const [err, setErr] = useState(false);
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

  const handleLogoutAndRedirect = () => {
    dispatch(removeUser());
    dispatch(deleteCartLocal());
    dispatch(SetFavor([]));
    dispatch(SetOrder([]));
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("orders");
    sessionStorage.removeItem("prevPath");
    navigate("/login");
  };

  const handleSubmit = async (values) => {
    if (values.newPassword !== values.newPasswordConfirm) {
      setErr("New password or confirmation does not match", true);
      return;
    }

    try {
      const requestBody = {
        userId: user._id,
        password: values.password,
        newPassword: values.newPassword,
      };
      await sendAuthorizedRequest(`/api/customers/password`, "PUT", {
        body: JSON.stringify(requestBody),
      });
      toast.success("Password successfully changed");
      setErr(false);
      handleLogoutAndRedirect();
    } catch (errors) {
      setErr(true);
      toast.error("Oops, Server Error!");
    }
  };

  // useEffect(() => {
  //   if (valuesToSubmit) {
  //     const requestBody = {
  //       userId: user._id,
  //       password: valuesToSubmit.password,
  //       newPassword: valuesToSubmit.newPassword,
  //     };
  //     sendAuthorizedRequest(`/api/customers/password`, "PUT", {
  //       body: JSON.stringify(requestBody),
  //     })
  //       .then((r) => {
  //         setErr(false);
  //         setSuccessfulMessage(true); // Встановлюємо флаг успішного відправлення пароля
  //         handleLogoutAndRedirect()
  //       })
  //       .catch((error) => {
  //         toast.error("Oops, Server Error!");
  //       });
  //   }
  // }, [valuesToSubmit, user]);

  return (
    <section className={styles.container}>
      <div className={stylesBack.backBtnWrapper} onClick={handleBack}>
        <LeftArrowIcon />
        <span className={stylesBack.backBtn}>Back</span>
      </div>
      <div className={styles.changePassContainer}>
        <Formik
          initialValues={{
            password: "",
            newPassword: "",
            newPasswordConfirm: "",
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({ values, errors, touched, handleChange }) => (
            <Form
              className={styles.updatePassForm}
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(values);
              }}
            >
              <div className={styles.sectionTitle}>
                <h2 className={styles.dataTitle}>Update Password</h2>
              </div>
              <Input
                name="password"
                className={styles.dataInput}
                type="password"
                placeholder="Your password"
                label="Your old password"
                maxLength={20}
                value={values.password}
                // style={errors.password && touched.password}
              />
              <InputWithStrength
                name="newPassword"
                className={styles.dataInput}
                placeholder="New password"
                label="Your new password"
                maxLength={20}
                value={values.newPassword}
                handleChange={handleChange}
                error={errors.newPassword && touched.newPassword}
                style={
                  errors.newPassword && touched.newPassword
                    ? { border: "1px solid #eb5757" }
                    : {}
                }
              />
              <InputWithStrength
                name="newPasswordConfirm"
                className={styles.dataInput}
                placeholder="Confirm new password"
                label="Confirm your new password"
                maxLength={20}
                value={values.newPasswordConfirm}
                handleChange={handleChange}
                error={errors.newPasswordConfirm && touched.newPasswordConfirm}
                style={
                  errors.newPasswordConfirm && touched.newPasswordConfirm
                    ? { border: "1px solid #eb5757" }
                    : {}
                }
              />
              {err && values.newPasswordConfirm && (
                <p className={styles.diffPassError}>{err}</p>
              )}
              <div className={styles.updateDataBtnBlock}>
                {err && (
                  <p className={styles.diffPassError2}>
                    Update password failed! Check your old password
                  </p>
                )}
                <ButtonProfile
                  type="submit"
                  text="Update password"
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

export default UserUpdatePass;
