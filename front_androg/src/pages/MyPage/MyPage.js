/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";

import CommonFooter from "../../components/CommonFooter/CommonFooter";
import CommonHeader from "../../components/CommonHeader/CommonHeader";
import Information from "../../components/SupportUI/Information/Information";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";

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

const orderbox = css`
  width: 1030px;
  height: 720px;
  overflow-y: auto;
`;

const orderDetailBox = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid black;
  margin: 10px 0px 10px 2px;
  padding: 5px;
  width: 70%;
  height: 200px;
`;

const orderImgBox = css`
  border: 1px solid black;
  padding: 5px;
  width: 30%;
  height: 100%;
  overflow: hidden;
`;

const orderImg = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const orderInfoBox = css`
  border: 1px solid black;
  padding: 5px;
  width: 35%;
  height: 100%;
`;

const productName = css`
  margin-top: 5px;
  font-size: 25px;
  font-weight: 600;
  padding-bottom: 10px;
`;

const orderInfoText = css`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const reviewButtonBox = css`
  padding: 5px;
  width: 30%;
  height: 100%;
`;

const reviewButton = css`
  font-weight: 600;
  font-size: 17px;
  height: 100%;
  width: 100%;
  background-color: black;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: grey;
    color: white;
  }
`;

const MyPage = () => {
  const navgate = useNavigate();

  const principal = useQuery(
    ["principal"],
    async () => {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.get("http://localhost:8080/user/mypage", {
        params: { accessToken },
      });
      console.log(response);
      return response;
    },
    {
      enabled: !!localStorage.getItem("accessToken"),
    }
  );
  if (principal.isLoading) {
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
              {principal.data.data.name} <br />
            </span>
            <span css={subTitle}>{principal.data.data.email}</span>
            <div css={addressContent}>주소록 보기</div>
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
          <div css={orderbox}>
            <div css={orderDetailBox}>
              <div css={orderImgBox}>
                <img
                  css={orderImg}
                  src="//cdn.shopify.com/s/files/1/0099/5708/1143/products/1994916_CORA_1_476ac993-fee8-47a7-b61c-8419f9fcc0e0.jpg?v=1683052708&width=480"
                  alt=""
                />
              </div>
              <div css={orderInfoBox}>
                <h2 css={productName}>GOLD LION LS TEE</h2>
                <p css={orderInfoText}>
                  옵션 : coral/M <br />
                </p>
                <p css={orderInfoText}>
                  수량 : 1 <br />
                </p>
                <p css={orderInfoText}>가격 : ₩82000</p>
              </div>
              <div css={reviewButtonBox}>
                <button css={reviewButton}>리뷰 등록</button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <CommonFooter />
    </>
  );
};

export default MyPage;
