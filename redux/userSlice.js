import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {},
  isLoggedIn: false
};

export const userSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.value = action.payload;
      state.isLoggedIn = true;
    },
    removeUser: (state) => {
      state.value = {};
      state.isLoggedIn = false;
    }
  }
});

export const { addUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
