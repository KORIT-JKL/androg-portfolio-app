/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useState } from "react";
import DaumPostcodeEmbed from "react-daum-postcode";
import AddressInput from "../../Input/AddressInput";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import {
  AddressInsertStateRecoil,
  AddressListStateRecoil,
} from "../../../atoms/AddressAtoms/AddressAtoms";
import { useRecoilState } from "recoil";
import ErrorMessage from "../../Error/ErrorMessage";

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

const InsertAddress = ({ principal }) => {
  const [openPostCode, setOpenPostCode] = useState(false);
  const queryClient = useQueryClient();
  const [addressOpen, setAddressOpen] = useRecoilState(AddressInsertStateRecoil);
  const [, setAddressListState] = useRecoilState(AddressListStateRecoil);
  const [errorMessage, setErrorMessage] = useState({
    address: "",
    addressBname: "",
    addressDetail: "",
    addressSido: "",
    addressSigungu: "",
    addressZonecode: "",
    poneNumber: "",
  });
  const [addressDetailInput, setAddressDetailInput] = useState({ addressDetail: "" });
  const [addressInput, setAddressInput] = useState({
    address: "",
    sigungu: "",
    sido: "",
    bname: "",
    zonecode: "",
    ponenumber: "",
  });

  const addressRegister = useMutation(
    async () => {
      const data = {
        userId: principal.data.data.userId,
        address: addressInput.address,
        addressSigungu: addressInput.sigungu,
        addressSido: addressInput.sido,
        addressBname: addressInput.bname,
        addressZonecode: addressInput.zonecode,
        addressDetail: addressDetailInput.addressDetail,
        poneNumber: addressInput.ponenumber,
        addressFlag: 0,
      };
      const option = {
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
      };
      const response = await axios.post("http://localhost:8080/user/mypage/address", data, option);
      return response;
    },
    {
      onSuccess: (response) => {
        if (response.status === 200) {
          setAddressListState(true);
          setAddressOpen(false);
          queryClient.fetchQuery("addressList");
        }
      },
      onError: (error) => {
        setErrorMessage({
          address: "",
          addressBname: "",
          addressDetail: "",
          addressSido: "",
          addressSigungu: "",
          addressZonecode: "",
          poneNumber: "",
          ...error.response.data.errorData,
        });

        setAddressOpen(true);
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
    setOpenPostCode(false);
  };

  const inputOnChangeHandle = (e) => {
    const { name, value } = e.target;
    setAddressDetailInput({ ...addressDetailInput, [name]: value });
  };

  return (
    <div css={addressContent}>
      <h2 css={Title}>새 주소 추가</h2>
      <div css={nameBox}> {principal.data !== undefined ? principal.data.data.name : ""}</div>
      <div css={nameBox}>
        {addressInput.address !== ""
          ? addressInput.address + "(" + addressInput.bname + ")"
          : "주소"}
      </div>
      <ErrorMessage children={errorMessage.address !== "" ? errorMessage.address : ""} />
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
        주소찾기
      </button>
      {openPostCode ? <DaumPostcodeEmbed onComplete={selectAddress} autoClose={false} /> : ""}
      <AddressInput
        type="text"
        placeholder="상세주소"
        name="addressDetail"
        onChange={inputOnChangeHandle}
      />
      <ErrorMessage
        children={errorMessage.addressDetail !== "" ? errorMessage.addressDetail : ""}
      />
      <AddressInput
        type="text"
        placeholder="구/군/시"
        name="sigungu"
        value={addressInput.sigungu}
        onChange={(e) => setAddressInput({ ...addressInput, sigungu: e.target.value })}
      />
      <ErrorMessage
        children={errorMessage.addressSigungu !== "" ? errorMessage.addressSigungu : ""}
      />
      <AddressInput
        type="text"
        placeholder="시/도"
        name="sido"
        value={addressInput.sido}
        onChange={(e) => setAddressInput({ ...addressInput, sido: e.target.value })}
      />
      <ErrorMessage children={errorMessage.addressSido !== "" ? errorMessage.addressSido : ""} />
      <AddressInput
        type="text"
        placeholder="우편번호"
        name="zonecode"
        value={addressInput.zonecode}
        onChange={(e) => setAddressInput({ ...addressInput, zonecode: e.target.value })}
      />
      <ErrorMessage
        children={errorMessage.addressZonecode !== "" ? errorMessage.addressZonecode : ""}
      />
      <AddressInput
        type="text"
        placeholder="전화번호"
        name="ponenumber"
        value={addressInput.ponenumber}
        onChange={(e) => setAddressInput({ ...addressInput, ponenumber: e.target.value })}
      />
      <ErrorMessage children={errorMessage.poneNumber !== "" ? errorMessage.poneNumber : ""} />
      <button
        css={addAddressButton}
        onClick={() => {
          addressRegister.mutate();
        }}
      >
        저장
      </button>
      <button
        css={addAddressButton}
        onClick={() => {
          if (addressOpen) {
            setAddressOpen(false);
          }
        }}
      >
        취소
      </button>
    </div>
  );
};

export default InsertAddress;
