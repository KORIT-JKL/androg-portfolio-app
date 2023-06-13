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
  max-width: 100%;
  height: 1000px;
`;

const header = css`
  padding: 0px 40px 10px 10px;
  width: 320px;
  height: 64px;
  font-size: 20px;
  font-weight: 600;
`;

const orderContent = css`
  padding: 10px;
  margin: 5px;
  width: 100%;
  height: 100%;
`;

const contentText = css`
  padding: 10px;
  width: 300px;
  height: 150px;
  font-style: italic;
  text-decoration: dashed;
`;

const tablebox = css`
  margin-bottom: 10px;
  padding: 10px;
  width: 100%;
  height: 250px;
`;

const subTitle = css`
  padding-bottom: 10px;
  width: 100%;
  height: 30px;
  font-size: 13px;
  font-weight: 600;
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
          <div css={tablebox}>
            <h2 css={subTitle}>국제사이즈 변환</h2>
            <SizeTable alpha="androg사이즈(알파)" number="androg사이즈(숫자)" />
          </div>
          <div css={tablebox}>
            <h2 css={subTitle}>신체측정 사이즈</h2>
            <SizeTable alpha="androg사이즈(알파)" number="androg사이즈(숫자)" />
          </div>
        </div>
      </main>
      <CommonFooter />
    </>
  );
};

export default SizeGuide;
