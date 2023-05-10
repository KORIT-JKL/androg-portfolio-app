import { atom } from "recoil";

export const cartIsOpenState = atom({
    key: "cartIsOpenState",
    default: false
})

export const setCategoryId = atom({
    key: "setCategoryId",
    default: 0
})