/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import Postcode from "@actbase/react-daum-postcode";
import CommonHeader from "../../components/CommonHeader/CommonHeader";
import CommonFooter from "../../components/CommonFooter/CommonFooter";

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

const Title = css`
  margin-top: 5px;
  font-size: 25px;
  font-weight: 600;
  margin-bottom: 40px;
`;
const subTitle = css`
  border-bottom: 1px solid #dbdbdb;
  font-size: 15px;
  font-weight: 600;
  padding-bottom: 20px;
`;
const submitAddresBox = css`
  padding: 20px 0px;
`;

const userUpdateBox = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 15px;
  font-size: 12px;
`;
const addressUpdateButton = css`
  border: none;
  padding: 3px;
  background-color: white;

  cursor: pointer;
  &:hover {
    font-weight: 600;
  }
`;
const addressDetailBox = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 15px;
  font-size: 15px;
`;

const addAddressButton = css`
  border: 1px solid black;
  margin-top: 50px;
  width: 100%;
  height: 45px;
  font-weight: 600;
  background-color: white;
  cursor: pointer;

  &:hover {
    background-color: gray;
    font-weight: 600;
    color: white;
  }
`;

const Address = () => {
  return (
    <>
      <CommonHeader />
      <main css={mainContainer}>
        <div css={informationContent}>
          <h1 css={Title}>주소록</h1>
          <h2 css={subTitle}>모든 주소</h2>
          <div css={submitAddresBox}>
            <div css={userUpdateBox}>
              유저이름
              <div css={userUpdateBox}>
                <button css={addressUpdateButton}>수정</button>
                <button css={addressUpdateButton}>삭제</button>
              </div>
            </div>
            <p css={addressDetailBox}>
              도로명 주소 <br />
              상세 주소 <br />
              우편번호 <br />
              국적 <br />
              <span>기본 배송지</span>
            </p>
            <button css={addAddressButton}>주소 추가하기</button>
          </div>
        </div>
      </main>
      <CommonFooter />
    </>
  );
};

export default Address;
