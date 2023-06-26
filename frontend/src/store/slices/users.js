import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    publicUser: null,
  },
  reducers: {
    saveUsers: (state, action) => {
      state.users = action.payload;
    },
    updateSingleUser: (state, action) => {
      const userIndex = state.users.findIndex(
        (user) => user.id === action.payload.id
      );
      if (userIndex !== -1) {
        state.users[userIndex] = action.payload;
      }
    },
    addPublicUser: (state, action) => {
      state.publicUser = action.payload;
    },
  },
});

export const { saveUsers, updateSingleUser, addPublicUser } =
  usersSlice.actions;

export default usersSlice.reducer;
