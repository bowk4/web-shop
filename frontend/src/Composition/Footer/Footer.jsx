import React, { useEffect, useState } from "react";
import styles from "./Footer.module.scss";
import UpArrowIcon from "../../Components/Icons/UpArrowIcon";
import Logo from "../../Components/Icons/Logo";
import OkIcon from "../../Components/Icons/OkIcon";
import scrollUp from "../../helpers/scrollUp";
import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  const [activeTab, setActiveTab] = useState("/");
  const location = useLocation();

  const handleTab = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    setActiveTab(location.pathname);
  }, [location]);

  return (
    <footer className={styles.footer}>
      <div className={`${styles.rectangleFooter} ${styles.container}`}>
        <div className={styles.logo}>
          <Logo />
          <div className={styles.ok}>
            <OkIcon />
          </div>
        </div>
        <ul className={styles.policy}>
          <li>
            <a href="https://github.com/" target="_blank" rel="noreferrer">
              Github
            </a>
          </li>
          <li>
            <Link
              onClick={() => handleTab("/contacts")}
              className={activeTab === "/contacts" ? styles.activeLink : ""}
              to="/contacts"
            >
              Contacts
            </Link>
          </li>
          <li>
            <Link
              onClick={() => handleTab("/rights")}
              className={activeTab === "/rights" ? styles.activeLink : ""}
              to="/rights"
            >
              Rights
            </Link>
          </li>
        </ul>
        <div className={styles.backTop}>
          <p>Back to top</p>
          <div onClick={scrollUp} className={styles.arrow}>
            <UpArrowIcon />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
