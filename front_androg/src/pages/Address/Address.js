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
import {
  AddressInsertStateRecoil,
  AddressListStateRecoil,
  AddressUpdateStateRecoil,
  getAddressListRecoil,
  getAddressRecoil,
} from "../../atoms/AddressAtoms/AddressAtoms";
import { authenticationState } from "../../atoms/Auth/AuthAtoms";

const mainContainer = css`
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 10px;
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

const textBox = css`
  margin: 10px 0px 10px 0px;
  font-size: 14px;
`;
const p = css`
  font-size: 14px;
`;
const addressText = css`
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const defaultAddress = (index) => css`
  border: none;
  padding: 3px;
  background-color: white;

  ${index === 0 ? "" : "cursor: pointer"};
  ${index === 0 ? "" : "&:hover {font-weight: 600}"};
`;

//CommonHeader 문제가 많다 뭐가 문제인지 모를정도로 빠른 시일내에 해결을 해야함.

//문제: 컴포넌트를 나누지 않고 한 곳에 다 작성을 하니 기능을 구현하기 애먹었음.
//해결: 결국 컴포넌트를 나누었다. 하지만 컴포넌트를 이렇게 나누는게 맞는지 잘 모르겠다.

//문제 : 해당 유저에 배송지를 저장하고 추가된 주소지가 바로바로 적용이 안됨 새로고침을 해야 적용된다. 삭제 수정도 마찬가지
//해결 : 삭제는 useQuery의 내장 함수인 refetch를 써서 해결하였음 addressDelete가 성공시에 addressList에 refetch를 써서 다시
//주소지를 가져오는 기능 같다 자세한 건 알아봐야함, 수정과 추가는 recoil을 써서 전역으로 상태를 관리해 수정이나 추가가 성공하면 addressList
//useQuery 요청을 다시보내서 userAddressList에 다시 응답된 주소지 목록을 집어넣어서 해결하였다.

const Address = () => {
  const [addressOpen, setAddressOpen] = useRecoilState(AddressInsertStateRecoil);
  const [principalState, setPrincipalState] = useState(false);
  const [updateOpen, setUpdateOpen] = useRecoilState(AddressUpdateStateRecoil);
  const [addressListState, setAddressListState] = useRecoilState(AddressListStateRecoil);
  const [userAddressList, setUserAddressList] = useRecoilState(getAddressListRecoil);
  const [addressRecoil, setAddressRecoil] = useRecoilState(getAddressRecoil);
  const [authState] = useRecoilState(authenticationState);

  const principal = useQuery(
    ["principal"],
    async () => {
      const option = {
        headers: {
          Authorization: `${localStorage.getItem("accessToken")}`,
        },
      };
      const response = await axios.get("http://15.165.181.187/auth/principal", option);
      return response;
    },
    {
      onSuccess: (response) => {
        setPrincipalState(false);
      },
      enabled: principalState && authState,
    }
  );

  //해당 유저의 주소 목록에서 하나 삭제 요청
  const addressDelete = useMutation(
    async (address) => {
      const option = {
        headers: {
          Authorization: `${localStorage.getItem("accessToken")}`,
        },
      };
      const response = await axios.delete(`http://15.165.181.187/user/mypage/address/${address.addressId}`, option);
      return response;
    },
    {
      onSuccess: () => {
        //성공적인 삭제 후 주소 목록을 다시 가져옵니다. refetch함수의 기능 ->  다시 list 항목을 불러온다고 함
        addressList.refetch();
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
        headers: {
          Authorization: `${localStorage.getItem("accessToken")}`,
        },
      };
      //user 주소지 조회 url/user/mypage/address
      const response = await axios.get("http://15.165.181.187/user/mypage/address", option);
      return response;
    },
    {
      onSuccess: (response) => {
        setUserAddressList([...response.data]);
      },
      enabled: !!principal.data && addressListState,
    }
  );

  const addressDefault = useMutation(
    async (address) => {
      const data = {
        userId: address.userId,
        addressId: address.addressId,
      };
      const option = {
        headers: {
          Authorization: `${localStorage.getItem("accessToken")}`,
        },
      };
      const response = await axios.put("http://15.165.181.187/user/mypage/address/default", data, option);
      return response;
    },
    {
      onSuccess: (response) => {
        setAddressListState(true);
        addressList.refetch();
      },
    }
  );
  useEffect(() => {
    if (!principalState) {
      setPrincipalState(true);
    }
    if (!addressListState) {
      setAddressListState(true);
    }
  }, []);

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
            ? userAddressList.map((address, index) => {
                return (
                  <div css={submitAddresBox} key={address.addressId}>
                    <div css={userUpdateBox}>
                      {principal.data !== undefined ? principal.data.data.name : ""}
                      <div css={userUpdateBox}>
                        <button
                          css={addressUpdateButton}
                          onClick={() => {
                            if (!addressOpen || addressOpen) {
                              setUpdateOpen(true);
                              setAddressOpen(false);
                              setAddressRecoil({ ...address });
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
                    <div css={textBox}>{address.address}</div>
                    <div css={textBox}>{address.addressDetail}</div>
                    <div css={addressText}>
                      <p css={p}>
                        {address.addressSigungu}, 우편번호:{address.addressZonecode}
                      </p>

                      <button css={defaultAddress(index)} onClick={() => addressDefault.mutate(address)}>
                        {index === 0 ? "기본 배송지" : "기본 배송지 설정"}
                      </button>
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
              }
              setUpdateOpen(false);
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
