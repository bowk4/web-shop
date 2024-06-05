import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const synchronizeOrder = createAsyncThunk(
  "todos/synchronizeOrder",
  async function (_, { rejectWithValue }) {
    try {
      const userId = localStorage.getItem("user");
      const orders = JSON.parse(localStorage.getItem("orders")) || [];
      const resultSlice = userId.slice(1, -1);

      const responseData = [];

      if (resultSlice && orders.length > 0) {
        for (const order of orders) {
          const response = await fetch(
            `/api/orders/synchronize/${order.orderNo}`,
            {
              method: `PUT`,
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                customerId: resultSlice,
                order: order,
              }),
            }
          );

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          const data = await response.json();
          responseData.push(data);
        }
      }

      return responseData;
    } catch (error) {
      console.warn("Error orders synchronization:", error);
      return rejectWithValue(error);
    }
  }
);

export const orderAddNewUnAvt = createAsyncThunk(
  "todos/orderAddNewUnAvt",
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/orders`, {
        method: `POST`,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(
          data.validationErrors
            ? data.validationErrors
            : { serverError: "Network response was not ok." }
        );
      }

      return data;
    } catch (error) {
      return rejectWithValue({ serverError: error.toString() });
    }
  }
);
export const orderAddNew = createAsyncThunk(
  "todos/orderAddNew",
  async (orderData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("user");
      const resultSlice = userId.slice(1, -1);

      if (token && resultSlice) {
        const response = await fetch(`/api/orders`, {
          method: `POST`,
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify(orderData),
        });

        const data = await response.json();

        if (!response.ok) {
          return rejectWithValue(
            data.validationErrors
              ? data.validationErrors
              : { serverError: "Network response was not ok." }
          );
        }

        return data;
      }
    } catch (error) {
      return rejectWithValue({ serverError: error.toString() });
    }
  }
);
export const orderGetNew = createAsyncThunk(
  "todos/orderGetNew",
  async function () {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("user");
      const resultSlice = userId?.slice(1, -1);

      if (!token || !resultSlice) {
        throw new Error("Token or user ID is missing");
      }

      const response = await fetch(`/api/orders`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
          customerId: resultSlice,
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      return data;
    } catch (error) {
      console.warn("Error fetching order:", error);
      throw error;
    }
  }
);

const OrderNew = createSlice({
  name: `orderNew`,
  initialState: {
    orders: JSON.parse(localStorage.getItem("orders")) || [],
  },
  reducers: {
    addOrderNew: (state, action) => {
      state.orders.push(action.payload);
    },
    SetOrder: (state, action) => {
      state.orders = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(orderGetNew.fulfilled, (state, action) => {
      state.orders = action.payload;
    });
    builder.addCase(orderAddNew.fulfilled, (state, action) => {
      state.orders.push(action.payload);
    });
    builder.addCase(orderAddNewUnAvt.fulfilled, (state, action) => {
      state.orders.push(action.payload);
    });
    builder.addCase(synchronizeOrder.fulfilled, (state, action) => {
      if (Array.isArray(action.payload)) {
        action.payload.forEach((order) => {
          state.orders.push(order);
        });
      } else {
        state.orders.push(action.payload);
      }
    });
    builder.addCase(orderAddNew.rejected, (state, action) => {
      state.orderValidationErrors = action.payload;
    });
    builder.addCase(orderAddNewUnAvt.rejected, (state, action) => {
      state.orderValidationErrors = action.payload;
    });
  },
});

export const { addOrderNew, SetOrder } = OrderNew.actions;
export default OrderNew.reducer;
