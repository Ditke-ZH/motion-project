import axios from "axios";

export const api = axios.create({
  VITE_API_BASEURL: import.meta.env.VITE_API_BASEURL,
});
