import { atom } from "recoil";

export const refreshState = atom({
  key: "refreshState",
  default: true,
});

export const loginState = atom({
  key: "loginState",
  default: false,
});
