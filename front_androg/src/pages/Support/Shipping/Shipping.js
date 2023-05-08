/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import CommonHeader from "../../../components/commonHeader/CommonHeader";
import CommonFooter from "../../../components/commonFooter/CommonFooter";
import Information from "../../../components/SupportUI/Information/Information";

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

const returnContent = css`
  border: 1px solid #dbdbdb;
  padding: 10px;
  margin: 5px;
  width: 430px;
  height: 100%;
`;

const Shipping = () => {
  return (
    <>
      <CommonHeader />
      <main css={container}>
        <div css={orderContent}>
          <header css={header}>
            <h1>주문 및 배송 정보</h1>
          </header>
          <Information
            title="배송안내"
            message="주문 폭주로 인해 배송이 지연될 수 있는 점 참고 부탁드립니다."
            listItems={[
              "평소보다 3-5일 정도 소요 예정입니다.",
              "최대한 빨리 출고할 수 있도록 노력하겠습니다.",
            ]}
          />
        </div>
        <div css={returnContent}>
          <header css={header}>
            <h1>반품 및 환불 규정</h1>
          </header>
        </div>
      </main>
      <CommonFooter />
    </>
  );
};

export default Shipping;
