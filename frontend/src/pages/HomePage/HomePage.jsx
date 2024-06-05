import React from "react";
import ShopByCategory from "../../Components/ShopByCategory/ShopByCategory";
import Slider from "../../Components/AdvertisingSlider/Slider";
import BrandNews from "../../Components/BrandNews/BrandNews";
import NeedHelp from "../../Components/FAQchat/Needhelp";
import HotPrices from "../../Components/HotPrices/HotPrices";
import styles from "./HomePage.module.scss";

const HomePage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.homePageTitle}>Welcome to Nice Gadgets store!</h1>
      <section>
        <NeedHelp />
      </section>

      <section className={styles.homePageSection}>
        <Slider />
      </section>

      <section className={styles.homePageSection}>
        <BrandNews />
      </section>

      <section className={styles.homePageSection}>
        <ShopByCategory />
      </section>

      <section className={styles.homePageSection}>
        <HotPrices />
      </section>
    </div>
  );
};

export default HomePage;
