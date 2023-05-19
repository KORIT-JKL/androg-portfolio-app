import { atom } from "recoil";

export const loginState = atom({
  key: "loginState",
  default: false,
});

export const authenticationState = atom({
  key: "authenticationState",
  default: true,
});
