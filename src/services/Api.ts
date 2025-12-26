import axios from "axios";
import Cookies from "js-cookie";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
};

const responseErrorHandler = async (error: any) => {
  if (
    error?.response?.status === 401 &&
    !error?.request?.responseURL?.includes("api/auth/login")
  ) {
    if (localStorage !== null) {
      localStorage.removeItem("@menuTechFront:user");
    }
    return window.location.pathname !== `/` && (window.location.href = `/`);
  }

  if (error.response.status === 403) {
    return (
      window.location.pathname !== `/unauthorized` &&
      (window.location.href = `/unauthorized`)
    );
  }

  return Promise.reject(error);
};

const api = axios.create({
  baseURL: process.env.REACT_APP_MENUTECHFRONT_API,
  headers: headers,
  withCredentials: true,
});

api.interceptors.request.use(
  async (request) => {
    let token;
    if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
      token = localStorage.getItem("@menuTechFront:auth") || "";
    } else {
      token = Cookies.get("@menuTechFront:auth") || "";
    }

    if (token && token !== "undefined") {
      if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
        token = JSON.parse(token)?.accessToken;
      }

      if (request.headers && !request.headers?.Authorization) {
        request.headers.Authorization = `Bearer ${token}`;
      }
    }

    return request;
  },
  (error) => console.log(error)
);

api.interceptors.response.use(
  async (request) => {
    return request;
  },
  (error) => responseErrorHandler(error)
);

export default api;
