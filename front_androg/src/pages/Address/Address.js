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
  border-bottom: 1px solid black;
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
//문제 : 해당 유저에 배송지를 저장하고 추가된 주소지가 바로바로 적용이 안됨 새로고침을 해야 적용된다.

const Address = () => {
  const [addressOpen, setAddressOpen] = useState(false);
  const [updateAddressOpen, setUpdateAddressOpen] = useState(false);
  const [principalState, setPrincipalState] = useState(false);
  const [openPostCode, setOpenPostCode] = useState(false);
  const [addressListState, setAddressListState] = useState(false);
  const [addressDetailInput, setAddressDetailInput] = useState({ addressDetail: "" });
  const [userAddressList, setUserAddressList] = useState([]);
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

  //해당 user 주소지 추가 요청
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
      // console.log(data);
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
        // console.log(error);
      }
    },
    {
      onSuccess: (response) => {
        // console.log(response.data);
      },
    }
  );

  // 해당 유저 주소지 리스트 조회 요청
  const addressList = useQuery(
    ["addressList"],
    async () => {
      const option = {
        params: {
          userId: principal.data.data.userId,
        },
      };
      //user 주소지 조회 url/user/mypage/address
      const response = await axios.get("http://localhost:8080/user/mypage/address", option);
      // console.log(response);
      return response;
    },
    {
      onSuccess: (response) => {
        setUserAddressList([...userAddressList, ...response.data]);
        setAddressListState(false);
      },
      enabled: !!principal.data && addressListState,
    }
  );

  const addressUpdate = useMutation(async (addressId) => {
    const data = {
      address: address.address,
      addressSigungu: address.sigungu,
      addressSido: address.sido,
      addressBname: address.bname,
      addressZonecode: address.zonecode,
      addressDetail: addressDetailInput.addressDetail,
    };
    const option = {
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      },
    };
    const response = await axios.put(`http://localhost:8080/user/mypage/address/${addressId}`, option, data);
    console.log(response);
    return response;
  });

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
  };
  useEffect(() => {
    if (!principalState) {
      setPrincipalState(true);
    }
    if (!addressListState) {
      setAddressListState(true);
    }
  }, []);

  if (principal.isLoading && addressRegister.isLoading && addressList.isLoading) {
    return <></>;
  }

  const updateAddress = ({ address }) => {
    return (
      <div css={addressContent}>
        <h2 css={Title}>주소 수정하기</h2>
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
            addressUpdate.mutate(address);
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
    );
  };

  return (
    <>
      <CommonHeader />
      <main css={mainContainer}>
        <div css={informationContent}>
          <h1 css={Title}>주소록</h1>
          <h2 css={subTitle}>모든 주소</h2>
          {userAddressList.length > 0
            ? userAddressList.map((address) => {
                return (
                  <div css={submitAddresBox} key={address.addressId}>
                    <div css={userUpdateBox}>
                      {principal.data !== undefined ? principal.data.data.name : ""}
                      <div css={userUpdateBox}>
                        <button
                          css={addressUpdateButton}
                          onClick={() => {
                            if (!updateAddressOpen) {
                              setAddressOpen(true);
                            }
                            updateAddress(address);
                          }}
                        >
                          수정
                        </button>
                        <button css={addressUpdateButton}>삭제</button>
                      </div>
                    </div>
                    <div>{address.address}</div>
                    <div>{address.addressDetail}</div>
                    <div>
                      {address.addressSigungu}
                      {address.addressZonecode}
                    </div>
                  </div>
                );
              })
            : ""}
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
