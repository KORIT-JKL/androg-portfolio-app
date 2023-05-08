/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import CommonHeader from "../../../components/commonHeader/CommonHeader";
import CommonFooter from "../../../components/commonFooter/CommonFooter";
import SupprotInput from "./../../../components/SupportUI/Input/SupprotInput";
import FAQItem from "../../../components/SupportUI/Button/FAQItem";

const mainContainer = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const headerText = css`
  padding-bottom: 30px;
  font-size: 25px;
  font-weight: 800;
`;

const main = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 120px 100px 30px;
  margin-bottom: 10px;
  width: 1000px;
`;

const textArea = css`
  margin-bottom: 10px;
  padding: 5px;
  width: 400px;
  height: 250px;
  resize: none;
`;

const inquiryButton = css`
  outline: none;
  width: 400px;
  height: 35px;
  background-color: black;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #aaa;
    text-decoration: underline;
  }
`;

const CustomerSupport = () => {
  return (
    <>
      <CommonHeader />
      <main css={main}>
        <div css={mainContainer}>
          <div css={headerText}>
            <h1>문의하기</h1>
          </div>
          <SupprotInput type="text" placeholder="name" />
          <SupprotInput type="text" placeholder="email" />
          <SupprotInput type="text" placeholder="orderNumber" />
          <textarea css={textArea} placeholder="내용을 입력하세요"></textarea>
          <button css={inquiryButton}>확인</button>
        </div>

        <div css={mainContainer}>
          <div css={headerText}>
            <h1>자주묻는 질문</h1>
          </div>
          <div>
            <FAQItem
              question="주문취소 절차는 어떻게 되나요?"
              answer="주문 취소를 위해 주문자명 / 주문번호 (Order #XXXXXX) 와 함께 support@androg.co.kr 로 문의해 주세요. 배송 상태에 따라 (이미 출구 준비가 완료되었거나 배송 진행중) 취소는 어려울 수 있습니다."
            />
          </div>
        </div>
      </main>
      <CommonFooter />
    </>
  );
};

export default CustomerSupport;
