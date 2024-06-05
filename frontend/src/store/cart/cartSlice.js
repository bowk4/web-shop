import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCartItems,
  addToCartServer,
  incrementQuantityServer,
  decrementQuantityServer,
  removeFromCartServer,
  synchronizeCartWithServer,
  validateCartItems,
  deleteCartServer,
} from "../../API/cartAPI";

const currentLocalInitialState = JSON.parse(localStorage.getItem("cart"));

const initialState = {
  cartItems: currentLocalInitialState || [],
  validationResults: [],
  status: "idle",
  error: null,
};

const saveCartToLocalStorage = (cartItems) => {
  localStorage.setItem("cart", JSON.stringify(cartItems));
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCartLocal: (state, action) => {
      const { productToAdd } = action.payload;
      const productExistsIndex = state.cartItems.findIndex(
        (item) => item.productId === productToAdd._id
      );

      if (productExistsIndex !== -1) {
        state.cartItems[productExistsIndex].cartQuantity += 1;
      } else {
        state.cartItems.push({
          productId: productToAdd._id,
          customId: productToAdd.id,
          ...productToAdd,
          cartQuantity: 1,
        });
      }
      saveCartToLocalStorage(state.cartItems);
    },
    removeFromCartLocal: (state, action) => {
      const { _id } = action.payload;
      state.cartItems = state.cartItems.filter(
        (item) => item.productId !== _id
      );
      saveCartToLocalStorage(state.cartItems);
    },
    incrementQuantityLocal: (state, action) => {
      const { _id } = action.payload;
      const index = state.cartItems.findIndex((item) => item.productId === _id);
      if (index !== -1) {
        state.cartItems[index].cartQuantity += 1;
      }
      saveCartToLocalStorage(state.cartItems);
    },
    decrementQuantityLocal: (state, action) => {
      const { _id } = action.payload;
      const index = state.cartItems.findIndex((item) => item.productId === _id);
      if (index !== -1) {
        state.cartItems[index].cartQuantity -= 1;
      }
      saveCartToLocalStorage(state.cartItems);
    },
    deleteCartLocal: (state) => {
      state.cartItems = [];
      localStorage.removeItem("cart");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        const products = action.payload.products || action.payload;
        state.cartItems = Array.isArray(products) ? products : [];
        state.status = "succeeded";
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(addToCartServer.fulfilled, (state, action) => {
        const products = action.payload.products;
        if (Array.isArray(products)) {
          state.cartItems = products;
        }
        state.status = "succeeded";
      })
      .addCase(incrementQuantityServer.fulfilled, (state, action) => {
        const products = action.payload.products;
        if (Array.isArray(products)) {
          state.cartItems = products;
        }
        state.status = "succeeded";
      })
      .addCase(decrementQuantityServer.fulfilled, (state, action) => {
        const products = action.payload.products;
        if (Array.isArray(products)) {
          state.cartItems = products;
        }
        state.status = "succeeded";
      })
      .addCase(removeFromCartServer.fulfilled, (state, action) => {
        const products = action.payload.products;
        if (Array.isArray(products)) {
          state.cartItems = products;
        } else {
          state.cartItems = [];
        }
        state.status = "succeeded";
      })
      .addCase(removeFromCartServer.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeFromCartServer.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(synchronizeCartWithServer.fulfilled, (state, action) => {
        const synchronizedProducts = action.payload.products;

        if (Array.isArray(synchronizedProducts)) {
          state.cartItems = synchronizedProducts;
        }
        state.status = "succeeded";
      })
      .addCase(synchronizeCartWithServer.pending, (state) => {
        state.status = "loading";
      })
      .addCase(synchronizeCartWithServer.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(validateCartItems.fulfilled, (state, action) => {
        state.validationResults = action.payload.errors;
      })
      .addCase(deleteCartServer.fulfilled, (state) => {
        state.cartItems = [];
      });
  },
});

export const {
  addToCartLocal,
  removeFromCartLocal,
  incrementQuantityLocal,
  decrementQuantityLocal,
  deleteCartLocal,
} = cartSlice.actions;

export default cartSlice.reducer;
