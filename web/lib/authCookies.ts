import Cookies from "js-cookie";

const COOKIE_OPTIONS = {
  secure: true,
  sameSite: "strict" as const,
};

export const setTokens = (accessToken: string, refreshToken: string) => {
  Cookies.set("access_token", accessToken, {
    ...COOKIE_OPTIONS,
    expires: 1 / 24,
  });

  Cookies.set("refresh_token", refreshToken, {
    ...COOKIE_OPTIONS,
    expires: 7,
  });
};

export const getAccessToken = () => Cookies.get("access_token");
export const getRefreshToken = () => Cookies.get("refresh_token");

export const removeTokens = () => {
  Cookies.remove("access_token");
  Cookies.remove("refresh_token");
};
