import cookie from "react-cookies";

export const isLoggedIn = () => {
  //cookie.load used tp take the token which saved in cookies
  const token = cookie.load("token");
  return token;
};
