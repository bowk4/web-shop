import React, { useEffect, useState } from "react";
import styles from "./UserPage.module.scss";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import UserInfoIcon from "../../Components/Icons/UserInfoIcon";
import UpdatePassIcon from "../../Components/Icons/UpdatePassIcon";
import UserProfileIcon from "../../Components/Icons/UserProfileIcon";
import { Form, Formik } from "formik";
import OrderIcon from "../../Components/Icons/OrderIcon";
import CounterIcon from "../../Components/Icons/CounterIcon";
import CustomInput from "../../Components/Forms/CustomInput/CustomInput";

const UserPage = () => {
  const { user } = useSelector((state) => state.user);
  const order = useSelector((state) => state.OrderNew.orders);

  const [initialValues, setInitialValues] = useState({
    firstName: "",
    lastName: "",
    telephone: "",
    email: "",
    birthday: "",
    login: "",
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
      }));
    }
  }, [user]);

  if (!Object.keys(user).length) {
    return (
      <>
        <div className={styles.container}>
          <section className={styles.unauthorizedWrapper}>
            <h3 className={styles.unauthorizedWrapperTitle}>
              You are not authorized
            </h3>
            <div className={styles.unauthorizedWrapperSubtitle}>
              Please,&nbsp;
              <NavLink to="/login" className={styles.unauthorizedLogin}>
                Login
              </NavLink>{" "}
              or&nbsp;
              <Link to="/registration" className={styles.unauthorizedSignup}>
                Signup
              </Link>{" "}
              to gain access
            </div>
          </section>
        </div>
      </>
    );
  } else {
    return (
      <>
        <section className={styles.container}>
          <div className={styles.userContainer}>
            <section className={styles.sectionAvatar}>
              <div className={styles.avatarIcon}>
                <UserProfileIcon />
              </div>
              <div className={styles.registration__sectionTitle}>
                <p className={styles.registration__sectionTitleText}>
                  WELCOME,
                </p>
                <p className={styles.registration__sectionTitleName}>
                  {user?.firstName}&nbsp;!
                </p>
              </div>
            </section>

            <section className={styles.categoryUsers}>
              <div className={styles.login__registrationSection}>
                <Link
                  to="/update-information"
                  className={styles.linkCategoryUsers}
                >
                  Edit profile information
                </Link>
                <UserInfoIcon className={styles.iconForListUser} />
              </div>

              <div className={styles.login__registrationSection}>
                <Link
                  to="/update-password"
                  className={styles.linkCategoryUsers}
                >
                  Change password&nbsp;
                </Link>
                <UpdatePassIcon className={styles.iconForListUser} />
              </div>

              <Link
                className={`${styles.login__registrationSection}`}
                to="/orders"
              >
                <div>
                  <h2 className={styles.linkCategoryUsers}>Orders</h2>
                </div>
                <div className={styles.FavorWrapper}>
                  <OrderIcon />
                  <div
                    className={styles.wrapperCount}
                    style={{ display: order.length > 0 ? "flex" : "none" }}
                  >
                    <CounterIcon />
                    <span className={styles.FavorQuantity}>{order.length}</span>
                  </div>
                </div>
              </Link>
            </section>

            <section className={styles.userInfoContainer}>
              <div className={styles.userInformation}>
                <div className={styles.sectionTitle}>
                  <h3 className={styles.dataTitle}>Your profile information</h3>
                </div>
                <Formik
                  initialValues={initialValues}
                  enableReinitialize
                  onSubmit={(e) => e.preventDefault()}
                >
                  <Form className={styles.infoDataForm}>
                    <CustomInput
                      disabled
                      className={styles.dataInput}
                      name="firstName"
                      placeholder="First name"
                      label="Your First name:"
                    />
                    <CustomInput
                      disabled
                      className={styles.dataInput}
                      name="lastName"
                      placeholder="Last name"
                      label="Your Last name:"
                    />
                    <CustomInput
                      disabled
                      className={styles.dataInput}
                      name="login"
                      placeholder="Login"
                      label="Your Login:"
                    />
                    <CustomInput
                      disabled
                      className={styles.dataInput}
                      name="email"
                      placeholder="example@gmail.com"
                      label="Your Email:"
                    />
                    <CustomInput
                      disabled
                      className={styles.dataInput}
                      name="telephone"
                      placeholder="+380"
                      label="Your phone number:"
                    />
                    <CustomInput
                      disabled
                      className={styles.dataInput}
                      name="birthday"
                      label="Your Birthday:"
                    />
                  </Form>
                </Formik>
              </div>
            </section>
          </div>
        </section>
      </>
    );
  }
};

export default UserPage;
