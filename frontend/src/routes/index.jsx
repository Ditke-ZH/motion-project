import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoggedOutLayout from "./LoggedOutLayout";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Feed from "./Feed";
import Profile from "./Profile";
import Friends from "./Friends";
import LoggedInLayout from "./LoggedInLayout";
import ProtectedRoutes from "./ProtectedRoutes";
import EditProfile from "./EditProfile";
import PublicProfile from "./PublicProfile";
import UserPosts from "./UserPosts";
import UserFriends from "./UserFriends";
import UserFollowers from "./UserFollowers";
import UserFollowing from "./UserFollowing";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LoggedOutLayout />}>
          <Route path="/signin" element={<SignIn />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="*" element={<h1>Error 404</h1>}></Route>
        </Route>

        <Route element={<LoggedInLayout />}>
          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<Feed />}></Route>
            <Route path="/feed" element={<Feed />}></Route>
            <Route path="/feed/:filterParam/" element={<Feed />} />
            <Route path="/profile" element={<Profile />}>
              <Route path="/profile/posts" element={<UserPosts />}></Route>
              <Route path="/profile/friends" element={<UserFriends />}></Route>
              <Route
                path="/profile/followers"
                element={<UserFollowers />}
              ></Route>
              <Route
                path="/profile/following"
                element={<UserFollowing />}
              ></Route>
            </Route>
            <Route path="/profile/edit" element={<EditProfile />}></Route>
            <Route path="/profile/public/:userId/" element={<PublicProfile />}>
              <Route
                path="/profile/public/:userId/posts"
                element={<UserPosts />}
              ></Route>
              <Route
                path="/profile/public/:userId/friends"
                element={<UserFriends />}
              ></Route>
              <Route
                path="/profile/public/:userId/followers"
                element={<UserFollowers />}
              ></Route>
              <Route
                path="/profile/public/:userId/following"
                element={<UserFollowing />}
              ></Route>
            </Route>

            <Route path="/friends" element={<Friends />}></Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
