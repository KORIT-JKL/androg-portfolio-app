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
const inquiryContainer = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 500px;
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
  max-width: 100%;
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
        <div css={inquiryContainer}>
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
              answer="주문 취소를 위해 주문자명 / 주문번호 (Order #XXXXXX) 와 함께 support@androg.co.kr 로 문의해 주세요. 
              배송 상태에 따라 (이미 출구 준비가 완료되었거나 배송 진행중) 취소는 어려울 수 있습니다."
            />
            <FAQItem
              question="주문이 왜 취소가 된건가요?"
              answer="본인이 취소 요청하신 게 아니라면 죄송스럽게도 상품이 품절되어 발송이 불가능하거나 배송지 주소 오류로 인해 취소 될 수 있습니다.
              추가적으로 결제/ 주문 오류가 발상하여 주문 취소 될 수 있습니다."
            />
            <FAQItem
              question="반품은 어떻게 하나요?"
              answer="반품 신청은 해당 링크로 들어가셔서 반품 요청하실 수 있습니다: 반품 신청하기.
              자세한 정보는 반품 및 환불 규정 페이지에서 확인해주세요."
            />
            <FAQItem
              question="반품처리 처리 후 환불은 언제 되나요?"
              answer="주문 취소를 위해 주문자명 / 주문번호 (Order #XXXXXX) 와 함께 support@androg.co.kr 로 문의해 주세요. 배송 상태에 따라 (이미 출구 준비가 완료되었거나 배송 진행중) 취소는 어려울 수 있습니다."
            />
            <FAQItem
              question="배송 주소지를 잘못 입력했는데, 변경은 어떻게 하나요?"
              answer="주문 취소를 위해 주문자명 / 주문번호 (Order #XXXXXX) 와 함께 support@androg.co.kr 로 문의해 주세요. 배송 상태에 따라 (이미 출구 준비가 완료되었거나 배송 진행중) 취소는 어려울 수 있습니다."
            />
            <FAQItem
              question="주문완료 후 수정이 가능한가요?"
              answer="보내주신 상품이 물류센터에 도착한 뒤, 2-3일 정도의 입고/검수 작업을 거쳐 환불 처리로 진행하고 있습니다. 배송비 제외.

              주문과 업무량이 몰리는 시기에는 진행 절차 시간이 영업일 기준 4-5일 이상 소요될 수 있습니다."
            />
            <FAQItem
              question="주문취소 절차는 어떻게 되나요?"
              answer="모든 주소는 한글로 입력해주세요. 구/군/시, 상세주소 포함.
              배송지 변경이 필요한 경우 support@androg.co.kr 로 요청을 할 수 있습니다만, 이미 상품 배송이 시작되었다면 변경이 어려울 수 있습니다."
            />
          </div>
        </div>
      </main>
      <CommonFooter />
    </>
  );
};

export default CustomerSupport;