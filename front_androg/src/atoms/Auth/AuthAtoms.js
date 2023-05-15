import { atom } from "recoil";

export const cartIsOpenState = atom({
    key: "cartIsOpenState",
    default: false
})

export const setCategoryId = atom({
    key: "setCategoryId",
    default: 0
})

export const setRefresh = atom({
    key: "setRefresh",
    default : true
})

export const refreshState = atom({
    key: "refreshState",
    default: true,
  });
  
  
  export const loginState = atom({
    key: "loginState",
    default: false,
  });

export const setProducts = atom({
    key: "setProducts",
    default: []
})

export const setPage = atom({
    key: "setPage",
    default: 1
})

export const setSearchParams = atom(
    {
        key: "setSearchPage",
        default : 1
    },
    {
        key:"setSearchInput",
        default : ""
    })

