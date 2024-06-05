import React from "react";
import PurchaseTracker from "./AdminOptionsContent/PurchaseTracker/PurchaseTracker";
import RemoveBrandNew from "./AdminOptionsContent/RemoveBrandNew/RemoveBrandNew";
import ChangeProductDiscount from "./AdminOptionsContent/ChangeProductDiscount/ChangeProductDiscount";
import IncreaseOrDecreaseProductQuantity from "./AdminOptionsContent/IncreaseOrDecreaseProductQuantity/IncreaseOrDecreaseProductQuantity";
import BanUser from "./AdminOptionsContent/BanUser/BanUser";
import UnbanUser from "./AdminOptionsContent/UnbanUser/UnbanUser";
import AddBrandNew from "./AdminOptionsContent/AddBrandNew/AddBrandNew";
import AddBannerSlider from "./AdminOptionsContent/AddBannerSlider/AddBannerSlider";
import RemoveBannerSlider from "./AdminOptionsContent/RemoveBannerSlider/RemoveBannerSlider";

const options = [
  {
    title: "Product Quantity",
    subOptions: [
      {
        label: "Mobile",
        component: <IncreaseOrDecreaseProductQuantity category="phones" />,
      },
      {
        label: "Tablet",
        component: <IncreaseOrDecreaseProductQuantity category="tablets" />,
      },
      {
        label: "Accessories",
        component: <IncreaseOrDecreaseProductQuantity category="accessories" />,
      },
    ],
  },
  {
    title: "Product Discount",
    subOptions: [
      {
        label: "Mobile",
        component: <ChangeProductDiscount category="phones" />,
      },
      {
        label: "Tablet",
        component: <ChangeProductDiscount category="tablets" />,
      },
    ],
  },
  {
    title: "Dashboard",
    subOptions: [
      {
        label: "Purchase Tracker",
        component: <PurchaseTracker />,
      },
    ],
  },
  {
    title: "Banner Slider",
    subOptions: [
      {
        label: "Remove",
        component: <RemoveBannerSlider />,
      },
      {
        label: "Add",
        component: <AddBannerSlider />,
      },
    ],
  },
  {
    title: "Brand New",
    component: <RemoveBrandNew />,
    subOptions: [
      {
        label: "Remove",
        component: <RemoveBrandNew />,
      },
      {
        label: "Add",
        component: <AddBrandNew />,
      },
    ],
  },
  {
    title: "Users management",
    subOptions: [
      {
        label: "Unban User",
        component: <UnbanUser />,
      },
      {
        label: "Ban User",
        component: <BanUser />,
      },
    ],
  },
];

export default options;
