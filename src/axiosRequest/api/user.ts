import axiosInstance from "../index";

export const login = <T>(data: T) => {
  return axiosInstance({
    url: "/api/auth/login",
    method: "post",
    data,
  });
};

export const getUserInfo = <T>(params: T) => {
  return axiosInstance({
    url: `/api/user/${params}`,
    method: "get",
  });
};
