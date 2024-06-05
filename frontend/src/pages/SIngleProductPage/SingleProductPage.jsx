import React, { useMemo, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import styles from "./SingleProductPage.module.scss";
import ColorCircle from "../../Components/ColorCircle/ColorCircle";
import SelectableImageGallery from "../../Components/SelectableImageGallery/SelectableImageGallery";
import Capacities from "../../Components/Capacities/Capacities";
import ProductAbout from "../../Components/ProductAbout/ProductAbout";
import TechSpecs from "../../Components/ProductTechSpecs/ProductTechSpecs";
import Favorite from "../../Components/Favorite/Favorite";
import { capitalizeFirstLetterOfWord } from "../../helpers/capitalizeFirstLetterOfWord";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetOne } from "../../store/favorites/favoriteSlice";
import { useFetchModelData } from "./hooks/useFetchModelData";
import { useSelectedColorData } from "./hooks/useSelectedColorData";
import CartButton from "../../Components/Cart/CartButton/CartButton";
import BuyTogether from "../../Components/BuyTogether/BuyTogether";

const SingleProductPage = () => {
  const dispatch = useDispatch();
  const { modelId } = useParams();
  const location = useLocation();
  const pathname = location.pathname;

  const queryParams = new URLSearchParams(location.search);
  const [color, setColor] = useState(queryParams.get("color"));
  const [capacity, setCapacity] = useState(queryParams.get("capacity"));

  const arr = useMemo(() => pathname.split("/"), [pathname]);
  const typeModel = arr[arr.length - 2];

  const model = useFetchModelData(pathname, modelId, typeModel);

  const selectedColorData = useSelectedColorData(model, color);

  const chosenCapacityObject = selectedColorData?.capacities.find(
    (capacitiesObj) => capacitiesObj?.capacity === capacity
  );
  const favor = useSelector((state) => state.favorite.favorites);
  const some = favor.some((el) => chosenCapacityObject?.productId === el.id);

  const cartItems = useSelector((state) => state.cart.cartItems);
  const inCart = cartItems.some(
    (item) => item.customId === chosenCapacityObject?.productId
  );

  const handleCapacityClick = (capacity) => setCapacity(capacity);
  const handleColorClick = (color) => setColor(color);

  return (
    <>
      {model && (
        <div className={styles.container}>
          <h2 className={styles.productTitle}>
            {model?.name} {capitalizeFirstLetterOfWord(color)} {capacity} GB
          </h2>
          <div className={styles.content}>
            <div className={styles.imagesAndCustomizationWrapper}>
              <div className={styles.outerImagesWrapper}>
                {selectedColorData && selectedColorData?.pictures && (
                  <SelectableImageGallery
                    images={selectedColorData?.pictures}
                  />
                )}
              </div>
              <div className={styles.outerCustomizationWrapper}>
                <div className={styles.productCustomizationWrapper}>
                  <h4 className={styles.customizationHeader}>
                    Available colors
                  </h4>
                  <div className={styles.availableColors}>
                    {model?.colors.map((el) => {
                      return (
                        <ColorCircle
                          key={el?.colorName}
                          hexColor={el.hexColor}
                          color={el?.colorName}
                          isActive={el?.colorName === color}
                          pathname={pathname}
                          capacity={capacity}
                          changeColor={handleColorClick}
                          availabilityArr={el?.capacities}
                        />
                      );
                    })}
                  </div>
                  <div>
                    <h4 className={styles.customizationHeader}>
                      Select capacity
                    </h4>
                    <div className={styles.capacities}>
                      {selectedColorData?.capacities?.map((el, index) => {
                        return (
                          <Capacities
                            key={index}
                            capacityChange={handleCapacityClick}
                            color={color}
                            pathname={pathname}
                            capacityOption={el?.capacity}
                            actualCapacity={capacity}
                            availability={el?.available}
                          />
                        );
                      })}
                    </div>
                  </div>
                  <div className={styles.priceWrapper}>
                    {chosenCapacityObject?.discount ? (
                      <>
                        <div className={styles.actualPrice}>
                          $
                          {Math.round(
                            chosenCapacityObject?.price *
                              (1 - chosenCapacityObject?.discount)
                          )}
                        </div>
                        <div className={styles.priceCheck}>
                          ${chosenCapacityObject?.price}
                        </div>
                      </>
                    ) : (
                      <div className={styles.actualPrice}>
                        ${chosenCapacityObject?.price}
                      </div>
                    )}
                  </div>
                  <div className={styles.buttonsWrapper}>
                    <CartButton
                      isAvailable={chosenCapacityObject?.available}
                      inCart={inCart}
                      fetchDetailsUrl={`/api/${typeModel}/byProductId/${chosenCapacityObject?.productId}`}
                      heightBtn="48px"
                      notifyCategory={typeModel}
                      notifyProductId={chosenCapacityObject?.productId}
                    />
                    <Favorite
                      click={() => {
                        dispatch(
                          fetchGetOne(
                            `/api/${typeModel}/byProductId/${chosenCapacityObject?.productId}`
                          )
                        );
                      }}
                      some={some}
                      size="48px"
                    />
                  </div>
                  <div>
                    <TechSpecs
                      techSpecs={
                        model?.techSpecs?.length > 4
                          ? model?.techSpecs?.slice(0, 4)
                          : model?.techSpecs
                      }
                      capacity={capacity}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.aboutAndTechSpecsWrapper}>
              <div className={styles.aboutSection}>
                <h3 className={styles.aboutHeader}>About</h3>
                {model?.about?.map((item, index) => {
                  return (
                    <ProductAbout
                      key={index}
                      text={item?.text}
                      title={item?.title}
                    />
                  );
                })}
              </div>
              <div className={styles.techSpecsSection}>
                <h3 className={styles.techSpecsHeader}>Tech specs</h3>
                <TechSpecs techSpecs={model?.techSpecs} capacity={capacity} />
              </div>
            </div>
          </div>
        </div>
      )}
      <section className={`${styles.container} ${styles.buyTogetherSection}`}>
        <BuyTogether />
      </section>
    </>
  );
};

export default SingleProductPage;
