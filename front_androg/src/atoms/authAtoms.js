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
    default : false
})

export const setSearchInput = atom({
    key: "setSearchInput",
    default : ""
})