import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  isAuthorized: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(state.user._id));
      state.isAuthorized = Object?.keys(state.user).length === 0 ? false : true;
    },

    removeUser: (state) => {
      state.user = {};
      state.isAuthorized = false;
    },

    updateUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { addUser, removeUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
