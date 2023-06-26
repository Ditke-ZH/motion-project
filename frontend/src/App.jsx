import { useDispatch, useSelector } from "react-redux";
import Router from "./routes";
import { api } from "./axios";
import { useEffect } from "react";
import { login } from "./store/slices/user";
import { logout } from "./store/slices/user";
import Loading from "./components/Loading";

function App() {
  const accessToken = useSelector((state) => state.user.accessToken);
  const dispatch = useDispatch();

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (localToken) {
      api
        .post("auth/token/verify/", { token: localToken })
        .then(() => dispatch(login(localToken)))
        .catch(() => {
          localStorage.removeItem("token");
          dispatch(logout());
        });
    } else {
      // no local token
      dispatch(logout());
    }
  }, [dispatch]);

  if (accessToken || accessToken === null) return <Router />; // user is logged in or logged out
  return <Loading />; // login state was not identified yet
}

export default App;
