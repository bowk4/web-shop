import React from "react";
import styles from "./FavoritesPage.module.scss";
import Card from "../../Components/Cards/Card";
import { useSelector } from "react-redux";
import CardAccessories from "../../Components/Cards/CardAccessories";

const FavoritesPage = () => {
  const favor = useSelector((state) => state.favorite?.favorites);

  return (
    <div className={styles.container}>
      <>
        <h1 className={styles.favoritesPageTitle}>Favorites</h1>
        <div className={styles?.favoritesOutLet}>
          {favor.length !== 0 ? (
            favor.map((el) => {
              const screen = el.screen?.split(` `);

              if (el.category === `phones`) {
                return (
                  <div key={el.id}>
                    <Card
                      key={el?._id}
                      id={el.id}
                      _id={el._id}
                      picture={el.picture}
                      name={el.name}
                      price={el.price}
                      screen={screen[0]}
                      capacity={el?.capacity}
                      ram={el?.ram[0]}
                      refModel={el?.refModel}
                      color={el.color}
                      category={el.category}
                      available={el.available}
                      discount={el.discount}
                    />
                  </div>
                );
              } else if (el.category === `tablets`) {
                return (
                  <div key={el.id}>
                    <Card
                      key={el?.id}
                      id={el.id}
                      _id={el._id}
                      picture={el.picture}
                      name={el.name}
                      price={el.price}
                      screen={screen[0]}
                      capacity={el.capacity}
                      ram={el?.ram[0]}
                      refModel={el.refModel}
                      color={el.color}
                      category={el.category}
                      available={el.available}
                      discount={el.discount}
                    />
                  </div>
                );
              } else {
                return (
                  <div key={el.id}>
                    <CardAccessories key={el.id} {...el} />
                  </div>
                );
              }
            })
          ) : (
            <div className={styles.emptyMessageWrapper}>
              <p className={styles.emptyMessage}>Your Favorites is empty</p>
            </div>
          )}
        </div>
      </>
    </div>
  );
};

export default FavoritesPage;
