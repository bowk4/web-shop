import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import styles from "./CheckoutForm.module.scss";
import Cash from "./icons/cash.png";
import Visa from "./icons/visa.png";
import Paypal from "./icons/paypal.png";
import MasterCard from "./icons/mastercard.png";
import Button from "../../Button/Button";
import {
  deleteCartServer,
  updateProductQuantities,
} from "../../../API/cartAPI";
import { deleteCartLocal } from "../../../store/cart/cartSlice";
import CustomInputCheckout from "../CustomInputCheckout/CustomInputCheckout";
import validationSchema from "./validationSchema";
import { useCartValidationModal } from "../../Checkout/hooks/useCartValidationModal";
import CheckoutModal from "../../Checkout/CheckoutModal/CheckoutModal";
import { useValidateCartAndNavigate } from "../../Checkout/hooks/useValidateCartAndNavigate";
import { useCreateOrder } from "../../Order/hooks/useCreateOrder";

const deliveryOptions = [
  { label: "OnePost", value: "OnePost" },
  { label: "FedEx", value: "FedEx" },
  { label: "Amazon", value: "Amazon" },
];

const paymentOptions = [
  { name: "Visa", icon: Visa },
  { name: "Mastercard", icon: MasterCard },
  { name: "PayPal", icon: Paypal },
  { name: "Cash", icon: Cash },
];

const CheckoutForm = () => {
  const [orderValidationErrors, setOrderValidationErrors] = useState({});
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.user);
  const isAuthorized = useSelector((state) => state.user.isAuthorized);
  const { isModalOpen, setValidationResults, validationResults, toggleModal } =
    useCartValidationModal();

  const createOrder = useCreateOrder();

  const handleCheckout = useValidateCartAndNavigate(
    toggleModal,
    setValidationResults,
    "/orders",
    async (values) => {
      const { success, error } = await createOrder(values);

      if (!success) {
        setOrderValidationErrors(error);
      } else {
        if (isAuthorized) {
          dispatch(updateProductQuantities(cartItems));
          dispatch(deleteCartServer());
        } else {
          dispatch(updateProductQuantities(cartItems));
          dispatch(deleteCartLocal());
        }

        navigate("/orders");
      }
    },
    true
  );

  const [initialValues, setInitialValues] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    deliveryAddress: "",
    deliveryMethod: "",
    paymentMethod: "Visa",
  });

  useEffect(() => {
    if (isAuthorized && userData) {
      let formattedPhoneNumber = "";
      if (userData.telephone) {
        const rawNumber = userData.telephone.replace("+380", "");
        formattedPhoneNumber = rawNumber.replace(
          /(\d{2})(\d{3})(\d{2})(\d{2})/,
          "+380 ($1) $2-$3-$4"
        );
      }

      setInitialValues((currentValues) => ({
        ...currentValues,
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        phoneNumber: formattedPhoneNumber,
        email: userData.email || "",
      }));
    }
  }, [isAuthorized, userData]);

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const onSubmit = async (values, actions) => {
    const submissionValues = { ...values };

    if (submissionValues.phoneNumber.startsWith("+")) {
      submissionValues.phoneNumber =
        "+" + submissionValues.phoneNumber.slice(1).replace(/\D/g, "");
    } else {
      submissionValues.phoneNumber = submissionValues.phoneNumber.replace(
        /\D/g,
        ""
      );
    }

    await handleCheckout(submissionValues);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      enableReinitialize
    >
      {({ isValid }) => (
        <>
          <Form className={styles.form}>
            <h2 className={styles.buyTittle}>Last step to buy</h2>

            <CustomInputCheckout
              label="First Name *"
              type="text"
              name="firstName"
              placeholder="First Name"
            />

            <CustomInputCheckout
              label="Last Name *"
              type="text"
              name="lastName"
              placeholder="Last Name"
            />

            <CustomInputCheckout
              label="Phone Number *"
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
            />

            <CustomInputCheckout
              label="Email *"
              type="email"
              name="email"
              placeholder="Email"
            />

            <CustomInputCheckout
              label="Delivery Address *"
              type="text"
              name="deliveryAddress"
              placeholder="ZIP Code, City, Address"
            />

            <CustomInputCheckout
              label="Delivery Method *"
              as="select"
              name="deliveryMethod"
            >
              <option value="" className={styles.options}>
                Select a delivery method
              </option>
              {deliveryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </CustomInputCheckout>

            <div className={styles.paymentWrapper}>
              <div className={styles.inputWrapper}>
                <label className={styles.labelTitle}>Payment Method *</label>

                <div role="group" className={styles.group}>
                  {paymentOptions.map((option) => (
                    <label key={option.name} className={styles.radioLabel}>
                      <Field
                        type="radio"
                        name="paymentMethod"
                        value={option.name}
                        className={styles.radioInput}
                      />
                      <img
                        src={option.icon}
                        alt={option.name}
                        className={styles.icon}
                      />
                      {option.name}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.btnWrapper}>
              <Button type="submit" disabled={!isValid} height="30px">
                Place Order
              </Button>
            </div>
            {Object.keys(orderValidationErrors).length > 0 && (
              <div className={styles.serverValidationErrors}>
                {Object.values(orderValidationErrors).map((error, index) => (
                  <p key={index}>{error}</p>
                ))}
              </div>
            )}
          </Form>
          {isModalOpen && (
            <CheckoutModal
              toggleModal={toggleModal}
              validationResults={validationResults}
            />
          )}
        </>
      )}
    </Formik>
  );
};

export default React.memo(CheckoutForm);
