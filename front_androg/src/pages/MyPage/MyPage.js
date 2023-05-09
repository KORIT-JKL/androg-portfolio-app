/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";

import CommonFooter from "../../components/CommonFooter/CommonFooter";
import CommonHeader from "../../components/CommonHeader/CommonHeader";
import Information from "../../components/SupportUI/Information/Information";
import { useNavigate } from "react-router-dom";

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

const MyPage = () => {
  const navgate = useNavigate();
  return (
    <>
      <CommonHeader />
      <main css={mainContainer}>
        <div css={informationContent}>
          <div css={myInfoContent}>
            <h2 css={Title}>내 계정</h2>
            <span css={subTitle}>
              이름 <br />
            </span>
            <span css={subTitle}>이메일</span>
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
        </div>
      </main>
      <CommonFooter />
    </>
  );
};

export default MyPage;
