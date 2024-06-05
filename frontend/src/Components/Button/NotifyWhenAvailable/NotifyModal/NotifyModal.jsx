import React from "react";
import PropTypes from "prop-types";
import styles from "./NotifyModal.module.scss";
import CloseIcon from "../../../Icons/CloseIcon";
import CustomEmailInput from "../CustomEmailInput/CustomEmailInput";

const NotifyModal = ({ toggleNotifyModal, productId, category }) => {
  return (
    <div
      className={styles.overlay}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        if (e.target.classList.contains(styles.overlay)) {
          toggleNotifyModal();
        }
      }}
    >
      <div className={styles.notifyModal}>
        <button onClick={toggleNotifyModal} className={styles.closeButton}>
          <CloseIcon />
        </button>
        <CustomEmailInput
          toggleNotifyModal={toggleNotifyModal}
          productId={productId}
          category={category}
        />
      </div>
    </div>
  );
};

NotifyModal.propTypes = {
  toggleNotifyModal: PropTypes.func.isRequired,
  productId: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};

export default React.memo(NotifyModal);
