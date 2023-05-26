import { atom } from "recoil";

export const setCategoryId = atom({
  key: "setCategoryId",
  default: 0,
});

export const setProducts = atom({
  key: "setProducts",
  default: [],
});

export const setPage = atom({
  key: "setPage",
  default: 1,
});

export const setSearchParams = atom(
  {
    key: "setSearchPage",
    default: 1,
  },
  {
    key: "setSearchInput",
    default: "",
  }
);

export const SetSearchInput = atom({
  key: "SetSearchInput",
  default: "",
});

export const SetAdminReviews = atom({
  key: "SetAdminReviews",
  default: [],
});

export const orderProductsState = atom({
  key: "orderProductsState",
  default: false,
});
