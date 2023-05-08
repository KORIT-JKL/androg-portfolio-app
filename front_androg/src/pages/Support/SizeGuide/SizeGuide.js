/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import CommonHeader from "../../../components/commonHeader/CommonHeader";
import CommonFooter from "../../../components/commonFooter/CommonFooter";
import SizeTable from "./../../../components/SupportUI/Table/SizeTable";

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

const contentText = css`
  padding: 5px;
  width: 300px;
  height: 150px;
`;

const SizeGuide = () => {
  return (
    <>
      <CommonHeader />
      <main css={container}>
        <div css={orderContent}>
          <header css={header}>
            <h1>사이즈 가이드</h1>
          </header>
          <div css={contentText}>
            <p>
              각 스타일에 따라 측정 차이가 있을 수 있습니다. <br />
              상품에 자세한 측정은 아래의 내용을 따릅니다.
            </p>
          </div>
          <SizeTable />
        </div>
      </main>
      <CommonFooter />
    </>
  );
};

export default SizeGuide;
