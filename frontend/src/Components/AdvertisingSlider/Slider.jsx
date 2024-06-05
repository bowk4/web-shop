import React from "react";
import styles from "./Slider.module.scss";
import LeftArrowIcon from "../Icons/LeftArrowIcon";
import RightArrowIcon from "../Icons/RightArrowIcon";
import {
  renderSliderContent,
  useFetchSliders,
  useSliderNavigation,
} from "./sliderUtil";
import { Link } from "react-router-dom";
import { SliderAsset, Sakura } from "./sliderUtil";

const Slider = () => {
  const sliders = useFetchSliders();
  const { currentIndex, prevSlide, nextSlide } = useSliderNavigation(
    sliders,
    0
  );

  return (
    <>
      {sliders && sliders.length > 0 && sliders[currentIndex] && (
        <div className={styles.sliderWrapper}>
          <div className={styles.leftArrow} onClick={prevSlide}>
            <LeftArrowIcon />
          </div>
          <div>
            {renderSliderContent({
              slider: sliders[currentIndex],
              currentIndex,
              styles,
              SliderAsset,
              Link,
              Sakura,
            })}
          </div>
          <div className={styles.rightArrow} onClick={nextSlide}>
            <RightArrowIcon />
          </div>
        </div>
      )}
    </>
  );
};

export default React.memo(Slider);
