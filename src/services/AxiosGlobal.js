/* eslint-disable no-undef */
import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_URL_API,
});

instance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("auth_token");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
