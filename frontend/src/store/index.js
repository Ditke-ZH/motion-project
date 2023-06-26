import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user";
import usersReducer from "./slices/users";
import feedReducer from "./slices/feed";

const store = configureStore({
  reducer: {
    user: userReducer,
    users: usersReducer,
    feed: feedReducer,
  },
});

export default store;
