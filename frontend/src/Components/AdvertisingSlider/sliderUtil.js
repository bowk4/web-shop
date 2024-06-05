import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import styles from "./Slider.module.scss";

export const renderSliderContent = ({
  slider,
  styles,
  SliderAsset,
  Link,
  Sakura,
}) => {
  if (!slider) return null;

  switch (slider.type) {
    case "type1":
      return (
        <div className={styles.slider}>
          <SliderAsset />
          <div className={styles.bannerWrapper}>
            <div className={styles.item}>
              <img
                className={styles.miniImgFirst}
                src={slider.miniImg}
                alt="miniPhone"
              />
            </div>

            <div className={styles.infoWrapper}>
              <h2 className={styles.titleFirst}>{slider.title}</h2>
              <Link to="/phones" className={styles.linkBtn}>
                Learn More
              </Link>
              <p className={styles.subtitleFirst}>{slider.subtitle}</p>
            </div>
          </div>
        </div>
      );
    case "type2":
      return (
        <div className={styles.sliderSecond}>
          <div className={styles.bannerWrapperSecond}>
            <div className={styles.infoWrapper}>
              <h2 className={styles.titleSecond}>{slider.title}</h2>
              <Link to="/phones" className={styles.linkBtnSecond}>
                Learn More
              </Link>
              <p className={styles.subtitleSecond}>{slider.subtitle}</p>
            </div>
          </div>
        </div>
      );
    case "type3":
      return (
        <div className={styles.sliderThird}>
          <div className={styles.bannerWrapperSecond}>
            <div className={styles.infoWrapper}>
              <h2 className={styles.titleThird}>{slider.title}</h2>
              <Link to="/phones" className={styles.linkBtnThird}>
                Buy
              </Link>
              <Sakura />
              <p className={styles.subtitleThird}>{slider.subtitle}</p>
            </div>
          </div>
        </div>
      );
    default:
      return null;
  }
};

export const useFetchSliders = () => {
  const [sliders, setSliders] = useState(null);

  useEffect(() => {
    axios
      .get("/api/advertising-sliders")
      .then((response) => {
        setSliders(response.data.data);
      })
      .catch((error) => {
        console.error("There was a problem with fetch:", error);
      });
  }, []);

  return sliders;
};

export const useSliderNavigation = (sliders, currentIndex) => {
  const [index, setIndex] = useState(currentIndex);

  const prevSlide = () => {
    const newIndex = index === 0 ? sliders?.length - 1 : index - 1;
    setIndex(newIndex);
  };

  const nextSlide = useCallback(() => {
    const newIndex = index === sliders?.length - 1 ? 0 : index + 1;
    setIndex(newIndex);
  }, [index, sliders]);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, [index, nextSlide]);

  return {
    currentIndex: index,
    prevSlide,
    nextSlide,
  };
};

export const SliderAsset = () => {
  return (
    <div className={styles.headStar}>
      <div className={styles.stars}></div>
      <div className={styles.stars2}></div>
      <div className={styles.stars3}></div>
    </div>
  );
};

export const Sakura = () => {
  return (
    <div className={styles.sakura}>
      <img
        src="https://res.cloudinary.com/de71eui6p/image/upload/v1712230956/Slider/msm9m0ykohy59kll1c68.gif"
        alt="sakura"
      />
    </div>
  );
};
