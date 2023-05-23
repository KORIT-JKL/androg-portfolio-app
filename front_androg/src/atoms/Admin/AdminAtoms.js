import { atom } from "recoil";

export const AdminMenuSelect = atom({
  key: "AdminMenuSelect",
  default: 0,
});

export const AdminPopUp = atom({
  key: "AdminPopUp",
  default: [],
});
