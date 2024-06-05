import React, { useEffect, useState } from "react";
import TwitterIcon from "../../Components/Icons/TwitterIcon";
import FacebookIcon from "../../Components/Icons/FacebookIcon";
import InstagramIcon from "../../Components/Icons/InstagramIcon";
import MapContent from "../../Components/MapContent/MapContent";
import Social from "./Social/Social";
import CityTab from "./LocationAddress/CityTab";
import AddressInfo from "./LocationAddress/AddressInfo";
import axios from "axios";
import styles from "./ContactsPage.module.scss";

const ContactsPage = () => {
  const [activeTab, setActiveTab] = useState();
  const [isHovered, setIsHovered] = useState(false);
  const [salePoints, setSalePoints] = useState([]);

  useEffect(() => {
    setActiveTab("Kyiv");
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("/api/sale-points")
      .then((response) => {
        setSalePoints(response.data);
      })
      .catch((error) => {
        console.error("Error by getting addresses:", error);
      });
  };

  const handleTabClick = (addressId) => {
    setActiveTab(addressId);
  };

  const handleHovered = () => {
    setIsHovered(!isHovered);
  };

  return (
    <div className={styles.container}>
      <div className={styles.backgroundImg}></div>
      <h1 className={styles.contactTitle}>Contact Us</h1>
      <ul className={`${styles.contactsWrapper} ${styles.container}`}>
        <li className={`${styles.contactItem} ${styles.hour}`}>
          <h3 className={styles.address}>Address</h3>
          <div className={styles.cityTitle}>
            {salePoints.map((point) => (
              <CityTab
                key={point._id}
                cityName={point.cityName} // Припускаю, що у вас є властивість cityName в об'єкті даних про адресу
                address={point.address}
                activeTab={activeTab}
                handleTabClick={handleTabClick}
              />
            ))}
          </div>
          <div className={styles.addressWrap}>
            {salePoints.map((point) => (
              <AddressInfo
                key={point._id}
                cityName={point.cityName}
                address={point.address}
                activeTab={activeTab}
              />
            ))}
          </div>
        </li>
        <li className={`${styles.contactItem} ${styles.map}`}>
          <div className={styles.mapWrapper}>
            <MapContent activeTab={activeTab} />
            <div className={styles.frameTablet}></div>
          </div>
        </li>
      </ul>
      <ul className={`${styles.socialWrapper} ${styles.container}`}>
        <li className={styles.connection}>
          <p>Support:</p>
          <a href="mailto:nicegadgets@tune.com">
            <p className={styles.connectionItem}>nicegadgets@tune.com</p>
          </a>
        </li>
        <li className={styles.connection}>
          <p>HotLine:</p>
          <p
            onMouseOver={handleHovered}
            className={
              isHovered
                ? `${styles.connectionItem} ${styles.rotateOnHover}`
                : styles.connectionItem
            }
          >
            8 (800) 371 1137
          </p>
        </li>

        <li className={styles.connection}>
          <h3>FOLLOW US ON SOCIAL MEDIA</h3>

          <a
            href="https://t.me/nicegadgetstore"
            target="_blank"
            rel="noreferrer"
          >
            <Social style={styles.twitterIcon}>
              <TwitterIcon />
            </Social>
          </a>

          <a
            href="https://www.facebook.com/groups/258628787334330"
            target="_blank"
            rel="noreferrer"
          >
            <Social style={styles.facebookIcon}>
              <FacebookIcon />
            </Social>
          </a>

          <a
            href="https://www.instagram.com/n1cegadgetstore"
            target="_blank"
            rel="noreferrer"
          >
            <Social style={styles.instagramIcon}>
              <InstagramIcon />
            </Social>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default ContactsPage;
