import { atom } from "recoil";

export const AdminMenuSelect = atom({
  key: "AdminMenuSelect",
  default: 0,
});

export const AdminPopUp = atom({
  key: "AdminPopUp",
  default: {
    pupUpId: 0,
    content: "",
  },
});
export const AdminNotice = atom({
  key: "AdminNotice",
  default: {
    subject: "",
    content: "",
  },
});
