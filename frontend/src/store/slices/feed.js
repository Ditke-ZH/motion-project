import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: {
    filter: null,
    posts: [],
  },
  reducers: {
    savePosts: (state, action) => {
      state.posts = action.payload;
    },
    addSinglePost: (state, action) => {
      state.posts.unshift(action.payload);
    },
    updateSinglePost: (state, action) => {
      const postIndex = state.posts.findIndex(
        (post) => post.id === action.payload.id
      );
      if (postIndex !== -1) {
        state.posts[postIndex] = action.payload;
      }
    },
  },
});

export const { savePosts, addSinglePost, updateSinglePost } = feedSlice.actions;

export default feedSlice.reducer;
