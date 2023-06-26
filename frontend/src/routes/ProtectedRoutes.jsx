import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { loadUserDetails } from "../store/slices/user";
import { api } from "../axios";

export default function ProtectedRoutes() {
  const token = useSelector((state) => state.user.accessToken);
  const isLoggedIn = useSelector((state) => state.user.accessToken);
  const hasProfileLoaded = useSelector((state) => state.user.details);
  const dispatch = useDispatch();

  const loadProfileDetails = async () => {
    try {
      api
        .get("users/me/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => dispatch(loadUserDetails(res.data)));
    } catch (e) {
      console.log(e);
    }
  };

  if (!isLoggedIn) {
    return <Navigate to="/signin" />;
  } else if (!hasProfileLoaded) {
    loadProfileDetails(); // load logged-in users profile to store if not already there
  }

  return (
    <>
      <Outlet />
    </>
  );
}
