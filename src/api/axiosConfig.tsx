import axios from "axios";


const axiosInstance = axios.create({
  baseURL: "https://extended-celeste-rennella-d07bc04c.koyeb.app",
});


axiosInstance.interceptors.request.use(
  (config) => {
    const token =
      sessionStorage.getItem("token") || localStorage.getItem("token");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    } else {
      delete config.headers["Authorization"];
    }

    return config;
  },
  (error) => Promise.reject(error)
);


export default axiosInstance;