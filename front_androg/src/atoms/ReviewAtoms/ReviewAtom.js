import { atom } from "recoil";

export const productInfoState = atom({
  key: "productInfoState",
  default: {
    productId: 0,
  },
});
