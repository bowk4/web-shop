import React, { useState } from "react";
import styles from "./Needhelp.module.scss";
import FAQchat from "./FAQchat";

const NeedHelp = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isIconVisible, setIsIconVisible] = useState(true);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setIsIconVisible(!isIconVisible);
  };

  const closeIcon = () => {
    setIsModalOpen(false);
    setIsIconVisible(true);
  };

  return (
    <>
      {isIconVisible && (
        <div className={styles.helpIcon}>
          <img
            className={styles.support}
            src="https://res.cloudinary.com/de71eui6p/image/upload/v1711375642/Slider/vp21m1icja5nuoxzinl7.webp"
            onClick={toggleModal}
            alt="Support Icon"
          />
          <p className={styles.help}>Need Help ?</p>
        </div>
      )}

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div>
            <img
              src="https://res.cloudinary.com/de71eui6p/image/upload/v1711375515/Slider/cguy3tgdt14tkziuraj9.png"
              className={styles.close}
              onClick={closeIcon}
              alt="Close Icon"
            />
            <FAQchat />
          </div>
        </div>
      )}
    </>
  );
};

export default React.memo(NeedHelp);
