/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useEffect, useState } from "react";

import CommonFooter from "../../components/CommonFooter/CommonFooter";
import CommonHeader from "../../components/CommonHeader/CommonHeader";
import Information from "../../components/SupportUI/Information/Information";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import OrderProducts from "../../components/Products/OrderProducts";
import { useRecoilState } from "recoil";
import { authenticationState, loginState } from "../../atoms/Auth/AuthAtoms";
import { getAddressListRecoil } from "../../atoms/AddressAtoms/AddressAtoms";

const mainContainer = css`
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  padding: 120px 20px;
`;

const informationContent = css`
  grid-column-start: 2;
  grid-column: span 4 / span 4;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
  max-width: 100%;
  max-height: 100%;
`;
const myInfoContent = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 100px;
`;
const Title = css`
  margin-top: 5px;
  font-size: 25px;
  font-weight: 600;
  padding-bottom: 20px;
`;
const subTitle = css`
  font-size: 15px;
  font-weight: 600;
  padding-bottom: 20px;
`;
const addressContent = css`
  margin-top: 30px;
  cursor: pointer;
  &:hover {
    font-weight: 600;
  }
`;
const supportContent = css`
  padding-top: 30px;
`;

const supportUl = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px 0px;
`;

const supportLi = css`
  padding: 20px 0px;

  cursor: pointer;
  &:hover {
    font-weight: 800;
    border-bottom: 1px solid black;
  }
`;
const orderContent = css`
  grid-column-start: 6;
  grid-column: span 8 / span 8;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
  max-height: 100%;
`;
// react useQuery, rendering, State 이슈
const MyPage = () => {
  const navgate = useNavigate();
  const [orderProducts, setOrderProducts] = useState([]);

  const [infoRefresh, setInfoRefresh] = useState(false);
  const [productsRefresh, setProductsRefresh] = useState(false);
  const [loginIsState, setLoginIsState] = useRecoilState(loginState);
  const [userAddressList, setUserAddressList] = useRecoilState(getAddressListRecoil);

  let userId = 0;

  const principal = useQuery(
    ["principal"],
    async () => {
      const option = {
        headers: {
          Authorization: `${localStorage.getItem("accessToken")}`,
        },
      };
      //마이페이지 조회 url /user/{userId}/mypage -> /user/mypage로 변경
      const response = await axios.get("http://localhost:8080/auth/principal", option);
      return response;
    },
    {
      onSuccess: (response) => {
        userId = response.data.userId;
        setInfoRefresh(false);
        setProductsRefresh(true);
      },
      enabled: infoRefresh,
    }
  );
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
      const response = await axios.get("http://localhost:8080/user/mypage/address", option);
      return response;
    },
    {
      onSuccess: (response) => {
        setUserAddressList([...response.data]);
      },
      enabled: !!principal.data,
    }
  );
  const products = useQuery(
    ["orderProducts"],
    async () => {
      const data = {
        params: {
          userId: principal.data.data.userId,
        },
        headers: {
          Authorization: `${localStorage.getItem("accessToken")}`,
        },
      };
      //user가 구매한 상품 목록 url ->/user/mypage/purchases
      const response = await axios.get("http://localhost:8080/user/mypage/purchases", data);
      return response;
    },
    {
      onSuccess: (response) => {
        console.log(response.data);
        setOrderProducts([...response.data]);

        setProductsRefresh(false);
      },
      enabled: !!principal.data, //useQuery를 동기식으로 쓰는 꼼수
    }
  );

  const withdrawal = useMutation(async () => {
    const option = {
      params: {
        userId: principal.data.data.userId,
      },
      headers: {
        Authorization: `${localStorage.getItem("accessToken")}`,
      },
    };
    console.log(await axios.delete(`http://localhost:8080/user/${userId}`, option));
    return await axios.delete(`http://localhost:8080/user/${userId}`, option);
  });

  const admintest = useMutation(["admin"], async () => {
    const option = {
      headers: {
        Authorization: `${localStorage.getItem("accessToken")}`,
      },
    };
    const response = await axios.post("http://localhost:8080/admin/test", "", option);
    return response;
  });
  const onclicktest = () => {
    admintest.mutate();
  };

  // useEffect(() => {
  //   if (!infoRefresh) {
  //     // console.log(infoRefresh);
  //     setInfoRefresh(true);
  //   }
  // }, []);

  const withdrawalSubmit = () => {
    if (window.confirm("회원탈퇴 하시겠습니까?")) {
      withdrawal.mutate();
      localStorage.removeItem("accessToken");
      setLoginIsState(false);
      navgate("/");
      console.log("/");
    }
  };

  if (principal.isLoading && products.isLoading && addressList.isLoading) {
    return <></>;
  }

  return (
    <>
      <CommonHeader />
      <main css={mainContainer}>
        <div css={informationContent}>
          <div css={myInfoContent}>
            <h2 css={Title}>내 계정</h2>
            <span css={subTitle}>
              {principal.data !== undefined ? principal.data.data.name : <></>} <br />
            </span>
            <span css={subTitle}>{principal.data !== undefined ? principal.data.data.email : <></>}</span>
            <div>{userAddressList[0] !== undefined ? userAddressList[0].address : ""}</div>
            <div>{userAddressList[0] !== undefined ? userAddressList[0].addressDetail : ""}</div>
            <div>
              {userAddressList[0] !== undefined ? userAddressList[0].addressSigungu : ""}
              {userAddressList[0] !== undefined ? userAddressList[0].addressZonecode : ""}
            </div>

            <div css={addressContent} onClick={withdrawalSubmit}>
              회원탈퇴
            </div>
            <div css={addressContent} onClick={() => navgate("/user/mypage/address")}>
              주소록 보기
            </div>
          </div>
          <div css={supportContent}>
            <h2 css={Title}>고객지원</h2>
            <h2 css={subTitle}>이메일</h2>
            <h2 css={subTitle}>support@androg.com</h2>
            <Information
              title="온라인 고객지원 운영시간"
              message="월요일-금요일 오전 8시부터 오후 4시까지 문의해 주시기 바랍니다."
              listItems={["공휴일 제외"]}
            />
            <ul css={supportUl}>
              <li css={supportLi} onClick={() => navgate("/page/customer")}>
                문의하기
              </li>
              <li css={supportLi} onClick={() => navgate("/page/customer")}>
                자주 묻는 질문
              </li>
              <li css={supportLi} onClick={() => navgate("/page/shipping")}>
                배송 및 반품 정보
              </li>
            </ul>
          </div>
        </div>
        <div css={orderContent}>
          <h2 css={Title}>주문 기록</h2>
          {orderProducts.length > 0 ? (
            orderProducts.map((orderProduct) => {
              return <OrderProducts key={orderProduct.orderDetailId} orderProduct={orderProduct} isOpen={true} />;
            })
          ) : (
            <h2 css={subTitle}>주문한 상품이 없습니다.</h2>
          )}
        </div>
        <button onClick={onclicktest}>admintest</button>
      </main>
      <CommonFooter />
    </>
  );
};

export default MyPage;
