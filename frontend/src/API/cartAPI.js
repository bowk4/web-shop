import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartForUser",
  async (_, { getState, rejectWithValue }) => {
    const { isAuthorized } = getState().user;
    const token = localStorage.getItem("token");

    if (isAuthorized && token) {
      try {
        const response = await fetch("/api/cart", {
          method: "GET",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const cart = await response.json();
        return cart;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    } else {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      return cart;
    }
  }
);

export const addToCartServer = createAsyncThunk(
  "cart/addToCartServer",
  async ({ _id, category, ...productDetails }, { rejectWithValue }) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`/api/cart/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ _id, category, ...productDetails }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const incrementQuantityServer = createAsyncThunk(
  "cart/incrementCartItemQuantityServer",
  async (productId, { rejectWithValue }) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`/api/cart/increase/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ productId }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const decrementQuantityServer = createAsyncThunk(
  "cart/decrementCartItemQuantityServer",
  async (productId, { rejectWithValue }) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`/api/cart/decrease/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ productId }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeFromCartServer = createAsyncThunk(
  "cart/removeFromCartServer",
  async (productId, { rejectWithValue }) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`/api/cart/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const updatedCart = await response.json();
      return updatedCart;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const synchronizeCartWithServer = createAsyncThunk(
  "cart/synchronizeCartWithServer",
  async (_, { getState, dispatch }) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("User is not authorized or token is missing");
      return;
    }

    const localCartItems = JSON.parse(localStorage.getItem("cart")) || [];

    try {
      const response = await fetch("/api/cart/sync", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ products: localCartItems }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const synchronizedCart = await response.json();

      localStorage.removeItem("cart");

      return synchronizedCart;
    } catch (error) {
      console.error("Failed to synchronize cart:", error);
      throw error;
    }
  }
);

export const validateCartItems = createAsyncThunk(
  "cart/validateCartItems",
  async (cartItems, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/cart/validate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartItems),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.errors || "Unknown error");
      }

      const validationResult = await response.json();

      return validationResult;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteCartServer = createAsyncThunk(
  "cart/deleteCartServer",
  async (_, { getState, rejectWithValue }) => {
    const { isAuthorized } = getState().user;
    const token = localStorage.getItem("token");

    if (!isAuthorized || !token) {
      return rejectWithValue("User is not authorized.");
    }

    try {
      const response = await fetch("/api/cart", {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      return [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateProductQuantities = createAsyncThunk(
  "cart/updateProductQuantities",
  async (cartItems, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/cart/updateQuantities", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cartItems: cartItems }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
