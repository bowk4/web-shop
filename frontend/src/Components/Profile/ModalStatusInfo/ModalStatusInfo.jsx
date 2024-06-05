import React, { useState } from "react";
import styles from "./ModalStatusInfo.module.scss";
import Close from "../../Icons/CloseIcon";
import PropTypes from "prop-types";

const ModalStatusInfo = ({ text, colorText, svgIcon, circleShowHide }) => {
  const [isOpen, setIsOpen] = useState(true);

  const textStyle = {
    color: colorText,
  };
  const isCircle = {
    width: "38px",
    height: "38px",
    borderRadius: "50%",
    border: circleShowHide + " solid #2FC72FF2",
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className={`${styles.modalWrapper} ${isOpen ? styles.open : ""}`}>
        <section className={styles.sectionContent}>
          <div className={styles.modalCloseWrapper} onClick={handleCloseModal}>
            <Close />
          </div>
          <div className={styles.modalContent}>
            <p className={styles.modalText} style={textStyle}>
              {text}
            </p>
          </div>
          <div className={styles.containerFigure} style={isCircle}>
            <div>{svgIcon}</div>
          </div>
        </section>
      </div>
    </>
  );
};

ModalStatusInfo.propTypes = {
  text: PropTypes.string.isRequired,
  colorText: PropTypes.string.isRequired,
  svgIcon: PropTypes.element.isRequired,
  circleShowHide: PropTypes.string,
};

export default React.memo(ModalStatusInfo);
