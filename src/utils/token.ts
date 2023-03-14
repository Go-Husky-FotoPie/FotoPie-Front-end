import Cookies from "universal-cookie";

const cookies = new Cookies();

export const getAccessToken = () => {
  return cookies.get("accessToken");
};

export const setAccessToken = (token: string) => {
  cookies.set("accessToken", token, {
    path: "/",
    expires: new Date(Date.now() + 1000 * 60 * 15), // 15 minutes
  });
};
