import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cart/cartSlice";
import favoriteSlice from "./favorites/favoriteSlice";
import userSlice from "./user/userSlice";
import searchSlice from "./search/searchSlice";
import adminSlice from "./admin/adminSlice";
import OrderNew from "./orders/OrderNew";
export const store = configureStore({
  reducer: {
    favorite: favoriteSlice,
    cart: cartSlice,
    user: userSlice,
    search: searchSlice,
    admin: adminSlice,
    OrderNew: OrderNew,
  },
});
