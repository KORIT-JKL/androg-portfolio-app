import { atom } from "recoil";

export const setRefresh = atom({
  key: "setRefresh",
  default: true,
});

export const refreshState = atom({
  key: "refreshState",
  default: true,
});

export const popUpState = atom({
  key: "popUpState",
  default: true,
});
