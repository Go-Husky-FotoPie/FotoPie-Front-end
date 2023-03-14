import axiosInstance from "../index";

export const getMe = () => {
  return axiosInstance({
    url: "/api/editUser/me",
    method: "get",
  });
};

export const updateName = <T>(data: T) => {
  return axiosInstance({
    url: `/api/editUser/updateName`,
    method: "patch",
    data,
  });
};

export const upload = <T>(data: T) => {
  return axiosInstance({
    url: `/api/editUser/upload`,
    method: "patch",
    data,
  });
};
