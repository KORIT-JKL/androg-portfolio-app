/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import CommonFooter from "../../../components/commonFooter/CommonFooter";
import CommonHeader from "../../../components/commonHeader/CommonHeader";

const header = css`
  padding-top: 120px;
  padding-left: 50px;
  font-size: 20px;
  font-weight: 600;
`;

const main = css`
  padding-left: 50px;
  margin: 10px;
  width: 500px;
  height: 700px;
`;

const mainContainer = css`
  padding: 10px;
  margin: 10px;
  width: 600px;
  height: 350px;
`;

const p = css`
  font-size: 13px;
  padding-bottom: 10px;
`;

const span = css`
  text-decoration: underline;
  margin-bottom: 10px;
  font-size: 14px;
  font-weight: 600;
`;

const Notice = () => {
  return (
    <>
      <CommonHeader />
      <header css={header}>
        <h1>휴무 배송 일정 공지</h1>
      </header>
      <main css={main}>
        <div css={mainContainer}>
          <p css={p}>근로자의 날 및 어린이날 기간 택배사 휴무로 인한 배송 일정 와 고객센터 운영 시간 안내 드립니다.</p>
          <p css={p}>
            <span css={span}>근로자의 날 배송일정 안내</span>
          </p>
          <p css={p}> 출고 마지막 날 : 2023/5/28 (금)</p>
          <p css={p}> 5월 2일(화) 부터 순차적으로 진행됩니다</p>
          <p css={p}> 고객센터 휴무: 2023/4/29 (토) – 2023/5/1 (월) </p>
          <p css={p}>
            <span css={span}>어린이의 날 배송일정 안내</span>
          </p>
          <p css={p}> 출고 마지막 날 : 2023/5/4 (목) </p>
          <p css={p}> 5월 8일(월) 부터 순차적으로 진행됩니다. </p>
          <p css={p}> 고객센터 휴무:2023/5/5 (금) – 2023/5/7 (일) </p>
          <p css={p}>
            공휴일 물량 증가로 인해 배송이 지연될 수 있는 점 양해 부탁드리며, 주문하신 상품이 최대한 빨리 배송될 수
            있도록 노력하겠습니다.
          </p>
          <p css={p}> 관련된 정보는 support@androg.co.kr 로 영업일 오전 9시부터 오후 4시까지 문의해 주세요 </p>
        </div>
      </main>
      <CommonFooter />
    </>
  );
};

export default Notice;