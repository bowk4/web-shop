import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./FAQchat.module.scss";

const FAQchat = () => {
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [faqData, setFaqData] = useState([]);

  useEffect(() => {
    axios
      .get("/api/faq")
      .then((response) => {
        setFaqData(response.data);
      })
      .catch((error) => {
        console.error("Ошибка при получении данных FAQ:", error);
      });
  }, []);

  const handleQuestionClick = (index) => {
    setSelectedQuestion(selectedQuestion === index ? null : index);
  };

  return (
    <div className={styles.chatWrapper}>
      <img
        className={styles.backImg}
        src="https://res.cloudinary.com/de71eui6p/image/upload/v1711375123/Slider/qqtf1vmuwdo46x9cvisv.webp"
        alt="back"
      />
      {faqData.map((item, index) => (
        <div key={index} className={styles.faqItem}>
          <div
            className={styles.faqQuestion}
            onClick={() => handleQuestionClick(index)}
          >
            {item.title}
          </div>
          <div
            className={`${styles.faqAnswer} ${selectedQuestion === index ? styles.visible : ""}`}
          >
            <ul>
              {item.subtitle &&
                item.subtitle.advantages &&
                item.subtitle.advantages.map((advantage, advantageIndex) => (
                  <li key={advantageIndex}>{advantage}</li>
                ))}
            </ul>
          </div>
        </div>
      ))}
      <div className={styles.conctactbtn}>
        <div>
          <a
            href="https://t.me/nicegadgetstore"
            target="_blank"
            rel="noreferrer"
          >
            <img
              className={styles.linkSocial}
              src="https://res.cloudinary.com/de71eui6p/image/upload/v1711375286/Slider/zwpnzpy4gdrardowloam.webp"
              alt="Telegram"
            />
          </a>
        </div>
        <div>
          <a
            href="https://www.instagram.com/n1cegadgetstore"
            target="_blank"
            rel="noreferrer"
          >
            <img
              className={styles.linkSocial}
              src="https://res.cloudinary.com/de71eui6p/image/upload/v1711375285/Slider/iypblt7wvhyl9vjywwdr.webp"
              alt="Instagram"
            />
          </a>
        </div>
        <div>
          <a
            href="https://www.facebook.com/groups/258628787334330"
            target="_blank"
            rel="noreferrer"
          >
            <img
              className={styles.linkSocial}
              src="https://res.cloudinary.com/de71eui6p/image/upload/v1711375284/Slider/ba2xqvptwh9cpu5ekzij.webp"
              alt="Facebook"
            />
          </a>
        </div>
        <div>
          <a
            href="mailto:testfrontendmail@gmail.com"
            target="_blank"
            rel="noreferrer"
          >
            <img
              className={styles.linkSocial}
              src="https://res.cloudinary.com/de71eui6p/image/upload/v1711375285/Slider/xqxh0u9umai1oa91dgg8.webp"
              alt="Gmail"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default React.memo(FAQchat);
