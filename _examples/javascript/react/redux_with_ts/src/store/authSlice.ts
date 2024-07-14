import { createSlice } from "@reduxjs/toolkit";

export interface State {
  user: { name: string; id: number };
  isLoggedIn: boolean;
}

const initialState: State = {
  user: { name: "Not Singed in", id: 0 },
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authenticateUser: (state, action) => {
      const { user } = action.payload;
      state.user = user;
      state.isLoggedIn = true;
    },

    logout: (state) => {
      state.user = { name: "Not Singed in", id: 0 };
      state.isLoggedIn = false;
    },
  },
});

export const { authenticateUser, logout } = authSlice.actions;
export default authSlice;
