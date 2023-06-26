import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    accessToken: undefined,
    details: null,
    draftPost: "",
    requests: [],
  },
  reducers: {
    login: (state, action) => {
      state.accessToken = action.payload;
    },
    logout: (state) => {
      state.accessToken = null;
      state.details = null;
    },
    loadUserDetails: (state, action) => {
      state.details = action.payload;
    },
    updateDraftPost: (state, action) => {
      state.draftPost = action.payload;
    },
    loadFriendRequests: (state, action) => {
      state.requests = action.payload;
    },
    addFriendRequest: (state, action) => {
      state.requests.push(action.payload);
    },
    removeFriendRequest: (state, action) => {
      const requestIndex = state.requests.findIndex(
        (request) => request.id === action.payload.id
      );
      if (userIndex !== -1) {
        state.requests.splice(requestIndex, 1); // should be: remove request from array
      }
    },
  },
});

export const {
  login,
  logout,
  loadUserDetails,
  updateDraftPost,
  loadFriendRequests,
  addFriendRequest,
  removeFriendRequest,
} = userSlice.actions;

export default userSlice.reducer;
