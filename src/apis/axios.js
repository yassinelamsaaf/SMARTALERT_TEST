import axios from "axios";

const axios_instance = axios.create({
    baseURL : "https://smartalert-backend.b2blink.ma",
    // baseURL: "http://localhost:8080",
    headers : {
        Accept: "*/*",
    }
})

axios_instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwt");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axios_instance;