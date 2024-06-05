import React from "react";
import styles from "./RightsPage.module.scss";

const RightsPage = () => {
  return (
    <article className={styles.container}>
      <h1 className={styles.rightTitle}>Customer Rights Policy</h1>
      <ul className={styles.rightPolicies}>
        <li className={styles.rightItem}>
          {" "}
          At NICE GADGETS, we prioritize customer satisfaction and strive to
          ensure that your shopping experience is as seamless and enjoyable as
          possible. As part of our commitment to transparency and fairness, we
          have outlined the following customer rights policy:
        </li>
        <li className={styles.rightItem}>
          {" "}
          Product Quality Assurance: We guarantee the quality and authenticity
          of all products sold on our platform. Every item undergoes rigorous
          quality checks before being made available for purchase.
        </li>
        <li className={styles.rightItem}>
          Accurate Product Descriptions: We provide detailed and accurate
          descriptions for each product, including specifications, features, and
          functionalities. If you have any questions or concerns regarding a
          product, our customer support team is readily available to assist you.
        </li>
        <li className={styles.rightItem}>
          {" "}
          Fair Pricing: We are dedicated to offering competitive prices for our
          products. Our pricing policies are transparent, and we strive to
          provide value for your money.
        </li>
        <li className={styles.rightItem}>
          {" "}
          Easy Returns and Exchanges: If you are not completely satisfied with
          your purchase, you may return or exchange it within 15 days of
          receipt, provided that the product is in its original condition and
          packaging. Please refer to our Returns and Exchanges Policy for more
          information.
        </li>
        <li className={styles.rightItem}>
          Secure Payment Transactions: Your payment information is encrypted and
          securely processed to ensure the confidentiality and integrity of your
          financial data. We accept various payment methods for your
          convenience.
        </li>
        <li className={styles.rightItem}>
          Privacy Protection: We respect your privacy and are committed to
          safeguarding your personal information. Our Privacy Policy outlines
          how we collect, use, and protect your data when you use our services.
        </li>
        <li className={styles.rightItem}>
          Timely Customer Support: Our dedicated customer support team is
          available to assist you with any inquiries, issues, or feedback you
          may have. You can reach us via email, live chat, or phone during our
          business hours.
        </li>
        <li className={styles.rightItem}>
          {" "}
          Consumer Rights Compliance: We adhere to all relevant consumer rights
          laws and regulations to ensure that your rights as a consumer are
          protected. If you have any concerns regarding your rights, please
          contact us, and we will address them promptly.
        </li>
        <li className={styles.rightItem}>
          NICE GADGETS is committed to providing a positive and fulfilling
          shopping experience for our valued customers. If you have any
          questions or require further assistance, please do not hesitate to
          contact us.
        </li>
        <li className={styles.rightItem}>
          {" "}
          Thank you for choosing NICE GADGETS !
        </li>
      </ul>
    </article>
  );
};

export default RightsPage;
