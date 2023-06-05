/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useRef, useState } from "react";

import CommonFooter from "../../components/CommonFooter/CommonFooter";
import CommonHeader from "../../components/CommonHeader/CommonHeader";
import Information from "../../components/SupportUI/Information/Information";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import OrderProducts from "../../components/Products/OrderProducts";
import { useRecoilState } from "recoil";
import { loginState } from "../../atoms/Auth/AuthAtoms";
import { getAddressListRecoil } from "../../atoms/AddressAtoms/AddressAtoms";

const mainContainer = css`
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 3fr));
  gap: 10px;
`;

const informationContent = css`
  grid-column-start: 2;
  grid-column-end: span 3;
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

const imgBox = css`
  margin-right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  overflow: hidden;
`;

const img = css`
  width: 100%;
  object-fit: cover;
`;

const fileInput = css`
  display: none;
`;

const subTitle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  grid-column-end: span 7;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
  max-height: 100%;
`;
const textBox = css`
  margin: 10px 0px 10px 0px;
  font-size: 14px;
`;
// react useQuery, rendering, State 이슈
const MyPage = () => {
  const navgate = useNavigate();
  const [orderProducts, setOrderProducts] = useState([]);

  const [infoRefresh, setInfoRefresh] = useState(false);
  const [, setProductsRefresh] = useState(false);
  const [, setLoginIsState] = useRecoilState(loginState);
  const [userAddressList, setUserAddressList] = useRecoilState(getAddressListRecoil);
  const [imgFile, setImgFile] = useState();
  const [profileImgUrl, setProFileImgUrl] = useState();
  const fileRef = useRef();

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
        setProFileImgUrl("http://localhost:8080/image/profile/" + response.data.profileImg);
        userId = response.data.userId;
        setInfoRefresh(false);
        setProductsRefresh(true);
      },
      enabled: !!localStorage.getItem("accessToken"),
    }
  );
  const profileImgUpdate = useMutation(
    async () => {
      const formData = new FormData();
      formData.append("profileImgFile", imgFile);
      const option = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `${localStorage.getItem("accessToken")}`,
        },
      };
      const response = await axios.post(
        "http://localhost:8080/user/mypage/profile/img",
        formData,
        option
      );
      return response;
    },
    {
      onSuccess: () => {
        principal.refetch();
      },
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
        principal.refetch();
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
        console.log(orderProducts);
        setOrderProducts([...response.data]);
        setProductsRefresh(false);
      },
      enabled: !!principal.data, //useQuery를 동기식으로 쓰는 꼼수
    }
  );
  const withdrawal = useMutation(
    async () => {
      const option = {
        params: {
          userId: principal.data.data.userId,
        },
        headers: {
          Authorization: `${localStorage.getItem("accessToken")}`,
        },
      };
      return await axios.delete(`http://localhost:8080/user/delete`, option);
    },
    {
      onSuccess: (response) => {
        if (response.data === 1) {
          window.location.href = "http://localhost:3000";
          localStorage.removeItem("accessToken");
        }
      },
      onError: (error) => {},
    }
  );

  const withdrawalSubmit = () => {
    if (window.confirm("회원탈퇴 하시겠습니까?")) {
      withdrawal.mutate();
    }
  };
  const porfileImgChangeHandle = () => {
    fileRef.current.click();
  };
  const profileImgFileChangeHadle = (e) => {
    setImgFile(e.target.files[0]);
    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      setProFileImgUrl(event.target.result);
      profileImgUpdate.mutate();
    };
    fileReader.readAsDataURL(e.target.files[0]);
    e.target.value = null;
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
              <div css={imgBox}>
                <img css={img} src={profileImgUrl} alt="" />
                <input
                  css={fileInput}
                  type="file"
                  ref={fileRef}
                  onChange={profileImgFileChangeHadle}
                />
              </div>
              {principal.data !== undefined ? principal.data.data.name : <></>} <br />
            </span>
            <span css={subTitle}>
              {principal.data !== undefined ? principal.data.data.email : <></>}
            </span>
            <div css={textBox}>
              {userAddressList[0] !== undefined ? userAddressList[0].address : ""}
            </div>
            <div css={textBox}>
              {userAddressList[0] !== undefined ? userAddressList[0].addressDetail : ""}
            </div>
            <div css={textBox}>
              {userAddressList[0] !== undefined ? userAddressList[0].addressSigungu : ""}
              {userAddressList[0] !== undefined ? ", 우편번호: " : ""}
              {userAddressList[0] !== undefined ? userAddressList[0].addressZonecode : ""}
            </div>

            <div css={addressContent} onClick={() => navgate("/user/mypage/address")}>
              주소록 보기
            </div>
            <div css={addressContent} onClick={withdrawalSubmit}>
              회원탈퇴
            </div>
            <div css={addressContent} onClick={porfileImgChangeHandle}>
              프로필 변경
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
              <li css={supportLi} onClick={() => navgate("/page/customer/inquiry")}>
                문의답변
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
              return (
                <OrderProducts
                  key={orderProduct.orderDetailId}
                  orderProduct={orderProduct}
                  isOpen={true}
                />
              );
            })
          ) : (
            <h2 css={subTitle}>주문한 상품이 없습니다.</h2>
          )}
        </div>
      </main>
      <CommonFooter />
    </>
  );
};

export default MyPage;
