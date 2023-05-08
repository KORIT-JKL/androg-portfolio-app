/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import CommonHeader from "../../../components/commonHeader/CommonHeader";
import CommonFooter from "../../../components/commonFooter/CommonFooter";
import FAQItem from "./../../../components/SupportUI/Button/FAQItem";

const container = css`
  display: flex;
  justify-content: space-between;
  flex-direction: center;
  align-items: center;
  margin: 10px;
  padding: 120px 0px 0px 50px;
  width: 1000px;
  height: 1000px;
`;

const header = css`
  padding-bottom: 40px;
  width: 320px;
  height: 64px;
  font-size: 20px;
  font-weight: 600;
`;

const orderContent = css`
  border: 1px solid #dbdbdb;
  padding: 10px;
  margin: 5px;
  width: 430px;
  height: 100%;
`;

const Legal = () => {
  return (
    <>
      <CommonHeader />
      <main css={container}>
        <div css={orderContent}>
          <header css={header}>
            <h1>LEGAL</h1>
          </header>
          <div>
            <FAQItem question="이용약관" />
            <FAQItem question="개인정보 보호정책" />
          </div>
        </div>
      </main>
      <CommonFooter />
    </>
  );
};

export default Legal;
