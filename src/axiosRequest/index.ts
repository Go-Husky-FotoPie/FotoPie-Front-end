import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import axiosConfig from "./config";
import { getAccessToken } from "../utils/token";

const axiosInstance = axios.create({
  timeout: axiosConfig.timeOut as number | undefined,
  withCredentials: true,
});

// resquest interceptor - before request is sent
axiosInstance.interceptors.request.use(
  function (config: any) {
    const accessToken = getAccessToken();
    accessToken && (config.headers["Authorization"] = `Bearer ${accessToken}`);
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// response interceptor - after response is received
axiosInstance.interceptors.response.use(
  function (response) {
    console.log("✅response:", response);
    const { status } = response;

    if (status === 200) {
      return Promise.resolve(response);
    } else if (status === 401) {
      return Promise.reject(response);
    } else {
      return Promise.reject(response);
    }
  },
  function (error) {
    let message = "";
    if (error && error.response) {
      console.log(error);
      switch (error.response.status) {
        case 302:
          message = "Redirect to other url";
          break;
        case 400:
          message = "Bad request!";
          break;
        case 401:
          message = "Please login!";
          break;
        case 403:
          message = "Forbidden!";
          break;
        case 404:
          message = `Not found!: ${error.response.config.url}`;
          break;
        case 408:
          message = "request timeout!";
          break;
        case 409:
          message = "Conflict!";
          break;
        case 500:
          message = "Internal Server Error!";
          break;
        case 501:
          message = "Not Implemented!";
          break;
        case 502:
          message = "Bad Gateway!";
          break;
        case 503:
          message = "Service Unavailable!";
          break;
        case 504:
          message = "Gateway Timeout! Please try again later!";
          break;
        case 505:
          message = "HTTP Version Not Supported!";
          break;
        default:
          message = "Something went wrong!";
          break;
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
