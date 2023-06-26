import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/slices/user";
import { api } from "../axios";

const useLogin = (email, password) => {
  const [loginError, setLoginError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    setLoginError("");
    try {
      const res = await api.post("auth/token/", {
        email,
        password,
      });
      const token = res.data.access;
      dispatch(login(token));
      localStorage.setItem("token", token);
      navigate("/feed");
    } catch (error) {
      if (error.response) {
        setLoginError(error.response.data.detail);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
    }
  };

  return {
    handleLogin,
    loginError,
  };
};

export default useLogin;
