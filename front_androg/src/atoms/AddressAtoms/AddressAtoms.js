import { atom } from "recoil";

//address를 의 객체를 전달해주기 위해서 쓰는 전역 값
export const getAddressRecoil = atom({
  key: "getAddressRecoil",
  default: {},
});

//주소지 목록의 전역값.
export const getAddressListRecoil = atom({
  key: "getAddressListRecoil",
  default: [],
});

//주소지 리스트 상태 변화 전역 값
export const AddressListStateRecoil = atom({
  key: "AddressListState",
  default: false,
});

//주소지 추가 Component 상태 변화
export const AddressInsertStateRecoil = atom({
  key: "AddressInsertStateRecoil",
  default: false,
});

//주소지 수정 Component 상태 변화
export const AddressUpdateStateRecoil = atom({
  key: "AddressUpdateStateRecoil",
  default: false,
});
