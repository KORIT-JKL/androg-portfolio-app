/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import CommonHeader from "../../../components/commonHeader/CommonHeader";
import CommonFooter from "../../../components/commonFooter/CommonFooter";

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

const input = css`
  border: none;
  border-bottom: 1px solid #dbdbdb;
  padding-bottom: 5px;
  width: 400px;
  height: 30px;
  outline: none;
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
          <input type="text" placeholder="name" css={input} />
        </div>

        <div css={mainContainer}>
          <div css={headerText}>
            <h1>자주묻는 질문</h1>
          </div>
        </div>
      </main>
      <CommonFooter />
    </>
  );
};

export default CustomerSupport;
