import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userLogin: [],
  isLoggedIn: false
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.userLogin = action.payload;
      state.isLoggedIn = true;
    },
    removeUser: (state) => {
      state.userLogin = [];
      state.isLoggedIn = false;
    }
  }
});

export const { addUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
