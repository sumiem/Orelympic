import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: { uid: "", photoUrl: "", displayName: "" },
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = { uid: "", photoUrl: "", displayName: "" };
    },
    updateUserProfile: (state, action) => {
      state.user.displayName = action.payload.displayName;
      state.user.photoUrl = action.payload.photoUrl;
    },
  },
});

export const { login, logout, updateUserProfile } = userSlice.actions;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
