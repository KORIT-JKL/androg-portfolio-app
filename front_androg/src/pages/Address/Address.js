/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useEffect, useState } from "react";
import CommonHeader from "../../components/CommonHeader/CommonHeader";
import CommonFooter from "../../components/CommonFooter/CommonFooter";
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import AddressInput from "../../components/Input/AddressInput";
import DaumPostcodeEmbed from "react-daum-postcode";

const mainContainer = css`
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 10px;
  padding: 120px 20px;
`;
const informationContent = css`
  grid-column-start: 2;
  grid-column-end: span 4;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 10px;
  max-width: 100%;
  max-height: 100%;
`;

const Title = css`
  margin-top: 5px;
  font-size: 25px;
  font-weight: 600;
  margin-bottom: 40px;
`;
const subTitle = css`
  border-bottom: 1px solid #dbdbdb;
  font-size: 15px;
  font-weight: 600;
  padding-bottom: 20px;
`;
const submitAddresBox = css`
  padding: 20px 0px;
`;

const userUpdateBox = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 15px;
  font-size: 12px;
`;
const addressUpdateButton = css`
  border: none;
  padding: 3px;
  background-color: white;

  cursor: pointer;
  &:hover {
    font-weight: 600;
  }
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

const addressDetailBox = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 15px;
  font-size: 15px;
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

const Address = () => {
  const [addressOpen, setAddressOpen] = useState(false);
  const [principalState, setPrincipalState] = useState(false);
  const [openPostCode, setOpenPostCode] = useState(false);
  const [addressDetailInput, setAddressDetailInput] = useState({ addressDetail: "" });
  const [address, setAddress] = useState({
    address: "",
    sigungu: "",
    sido: "",
    bname: "",
    zonecode: "",
  });

  let userId = 0;

  const principal = useQuery(
    ["principal"],
    async () => {
      const accessToken = localStorage.getItem("accessToken");
      //마이페이지 조회 url /user/{userId}/mypage -> /user/mypage로 변경
      const response = await axios.get("http://localhost:8080/user/mypage", {
        params: { accessToken },
      });
      return response;
    },
    {
      onSuccess: (response) => {
        userId = response.data.userId;
        setPrincipalState(false);
      },
      enabled: principalState,
    }
  );
  const addressRegister = useMutation(
    async () => {
      const data = {
        userId: principal.data.data.userId,
        address: address.address,
        addressSigungu: address.sigungu,
        addressSido: address.sido,
        addressBname: address.bname,
        addressZonecode: address.zonecode,
        addressDetail: addressDetailInput.addressDetail,
      };
      console.log(data);
      const option = {
        headres: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("accessToken"),
        },
      };
      try {
        const response = await axios.post("http://localhost:8080/user/mypage/address", data, option);
        return response;
      } catch (error) {
        console.log(error);
      }
    },
    {
      onSuccess: (response) => {
        console.log(response.data);
      },
    }
  );
  const selectAddress = (data) => {
    setAddress((prevState) => ({
      ...prevState,
      address: data.address,
      sigungu: data.sigungu,
      sido: data.sido,
      bname: data.bname,
      zonecode: data.zonecode,
    }));
  };
  const inputOnChangeHandle = (e) => {
    const { name, value } = e.target;
    setAddressDetailInput({ ...addressDetailInput, [name]: value });
    console.log(addressDetailInput.addressDetail);
  };
  useEffect(() => {
    if (!principalState) {
      setPrincipalState(true);
    }
  }, []);

  if (principal.isLoading && addressRegister.isLoading) {
    return <></>;
  }

  return (
    <>
      <CommonHeader />
      <main css={mainContainer}>
        <div css={informationContent}>
          <h1 css={Title}>주소록</h1>
          <h2 css={subTitle}>모든 주소</h2>
          <div css={submitAddresBox}>
            <div css={userUpdateBox}>
              {principal.data !== undefined ? principal.data.data.name : ""}
              <div css={userUpdateBox}>
                <button css={addressUpdateButton}>수정</button>
                <button css={addressUpdateButton}>삭제</button>
              </div>
            </div>
            <p css={addressDetailBox}>
              도로명 주소 <br />
              상세 주소 <br />
              우편번호 <br />
              국적 <br />
              <span>기본 배송지</span>
            </p>
            <button
              css={addAddressButton}
              onClick={() => {
                if (!addressOpen) {
                  setAddressOpen(true);
                } else {
                  setAddressOpen(false);
                }
              }}
            >
              주소 추가하기
            </button>
          </div>
        </div>
        {addressOpen ? (
          <div css={addressContent}>
            <h2 css={Title}>새 주소 추가</h2>
            <div css={nameBox}> {principal.data !== undefined ? principal.data.data.name : ""}</div>
            <div css={nameBox}>{address.address !== "" ? address.address + "(" + address.bname + ")" : "주소"}</div>
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
            <AddressInput type="text" placeholder="상세주소" name="addressDetail" onChange={inputOnChangeHandle} />
            <AddressInput
              type="text"
              placeholder="구/군/시"
              name="sigungu"
              value={address.sigungu}
              onChange={(e) => setAddress({ ...address, sigungu: e.target.value })}
            />
            <AddressInput
              type="text"
              placeholder="시/도"
              name="sido"
              value={address.sido}
              onChange={(e) => setAddress({ ...address, sido: e.target.value })}
            />
            <AddressInput
              type="text"
              placeholder="우편번호"
              name="zonecode"
              value={address.zonecode}
              onChange={(e) => setAddress({ ...address, zonecode: e.target.value })}
            />
            <button
              css={addAddressButton}
              onClick={() => {
                addressRegister.mutate();
                setAddressOpen(true);
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
                if (!addressOpen) {
                  setAddressOpen(true);
                } else {
                  setAddressOpen(false);
                  setAddress((prevState) => ({
                    ...prevState,
                    address: "",
                    sigungu: "",
                    sido: "",
                    bname: "",
                    zonecode: "",
                  }));
                }
              }}
            >
              취소
            </button>
          </div>
        ) : (
          ""
        )}
      </main>
      <CommonFooter />
    </>
  );
};

export default Address;
