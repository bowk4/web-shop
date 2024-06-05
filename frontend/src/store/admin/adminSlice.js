import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    selectedOption: {
      title: "Product Quantity",
      label: "Mobile",
    },
  },
  reducers: {
    setSelectedOption(state, action) {
      state.selectedOption = action.payload;
    },
  },
});

export default adminSlice.reducer;
export const { setSelectedOption } = adminSlice.actions;
