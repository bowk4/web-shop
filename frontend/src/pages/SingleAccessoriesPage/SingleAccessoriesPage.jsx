import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SelectableImageGallery from "../../Components/SelectableImageGallery/SelectableImageGallery";
import styles from "./SingleAccessoriesPage.module.scss";
import Favorite from "../../Components/Favorite/Favorite";
import TechSpecs from "../../Components/ProductTechSpecs/ProductTechSpecs";
import ProductAbout from "../../Components/ProductAbout/ProductAbout";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetOne } from "../../store/favorites/favoriteSlice";
import CartButton from "../../Components/Cart/CartButton/CartButton";

const SingleAccessoriesPage = () => {
  const dispatch = useDispatch();
  const { accessoryId } = useParams();
  const [accessories, setAccessories] = useState();

  const favor = useSelector((state) => state.favorite.favorites);
  let some = favor?.some((el) => accessories?.id === el?.id);
  const [activeAccessoryId, setActiveAccessoryId] = useState(null);
  const [accessoryAvailable, setAccessoryAvailable] = useState(true);

  const cartItems = useSelector((state) => state.cart.cartItems);
  const inCart = cartItems?.some(
    (item) => item?.customId === activeAccessoryId
  );

  useEffect(() => {
    fetch(`/api/accessories-models/${accessoryId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        return response.json();
      })
      .then((data) => {
        setAccessoryAvailable(data?.available);
        setActiveAccessoryId(data?.id);
        setAccessories(data);
      })
      .catch((error) => {
        console.error("There was a problem with your fetch operation:", error);
      });
  }, [accessoryId]);

  return (
    <>
      {accessories && (
        <div className={styles.container}>
          <h2 className={styles.productTitle}>{accessories?.name}</h2>
          <div className={styles.content}>
            <div className={styles.imagesAndCustomizationWrapper}>
              <div className={styles.outerImagesWrapper}>
                <SelectableImageGallery
                  images={accessories?.colors[0]?.pictures}
                />
              </div>
              <div className={styles.outerCustomizationWrapper}>
                <div className={styles.productCustomizationWrapper}>
                  <div className={styles.priceWrapper}>
                    <div className={styles.actualPrice}>
                      ${accessories?.price}
                    </div>
                  </div>
                  <div className={styles.buttonsWrapper}>
                    <CartButton
                      isAvailable={accessoryAvailable}
                      inCart={inCart}
                      fetchDetailsUrl={`/api/accessories/byProductId/${activeAccessoryId}`}
                      heightBtn="48px"
                      notifyCategory="accessories"
                      notifyProductId={accessories?.name}
                    />

                    <Favorite
                      click={() =>
                        dispatch(
                          fetchGetOne(
                            `/api/accessories/byProductId/${activeAccessoryId}`
                          )
                        )
                      }
                      some={some}
                      size="48px"
                    />
                  </div>
                  <div>
                    <TechSpecs
                      techSpecs={
                        accessories?.techSpecs.length > 4
                          ? accessories?.techSpecs.slice(0, 4)
                          : accessories?.techSpecs
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.aboutAndTechSpecsWrapper}>
              <div className={styles.aboutSection}>
                <h3 className={styles.aboutHeader}>About</h3>
                {accessories?.about?.map((item, index) => {
                  return (
                    <ProductAbout
                      key={index}
                      title={item?.title}
                      text={item?.text}
                    />
                  );
                })}
              </div>
              <div className={styles.techSpecsSection}>
                <h3 className={styles.techSpecsHeader}>Tech specs</h3>
                <TechSpecs techSpecs={accessories?.techSpecs} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

SingleAccessoriesPage.propTypes = {};

export default SingleAccessoriesPage;
