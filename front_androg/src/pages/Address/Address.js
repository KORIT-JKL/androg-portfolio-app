/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useEffect, useState } from "react";
import CommonHeader from "../../components/CommonHeader/CommonHeader";
import CommonFooter from "../../components/CommonFooter/CommonFooter";
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import InsertAddress from "../../components/AddressComponent/InsertAddress/InsertAddress";
import UpdateAddress from "../../components/AddressComponent/UpdateAddress/UpdateAddress";
import { useRecoilState } from "recoil";
import { getAddressRecoil } from "../../atoms/AddressAtoms/AddressAtoms";

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

//문제 : 해당 유저에 배송지를 저장하고 추가된 주소지가 바로바로 적용이 안됨 새로고침을 해야 적용된다.

const Address = () => {
  const [addressOpen, setAddressOpen] = useState(false);
  const [principalState, setPrincipalState] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [addressListState, setAddressListState] = useState(false);
  const [userAddressList, setUserAddressList] = useState([]);
  const [addressRecoil, setAddressRecoil] = useRecoilState(getAddressRecoil);

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

  const addressDelete = useMutation(async (address) => {
    const option = {
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      },
    };
    const response = await axios.delete(
      `http://localhost:8080/user/mypage/address/${address.addressId}`,
      option
    );
    console.log(response);
    return response;
  });

  // const selectAddress = (data) => {
  //   setAddressInput((prevState) => ({
  //     ...prevState,
  //     address: data.address,
  //     sigungu: data.sigungu,
  //     sido: data.sido,
  //     bname: data.bname,
  //     zonecode: data.zonecode,
  //   }));
  // };
  // const inputOnChangeHandle = (e) => {
  //   const { name, value } = e.target;
  //   setAddressDetailInput({ ...addressDetailInput, [name]: value });
  // };
  useEffect(() => {
    if (!principalState) {
      setPrincipalState(true);
    }
    if (!addressListState) {
      setAddressListState(true);
    }
  }, []);
  // && addressRegister.isLoading && addressList.isLoading
  if (principal.isLoading && addressList.isLoading) {
    return <></>;
  }

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
                            if (!addressOpen) {
                              setUpdateOpen(true);
                              setAddressRecoil({ ...addressRecoil, ...address });
                            }
                          }}
                        >
                          수정
                        </button>
                        <button
                          css={addressUpdateButton}
                          onClick={() => {
                            addressDelete.mutate(address);
                          }}
                        >
                          삭제
                        </button>
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
        {addressOpen ? <InsertAddress principal={principal} /> : ""}
        {updateOpen ? <UpdateAddress principal={principal} address={addressRecoil} /> : ""}
      </main>
      <CommonFooter />
    </>
  );
};

export default Address;
