/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useState } from "react";
import DaumPostcodeEmbed from "react-daum-postcode";
import AddressInput from "../../Input/AddressInput";
import { useMutation } from "react-query";
import axios from "axios";
import {
  AddressListStateRecoil,
  AddressUpdateStateRecoil,
} from "../../../atoms/AddressAtoms/AddressAtoms";
import { useRecoilState } from "recoil";

const Title = css`
  margin-top: 5px;
  font-size: 25px;
  font-weight: 600;
  margin-bottom: 40px;
`;

const addressContent = css`
  grid-column-start: 7;
  grid-column-end: span 6;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 10px;
  max-width: 70%;
  max-height: 100%;
`;

const addAddressButton = css`
  border: 1px solid black;
  margin-top: 50px;
  width: 100%;
  height: 45px;
  font-weight: 600;
  background-color: white;
  cursor: pointer;
  transition: background, 0.4s;

  &:hover {
    background-color: gray;
    font-weight: 600;
    color: white;
  }
`;
const nameBox = css`
  max-width: 100%;
  height: 50px;
  border-bottom: 1px solid black;
  padding-top: 10px;
  margin-bottom: 20px;
`;

const UpdateAddress = ({ principal, address }) => {
  const [openPostCode, setOpenPostCode] = useState(false);
  const [addressDetailInput, setAddressDetailInput] = useState({ addressDetail: "" });
  const [addressListState, setAddressListState] = useRecoilState(AddressListStateRecoil);
  const [updateOpen, setUpdateOpen] = useRecoilState(AddressUpdateStateRecoil);
  const [addressInitState, setAddressInitState] = useState(true);
  const [addressInput, setAddressInput] = useState({
    address: "",
    sigungu: "",
    sido: "",
    bname: "",
    zonecode: "",
  });

  const addressUpdate = useMutation(
    async (address) => {
      const data = {
        address: addressInput.address,
        addressSigungu: addressInput.sigungu,
        addressSido: addressInput.sido,
        addressBname: addressInput.bname,
        addressZonecode: addressInput.zonecode,
        addressDetail: addressDetailInput.addressDetail,
      };
      const option = {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("accessToken"),
        },
      };
      //   console.log(data);
      //주소지 put url
      const response = await axios.put(
        `http://localhost:8080/user/mypage/address/${address.addressId}`,
        JSON.stringify(data),
        option
      );
      //   console.log(response);
      return response;
    },
    {
      onSuccess: () => {
        setAddressListState(true);
      },
    }
  );

  const selectAddress = (data) => {
    setAddressInput((prevState) => ({
      ...prevState,
      address: data.address,
      sigungu: data.sigungu,
      sido: data.sido,
      bname: data.bname,
      zonecode: data.zonecode,
    }));
    setAddressInitState(false);
    setOpenPostCode(false);
  };
  const inputOnChangeHandle = (e) => {
    const { name, value } = e.target;
    setAddressDetailInput({ ...addressDetailInput, [name]: value });
  };
  //   useEffect(() => {});
  if (addressUpdate.isLoading) {
    return <></>;
  }

  return (
    <div css={addressContent}>
      <h2 css={Title}>주소 수정 하기</h2>
      <div css={nameBox}> {principal.data !== undefined ? principal.data.data.name : ""}</div>
      <div css={nameBox}>
        {addressInitState
          ? address.address + "(" + address.addressBname + ")"
          : addressInput.address + "(" + addressInput.bname + ")"}
      </div>
      <button
        css={addAddressButton}
        onClick={() => {
          if (!openPostCode) {
            setOpenPostCode(true);
          } else {
            setOpenPostCode(false);
          }
        }}
      >
        {" "}
        주소찾기{" "}
      </button>
      {openPostCode ? <DaumPostcodeEmbed onComplete={selectAddress} autoClose={false} /> : ""}
      <AddressInput
        type="text"
        placeholder="상세주소"
        name="addressDetail"
        onChange={inputOnChangeHandle}
      />
      <AddressInput
        type="text"
        placeholder="구/군/시"
        name="sigungu"
        value={addressInitState ? address.addressSigungu : addressInput.sigungu}
        onChange={(e) => setAddressInput({ ...addressInput, sigungu: e.target.value })}
      />
      <AddressInput
        type="text"
        placeholder="시/도"
        name="sido"
        value={addressInitState ? address.addressSido : addressInput.sido}
        onChange={(e) => setAddressInput({ ...addressInput, sido: e.target.value })}
      />
      <AddressInput
        type="text"
        placeholder="우편번호"
        name="zonecode"
        value={addressInitState ? address.addressZonecode : addressInput.zonecode}
        onChange={(e) => setAddressInput({ ...addressInput, zonecode: e.target.value })}
      />
      <button
        css={addAddressButton}
        onClick={() => {
          setUpdateOpen(false);
          addressUpdate.mutate(address);
          //   setAddressOpen(true);
          // setAddress((prevState) => ({
          //   ...prevState,
          //   address: "",
          //   sigungu: "",
          //   sido: "",
          //   bname: "",
          //   zonecode: "",
          // }));
        }}
      >
        저장
      </button>
      <button
        css={addAddressButton}
        onClick={() => {
          if (updateOpen) {
            setUpdateOpen(false);
          }
        }}
      >
        취소
      </button>
    </div>
  );
};

export default UpdateAddress;
